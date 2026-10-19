<script>
  import StatusBadge from './StatusBadge.svelte';
  import { formatPercent, formatRelative } from '$lib/utils/time.js';
  import { t } from '$lib/i18n/index.svelte.js';

  /** @type {{ node: {
   *   id: string, name: string, status: string,
   *   cpu: number | null, memory: number | null, disk: number | null,
   *   cpuModel: string | null, cpuCores: number | null, cpuThreads: number | null,
   *   type: string, updated: string | null
   * } }} */
  let { node } = $props();

  const TONES = {
    iris: 'bg-iris',
    signal: 'bg-signal',
    warn: 'bg-warn'
  };

  let metrics = $derived([
    { key: 'cpu', label: t('status.cpu'), value: node.cpu, tone: TONES.iris },
    { key: 'memory', label: t('status.memory'), value: node.memory, tone: TONES.signal },
    { key: 'disk', label: t('status.disk'), value: node.disk, tone: TONES.warn }
  ]);

  // Beszel info.m = CPU model, info.c = cores, info.t = threads.
  // Memory/Disk totals are not exposed by the Beszel PocketBase JSON API.
  let specs = $derived(
    [
      node.cpuModel ? { key: 'cpuModel', label: t('status.cpuModel'), value: node.cpuModel } : null,
      node.cpuCores != null ? {
        key: 'cpuCores',
        label: t('status.cpuCores'),
        value: node.cpuCores,
        unit: node.cpuThreads != null ? ` / ${node.cpuThreads} ${t('status.threads')}` : ` ${t('status.cores')}`
      } : null
    ].filter(Boolean)
  );
</script>

<article class="panel lift p-5 hover:border-iris/40">
  <header class="flex items-start justify-between gap-3">
    <div class="min-w-0">
      <h3 class="truncate text-base font-semibold text-slate-100" title={node.name}>{node.name}</h3>
      <p class="label-caps mt-1">{node.type}</p>
    </div>
    <StatusBadge status={node.status} />
  </header>

  <dl class="mt-5 space-y-3.5">
    {#each metrics as metric (metric.key)}
      <div>
        <div class="mb-1.5 flex items-baseline justify-between">
          <dt class="label-caps">{metric.label}</dt>
          <dd class="font-mono text-sm text-slate-200">{formatPercent(metric.value)}</dd>
        </div>
        <div class="h-1.5 w-full overflow-hidden rounded-full bg-edge/70">
          <div
            class="h-full rounded-full {metric.tone} transition-[width] duration-700 ease-out"
            style="width: {Math.min(Math.max(node.status === 'online' ? (metric.value ?? 0) : 0, 0), 100)}%"
          ></div>
        </div>
      </div>
    {/each}
  </dl>

  {#if specs.length > 0}
    <div class="mt-5 pt-4 border-t border-edge/60">
      <h4 class="label-caps mb-3">{t('status.specsHeading')}</h4>
      <dl class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {#each specs as spec (spec.key)}
          <div class="flex flex-col">
            <dt class="label-caps text-xs text-dim">{spec.label}</dt>
            <dd class="font-mono text-slate-200">{spec.value}{spec.unit ?? ''}</dd>
          </div>
        {/each}
      </dl>
    </div>
  {/if}

  <footer class="mt-5 flex items-center justify-between border-t border-edge/60 pt-3">
    <span class="label-caps">{t('status.updated')}</span>
    <span class="font-mono text-xs text-dim">{formatRelative(node.updated)}</span>
  </footer>
</article>
