<script>
  import { t } from '$lib/i18n/index.svelte.js';

  /** @type {{ monitor: {
   *   id: string, name: string, status: string, url: string | null,
   *   type: string, currentStateDuration: number | null,
   *   lastIncident: { startedAt: string | null, duration: number | null, status: string | null } | null
   * } }} */
  let { monitor } = $props();

  /** Format seconds into a human-readable "Xd Yh" or "Xh Ym" string. */
  function formatDuration(sec) {
    if (sec == null || sec < 0) return null;
    const d = Math.floor(sec / 86400);
    const h = Math.floor((sec % 86400) / 3600);
    const m = Math.floor((sec % 3600) / 60);
    if (d > 0) return `${d}d ${h}h`;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  }

  let upForDisplay = $derived(
    monitor.status === 'online' && monitor.currentStateDuration != null
      ? formatDuration(monitor.currentStateDuration)
      : null
  );

  let lastIncidentDisplay = $derived(
    monitor.lastIncident?.startedAt
      ? new Date(monitor.lastIncident.startedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
      : null
  );

  let lastIncidentDuration = $derived(
    monitor.lastIncident?.duration != null
      ? formatDuration(monitor.lastIncident.duration)
      : null
  );
</script>

<div class="flex flex-col items-end gap-0.5 text-right">
  {#if upForDisplay}
    <span class="font-mono text-xs text-signal">
      {t('status.upFor').replace('{duration}', upForDisplay)}
    </span>
  {/if}
  {#if lastIncidentDisplay}
    <span class="label-caps text-[10px] text-dim">
      {t('status.lastIncident')
        .replace('{date}', lastIncidentDisplay)
        .replace('{duration}', lastIncidentDuration ?? '—')}
    </span>
  {/if}
</div>