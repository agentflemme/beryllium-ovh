/**
 * /api/status — server-side bridge to the Beszel hub. This is the ONLY
 * place where credentials are used:
 * nothing (tokens, passwords, API keys) ever reaches the browser bundle.
 *
 * Error messages are intentionally verbose (endpoint + HTTP status + server
 * message, never secrets) so misconfigurations are diagnosable from the UI.
 */
import { json } from '@sveltejs/kit';
import * as staticEnv from '$env/static/private';
import { env as dynamicEnv } from '$env/dynamic/private';

/* Timeout for ordinary fetch calls (systems list, UptimeRobot). */
const FETCH_TIMEOUT_MS = 5000;
/* Beszel hub uses slow bcrypt — give password auth its own, longer budget. */
const BESZEL_AUTH_TIMEOUT_MS = 20000;
/* Beszel access tokens live ~20 min; cache with a safety margin. */
const BESZEL_TOKEN_TTL_MS = 18 * 60 * 1000;

/** Status values considered "up" across Beszel/UptimeRobot. */
const ONLINE_STATUSES = new Set(['up', 'online', 'ok', 'active', 'running', 'healthy', 'true']);
const OFFLINE_STATUSES = new Set(['inactive', 'down', 'off', 'disabled', 'error', 'unhealthy']);

/** UptimeRobot monitor status → normalized badge status:
 *  0 = paused, 1 = down, 2 = up. */
const UPTIMEROBOT_STATUS = { UP: 'online', STARTED: 'online', LOOKS_DOWN: 'offline', DOWN: 'offline', PAUSED: 'inactive' };

/**
 * Read a private env var, preferring the runtime value over the build-time one
 * so the same build can be promoted across environments.
 * @param {string} key
 * @returns {string | undefined}
 */
function readEnv(key) {
  const value = dynamicEnv[key] ?? staticEnv[key];
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

/** Strip protocol/host and trailing query from a URL for error reporting. */
function pathOf(url) {
  try {
    const u = new URL(url);
    return `${u.host}${u.pathname}`;
  } catch {
    return url;
  }
}

/** Truncate and collapse whitespace; never echo request credentials. */
function snippet(text, max = 160) {
  return String(text).replace(/\s+/g, ' ').trim().slice(0, max);
}

/**
 * Build a secret-free failure description from a response, e.g.
 * "HTTP 401 (The provided API key is invalid)".
 * @param {Response} res
 */
async function describeFailure(res) {
  let detail = '';
  try {
    const text = await res.text();
    try {
      const body = JSON.parse(text);
      detail = body?.message ?? body?.error ?? body?.data?.message ?? body?.data ?? '';
      if (typeof detail === 'object') detail = '';
    } catch {
      detail = text;
    }
  } catch {
    /* ignore body read errors */
  }
  return `HTTP ${res.status}${detail ? ` (${snippet(detail)})` : ''}`;
}

/** @param {string | undefined} url */
function normalizeBaseUrl(url) {
  return url?.trim().replace(/\/+$/, '');
}

/**
 * Beszel reports CPU/memory/disk either as 0–100 percentages, 0–1 fractions,
 * or as objects ({percent}, {used,total}, {value}) depending on the agent
 * version. Normalize to a 0–100 number.
 * @param {unknown} value
 * @returns {number | null}
 */
function toPercent(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === 'object') {
    if (value.percent !== undefined && value.percent !== null) {
      return toPercent(value.percent);
    }
    if (value.value !== undefined && value.value !== null) {
      return toPercent(value.value);
    }
    if (value.used !== undefined && value.total !== undefined) {
      const u = Number(value.used), t = Number(value.total);
      if (Number.isFinite(u) && Number.isFinite(t) && t > 0) {
        return toPercent((u / t) * 100);
      }
    }
    return null;
  }
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  const scaled = n > 0 && n <= 1 ? n * 100 : n;
  return Math.min(Math.max(Math.round(scaled * 10) / 10, 0), 100);
}

/**
 * Read a resource field from a Beszel system record, trying several
 * common shapes (direct field, nested stats, *_percent suffix).
 * @param {object} system
 * @param {string} key
 * @returns {unknown}
 */
function readBeszelStat(system, key) {
  // Beszel nests CPU/memory/disk under system.info (e.g. info.cpu, info.mp, info.dp)
  return system?.info?.[key]
    ?? system?.[key]
}

