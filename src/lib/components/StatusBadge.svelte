<script>
  import { t } from '$lib/i18n/index.svelte.js';

  /**
   * Crisp status pill used across the dashboard.
   * @typedef {'online' | 'offline' | 'active' | 'inactive' | 'unknown'} Status
   * @type {{ status?: Status | string, size?: 'sm' | 'md' }} props
   */
  let { status = 'unknown', size = 'sm' } = $props();

  const STYLES = {
    online: { key: 'common.online', cls: 'border-signal/40 bg-signal/10 text-signal', dot: 'bg-signal' },
    active: { key: 'common.active', cls: 'border-signal/40 bg-signal/10 text-signal', dot: 'bg-signal' },
    offline: { key: 'common.offline', cls: 'border-alert/40 bg-alert/10 text-alert', dot: 'bg-alert' },
    inactive: { key: 'common.inactive', cls: 'border-alert/40 bg-alert/10 text-alert', dot: 'bg-alert' },
    unknown: { key: 'common.unknown', cls: 'border-edge bg-panel-2 text-dim', dot: 'bg-dim' }
  };

  let style = $derived(STYLES[/** @type {keyof typeof STYLES} */ (status)] ?? STYLES.unknown);
  let pulse = $derived(status === 'online' || status === 'active');
</script>

<span
  class="inline-flex items-center gap-1.5 rounded-full border px-2.5 {style.cls} {size === 'md'
    ? 'text-xs'
    : 'text-[0.68rem]'} font-medium"
>
  <span class="relative flex h-1.5 w-1.5">
    {#if pulse}
      <span class="absolute inline-flex h-full w-full animate-ping rounded-full {style.dot} opacity-60"></span>
    {/if}
    <span class="relative inline-flex h-1.5 w-1.5 rounded-full {style.dot}"></span>
  </span>
  {t(style.key)}
</span>

