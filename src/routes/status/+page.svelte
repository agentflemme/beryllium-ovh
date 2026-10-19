<script>
  import { onMount } from 'svelte';
  import NodeCard from '$lib/components/NodeCard.svelte';
  import StatusBadge from '$lib/components/StatusBadge.svelte';
  import UptimeGraph from '$lib/components/UptimeGraph.svelte';
  import StatusSkeleton from '$lib/components/StatusSkeleton.svelte';
  import { SITE } from '$lib/config.js';
  import { formatClock, formatPercent, formatRelative } from '$lib/utils/time.js';
  import { t, currentLocale } from '$lib/i18n/index.svelte.js';

  // No props: the page renders immediately (skeleton placeholders) and the
  // telemetry is fetched client-side after mount, so a slow Beszel hub never
  // blocks navigation to this route.
  let status = $state(null);
  let refreshing = $state(false);
  let loadFailed = $state(false);
  let refreshFailed = $state(false);
  let slowHint = $state(false);
  let nextRefreshIn = $state(20);

  const POLL_SECONDS = 20;
  /* After this long without data, tell the visitor the hubs are just slow. */
  const SLOW_HINT_MS = 8000;

  let slowTimer;

  onMount(() => {
    refresh();

    const poll = setInterval(async () => {
      nextRefreshIn = POLL_SECONDS;
      await refresh();
    }, POLL_SECONDS * 1000);

    const ticker = setInterval(() => {
      nextRefreshIn = Math.max(0, nextRefreshIn - 1);
    }, 1000);

    return () => {
      clearInterval(poll);
      clearInterval(ticker);
      clearTimeout(slowTimer);
    };
  });

  async function refresh() {
    if (refreshing) return;
    refreshing = true;

    if (!status) {
      // First load (or a retry after a failure): show the skeleton again and
      // schedule the "hubs are slow" hint while we wait.
      loadFailed = false;
      slowHint = false;
      clearTimeout(slowTimer);
      slowTimer = setTimeout(() => (slowHint = true), SLOW_HINT_MS);
    }

    try {
      const res = await fetch('/api/status');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      status = await res.json();
      loadFailed = false;
      refreshFailed = false;
    } catch {
      // Keep the last good snapshot instead of blanking the dashboard.
      if (status) refreshFailed = true;
      else loadFailed = true;
    } finally {
      refreshing = false;
      clearTimeout(slowTimer);
    }
  }

  let loading = $derived(status === null && !loadFailed);
  let nodes = $derived(status?.nodes ?? []);
  let monitors = $derived(status?.monitors ?? []);
  let errors = $derived(Object.entries(status?.errors ?? {}));
  let onlineCount = $derived(nodes.filter((n) => n.status === 'online').length);
  let upCount = $derived(monitors.filter((m) => m.status === 'online').length);
</script>

<svelte:head>
  <title>{t('status.title')} — {SITE.name}</title>
  <meta
    name="description"
    content={t('status.subtitle')}
  />
</svelte:head>

<section class="mb-10">
  <p class="label-caps">{t('status.kicker')}</p>
  <h1 class="mt-2 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
    {t('status.title')}
  </h1>
  <p class="mt-3 max-w-2xl text-sm leading-relaxed text-dim">{t('status.subtitle')}</p>
</section>