/**
 * Read a raw string/number spec field from Beszel.
 * @param {object} system
 * @param {string} key
 * @returns {string | number | null}
 */
function readBeszelSpec(system, key) {
  // Beszel Stats fields live under system.stats (JSON), Info under system.info,
  // Details is CBOR-only (not available via JSON API). Check all plausible paths.
  const value = system?.stats?.[key]
    ?? system?.info?.[key]
    ?? system?.details?.[key]
    ?? system?.[key];
  return value === null || value === undefined ? null : value;
}

/**
 * Beszel system records carry no explicit "role" field, so infer the node
 * type from its name. Extend the pattern here if your naming differs.
 * @param {string} [name]
 */
function guessNodeType(name = '') {
  return /(vps|bastion|tunnel|proxy|svr|ovh|cloud|hetzner|digitalocean)/i.test(name)
    ? 'VPS Tunnel'
    : 'Bare Metal (Home)';
}

/** POST {identity,password} to an auth URL; return token or a failure note.
 *  @param {number} [timeoutMs] overrides the default fetch timeout. */
async function tryPasswordAuth(url, identity, password, timeoutMs = FETCH_TIMEOUT_MS) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ identity, password }),
      signal: AbortSignal.timeout(timeoutMs),
      cache: 'no-store'
    });
    if (!res.ok) return { error: `${pathOf(url)} → ${await describeFailure(res)}` };
    const body = await res.json();
    if (typeof body?.token === 'string' && body.token.length > 0) return { token: body.token };
    return { error: `${pathOf(url)} → HTTP 200 but response contains no token` };
  } catch (err) {
    return { error: `${pathOf(url)} → ${snippet(err?.message ?? err, 80)}` };
  }
}

/** In-memory cache for the Beszel access token (single hub). */
let beszelTokenCache = { token: null, expiresAt: 0 };

function cachedBeszelToken() {
  const now = Date.now();
  if (beszelTokenCache.token && now < beszelTokenCache.expiresAt) return beszelTokenCache.token;
  return null;
}

function cacheBeszelToken(token) {
  beszelTokenCache = { token, expiresAt: Date.now() + BESZEL_TOKEN_TTL_MS };
}

function clearBeszelTokenCache() {
  beszelTokenCache = { token: null, expiresAt: 0 };
}

/**
 * Authenticate against the Beszel hub and return sanitized system records.
 * PocketBase ≥ 0.23 (current Beszel) uses the `_superusers` collection,
 * older instances use the `admins` route; a regular `users` login is tried
 * last for hubs accessed through a non-admin account.
 * A valid token is cached (~18 min) so the slow bcrypt auth cost is not paid
 * on every poll; a 401 on the systems fetch clears the cache and re-auths once.
 * @returns {Promise<{ nodes: object[], error: string | null }>}
 */
async function fetchBeszelNodes() {
  const base = normalizeBaseUrl(readEnv('BESZEL_URL'));
  const email = readEnv('BESZEL_EMAIL');
  const password = readEnv('BESZEL_PASSWORD');
  if (!base || !email || !password) {
    return { nodes: [], error: 'Beszel not configured — set BESZEL_URL, BESZEL_EMAIL, BESZEL_PASSWORD' };
  }

  const strategies = [
    `${base}/api/collections/_superusers/auth-with-password`, // PocketBase ≥ 0.23
    `${base}/api/admins/auth-with-password`, // PocketBase ≤ 0.22
    `${base}/api/collections/users/auth-with-password` // regular Beszel user
  ];
  const systemsUrl = `${base}/api/collections/systems/records?perPage=100&sort=-updated`;
  /** @type {string[]} */
  const attempts = [];

  /** Resolve a usable token: from cache, otherwise via password auth. */
  async function resolveToken() {
    let token = cachedBeszelToken();
    if (token) return token;
    for (const url of strategies) {
      const result = await tryPasswordAuth(url, email, password, BESZEL_AUTH_TIMEOUT_MS);
      if (result.token) {
        cacheBeszelToken(result.token);
        return result.token;
      }
      attempts.push(result.error);
    }
    return null;
  }

  let token = await resolveToken();
  if (!token) {
    return { nodes: [], error: `Beszel auth failed — ${attempts.join(' | ')}` };
  }

  /** Fetch systems; on 401 (expired token) clear cache, re-auth once, retry. */
  let systems;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(systemsUrl, {
        headers: { Authorization: token },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        cache: 'no-store'
      });
      if (res.ok) {
        systems = await res.json();
        break;
      }
      if (res.status === 401 && attempt === 0) {
        clearBeszelTokenCache();
        token = await resolveToken();
        if (!token) {
          return { nodes: [], error: `Beszel auth failed — ${attempts.join(' | ')}` };
        }
        continue;
      }
      return { nodes: [], error: `Beszel systems fetch — ${await describeFailure(res)}` };
    } catch (err) {
      return { nodes: [], error: `Beszel systems fetch — ${snippet(err?.message ?? err, 80)}` };
    }
  }

  const items = Array.isArray(systems?.items) ? systems.items : [];
  const nodes = items.map((system, index) => {
    const rawStatus = String(system?.status ?? '').toLowerCase();
    return {
      id: String(system?.id ?? `node-${index + 1}`),
      name: String(system?.name ?? `Node ${index + 1}`),
      status: ONLINE_STATUSES.has(rawStatus) ? 'online' : 'offline',
      cpu: toPercent(readBeszelStat(system, 'cpu')),
      memory: toPercent(readBeszelStat(system, 'mp')),
      disk: toPercent(readBeszelStat(system, 'dp')),
      // Beszel info fields (verified from live API): m=CPU model, c=cores, t=threads, h=hostname
      cpuModel: readBeszelSpec(system, 'm'),
      cpuCores: readBeszelSpec(system, 'c'),
      cpuThreads: readBeszelSpec(system, 't'),
      // memoryTotal and diskTotal are NOT exposed by the Beszel PocketBase JSON API — omitted.
      type: guessNodeType(String(system?.name ?? '')),
      updated: system?.updated ?? null
    };
  });
  return { nodes, error: null };
}

/** Fetch monitor list from UptimeRobot v3 (GET /monitors, Bearer auth).
 *  Rate limit: FREE plan = 10 req/min.
 *  Status strings: UP, STARTED, LOOKS_DOWN, DOWN, PAUSED.
 *  Set UPTIMEROBOT_API_KEY to enable; absent key → silently skipped.
 *
 *  NOTE: UptimeRobot FREE plan does NOT provide logs, response_times, or
 *  custom_uptime_ratios (v2 API returns stat:fail for these). The v3 API
 *  always returns `lastDayUptimes: {bucketSize:0, histogram:[]}` (empty).
 *  So we only use basic fields: status, currentStateDuration, lastIncident. */
async function fetchUptimeRobotMonitors() {
  const apiKey = readEnv('UPTIMEROBOT_API_KEY');
  if (!apiKey) return { monitors: [], error: null };

  try {
    const res = await fetch('https://api.uptimerobot.com/v3/monitors', {
      method: 'GET',
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      cache: 'no-store'
    });
    if (!res.ok) return { monitors: [], error: `UptimeRobot getMonitors — ${await describeFailure(res)}` };
    const body = await res.json();
    const monitors = Array.isArray(body?.data) ? body.data : [];
    const items = monitors.map((m, index) => {
      const li = m.lastIncident ?? null;
      return {
        id: String(m.id ?? `um-${index + 1}`),
        name: String(m.friendlyName ?? `Monitor ${m.id ?? index + 1}`),
        status: UPTIMEROBOT_STATUS[String(m.status ?? '').toUpperCase()] ?? 'unknown',
        url: m.url ?? null,
        type: String(m.type ?? ''),
        // Seconds the monitor has been in its current state (UP/DOWN/etc.)
        currentStateDuration: typeof m.currentStateDuration === 'number' ? m.currentStateDuration : null,
        lastIncident: li ? {
          startedAt: li.startedAt ?? null,
          duration: typeof li.duration === 'number' ? li.duration : null,
          status: li.status ?? null
        } : null
      };
    });
    return { monitors: items, error: null };
  } catch (err) {
    return { monitors: [], error: `UptimeRobot getMonitors — ${snippet(err?.message ?? err, 80)}` };
  }
}