<section class="panel mb-8 flex flex-wrap items-center justify-between gap-4 p-4">
  <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
    <div class="flex items-center gap-2">
      <span class="label-caps">{t('status.nodesLabel')}</span>
      <span class="font-mono text-sm text-slate-200">
        {#if nodes.length}
          {t('status.nodesCount')
            .replace('{online}', String(onlineCount))
            .replace('{total}', String(nodes.length))}
        {:else}
          —
        {/if}
      </span>
    </div>
    <div class="flex items-center gap-2">
      <span class="label-caps">{t('status.monitorsLabel')}</span>
      <span class="font-mono text-sm text-slate-200">
        {#if monitors.length}
          {t('status.monitorsCount')
            .replace('{up}', String(upCount))
            .replace('{total}', String(monitors.length))}
        {:else}
          —
        {/if}
      </span>
    </div>
    <div class="flex items-center gap-2">
      <span class="label-caps">{t('status.updatedLabel')}</span>
      <span class="font-mono text-sm text-slate-200">{formatClock(status?.timestamp)}</span>
    </div>
  </div>

  <button
    type="button"
    onclick={refresh}
    disabled={refreshing}
    class="inline-flex items-center gap-2 rounded-full border border-iris/40 bg-iris/10 px-4 py-1.5 text-sm text-iris transition-colors hover:bg-iris/20 disabled:cursor-not-allowed disabled:opacity-50"
  >
    <svg
      class="h-3.5 w-3.5 {refreshing ? 'animate-spin' : ''}"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-2.64-6.36" stroke-linecap="round" />
      <path d="M21 3v6h-6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    {refreshing
      ? t('status.refreshing')
      : t('status.refresh').replace('{seconds}', String(nextRefreshIn))}
  </button>
</section>

{#if errors.length > 0}
  <div class="mb-8 space-y-2">
    {#each errors as [source, message] (source)}
      <div
        class="flex items-center gap-2 rounded-lg border border-warn/30 bg-warn/5 px-4 py-2 text-xs text-warn"
      >
        <span class="font-mono uppercase">{source}</span>
        <span>— {message}</span>
      </div>
    {/each}
  </div>
{/if}

{#if refreshFailed}
  <div
    class="mb-8 flex items-center gap-2 rounded-lg border border-warn/30 bg-warn/5 px-4 py-2 text-xs text-warn"
  >
    <span>{t('status.refreshFailed')}</span>
  </div>
{/if}

{#if loading}
  <div class="mb-10" role="status" aria-live="polite" aria-busy="true">
    <div class="panel mb-6 flex items-center gap-3 p-4">
      <svg
        class="h-4 w-4 shrink-0 animate-spin text-iris"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M21 12a9 9 0 1 1-2.64-6.36" stroke-linecap="round" />
      </svg>
      <div>
        <p class="text-sm text-slate-200">
          {slowHint ? t('status.slowLoadTitle') : t('status.loadingTitle')}
        </p>
        <p class="mt-0.5 text-xs text-dim">
          {slowHint ? t('status.slowLoadText') : t('status.loadingText')}
        </p>
      </div>
    </div>
    <StatusSkeleton />
  </div>
{:else if nodes.length === 0 && monitors.length === 0}
  <div class="panel p-10 text-center">
    <p class="text-lg font-semibold text-slate-200">{t('status.unavailableTitle')}</p>
    <p class="mx-auto mt-2 max-w-md text-sm text-dim">{t('status.unavailableText')}</p>
    <button
      type="button"
      onclick={refresh}
      class="mt-6 rounded-full border border-iris/40 bg-iris/10 px-5 py-2 text-sm text-iris hover:bg-iris/20"
    >
      {t('common.retry')}
    </button>
  </div>
{:else}
  {#if monitors.length > 0}
    <h2 class="label-caps mb-4">{t('status.monitorsHeading')}</h2>
    <div class="panel mb-10 divide-y divide-edge/60 rise">
      {#each monitors as monitor (monitor.id)}
        <div class="flex items-center justify-between gap-4 px-5 py-3.5">
          <div class="flex min-w-0 items-center gap-3">
            <svg
              class="h-4 w-4 shrink-0 {monitor.status === 'online' ? 'text-signal' : 'text-alert'}"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                stroke-linecap="round"
              />
              <path
                d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                stroke-linecap="round"
              />
            </svg>
            <div class="min-w-0">
              <span class="truncate text-sm text-slate-200 block">{monitor.name}</span>
              {#if monitor.type}
                <span class="label-caps text-[10px] text-dim">{monitor.type}</span>
              {/if}
            </div>
          </div>
          <div class="flex items-center gap-4">
            <UptimeGraph {monitor} />
            <StatusBadge status={monitor.status} />
          </div>
        </div>
      {/each}
    </div>
  {/if}

  {#if nodes.length > 0}
    <h2 class="label-caps mb-4">{t('status.nodesHeading')}</h2>
    <div class="mb-10 grid gap-5 rise sm:grid-cols-2 lg:grid-cols-3">
      {#each nodes as node (node.id)}
        <NodeCard {node} />
      {/each}
    </div>
  {/if}
{/if}

{#if status}
  <p class="mt-8 text-center text-xs text-dim">
    {@html t('status.lastReceived')
      .replace('{when}', formatRelative(status?.timestamp))
      .replace('{cpu}', nodes.length ? formatPercent(nodes.reduce((acc, n) => acc + (n.cpu ?? 0), 0) / nodes.length) : '—')
      .replace('{memory}', nodes.length ? formatPercent(nodes.reduce((acc, n) => acc + (n.memory ?? 0), 0) / nodes.length) : '—')
      .replace('{disk}', nodes.length ? formatPercent(nodes.reduce((acc, n) => acc + (n.disk ?? 0), 0) / nodes.length) : '—')}
    · {@html t('status.costNote')}
  </p>
{/if}