/* ── In-memory snapshot cache ──────────────────────────────────────────────
 * Beszel's bcrypt password auth can take tens of seconds. Without a cache,
 * every page load paid that cost and the visitor waited on a blank page.
 * - fresh (< FRESH_TTL): the cached payload is answered directly;
 * - stale: the cached payload is answered while ONE background refresh runs
 *   (stale-while-revalidate), so concurrent requests never queue up behind
 *   Beszel;
 * - a failed refresh keeps the last good nodes/monitors (with the new errors
 *   attached) until STALE_TTL expires, instead of blanking the dashboard.
 */
const STATUS_FRESH_TTL_MS = 15 * 1000;
const STATUS_STALE_TTL_MS = 5 * 60 * 1000;

/** @type {{ payload: Record<string, any> | null, at: number }} */
let statusCache = { payload: null, at: 0 };
/** Single in-flight refresh shared by all concurrent callers. */
let statusRefresh = null;

/** Gather the sanitized payload from every source (Beszel + UptimeRobot). */
async function buildStatusPayload() {
  const [beszel, uptimerobot] = await Promise.allSettled([
    fetchBeszelNodes(),
    fetchUptimeRobotMonitors()
  ]);

  const beszelResult =
    beszel.status === 'fulfilled'
      ? beszel.value
      : { nodes: [], error: String(beszel.reason?.message ?? beszel.reason) };
  const uptimerobotResult =
    uptimerobot.status === 'fulfilled'
      ? uptimerobot.value
      : { monitors: [], error: String(uptimerobot.reason?.message ?? uptimerobot.reason) };

  /** @type {Record<string, string>} */
  const errors = {};
  if (beszelResult.error) errors.beszel = beszelResult.error;
  if (uptimerobotResult.error) errors.uptimerobot = uptimerobotResult.error;

  return {
    success: beszelResult.nodes.length > 0 || uptimerobotResult.monitors.length > 0,
    timestamp: new Date().toISOString(),
    nodes: beszelResult.nodes,
    monitors: uptimerobotResult.monitors,
    ...(Object.keys(errors).length > 0 ? { errors } : {})
  };
}

/** Start (or join) a refresh and update the cache when it settles. */
function refreshStatus() {
  if (!statusRefresh) {
    statusRefresh = buildStatusPayload()
      .then((payload) => {
        const previous = statusCache.payload;
        const previousUsable =
          previous &&
          (previous.nodes.length > 0 || previous.monitors.length > 0) &&
          Date.now() - statusCache.at < STATUS_STALE_TTL_MS;
        const hasData = payload.nodes.length > 0 || payload.monitors.length > 0;

        statusCache = hasData || !previousUsable
          ? { payload, at: Date.now() }
          : {
              // Refresh failed: keep the last good snapshot, surface new errors.
              payload: {
                ...payload,
                nodes: previous.nodes,
                monitors: previous.monitors,
                timestamp: previous.timestamp
              },
              at: Date.now()
            };
        return statusCache.payload;
      })
      .catch((err) => {
        if (statusCache.payload) return statusCache.payload;
        return {
          success: false,
          timestamp: new Date().toISOString(),
          nodes: [],
          monitors: [],
          errors: { api: String(err?.message ?? err) }
        };
      })
      .finally(() => {
        statusRefresh = null;
      });
  }
  return statusRefresh;
}

const STATUS_HEADERS = {
  'Cache-Control': 'public, max-age=15, s-maxage=15, stale-while-revalidate=30'
};

export const GET = async () => {
  const now = Date.now();

  // Fresh snapshot → answer instantly, without touching Beszel at all.
  if (statusCache.payload && now - statusCache.at < STATUS_FRESH_TTL_MS) {
    return json(statusCache.payload, { headers: { ...STATUS_HEADERS, 'X-Cache': 'hit' } });
  }

  const refresh = refreshStatus();

  // Stale snapshot → answer now and let Beszel catch up in the background;
  // the page's next poll picks up the refreshed payload.
  if (statusCache.payload && now - statusCache.at < STATUS_STALE_TTL_MS) {
    return json(statusCache.payload, { headers: { ...STATUS_HEADERS, 'X-Cache': 'stale' } });
  }

  // Cold start: nothing to serve yet, so wait for the first refresh.
  const payload = await refresh;
  return json(payload, { headers: { ...STATUS_HEADERS, 'X-Cache': 'miss' } });
};



