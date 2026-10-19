<script>
  import { SITE, NODES, monthlyNodeElectricityEuros } from '$lib/config.js';
  import { t, currentLocale } from '$lib/i18n/index.svelte.js';

  const year = new Date().getFullYear();

  function fill(str) {
    return str
      .replaceAll('{watts}', String(NODES.nodePowerWatts))
      .replaceAll('{priceNode}', monthlyNodeElectricityEuros().toLocaleString(currentLocale(), {
        style: 'currency',
        currency: 'EUR'
      }))
      .replaceAll('{year}', String(year))
      .replaceAll('{name}', SITE.name);
  }
</script>

<footer class="mt-16 border-t border-edge/70 bg-panel/40">
  <div class="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
    <div>
      <p class="font-mono text-sm font-semibold tracking-[0.22em] text-slate-100">
        {SITE.name.toUpperCase()}
      </p>
      <p class="mt-3 max-w-xs text-sm leading-relaxed text-dim">{fill(t('footer.tagline'))}</p>
    </div>

    <div>
      <p class="label-caps">{t('footer.legalTitle')}</p>
      <ul class="mt-3 space-y-2 text-sm">
        <li>
          <a class="text-slate-300 hover:text-iris" href="/legal">{t('footer.legal')}</a>
        </li>
        <li><a class="text-slate-300 hover:text-iris" href="/tos">{t('footer.tos')}</a></li>
      </ul>
    </div>

    <div>
      <p class="label-caps">{t('footer.contactTitle')}</p>
      <a
        class="mt-3 inline-block font-mono text-sm text-iris hover:underline"
        href="mailto:{SITE.contactEmail}"
      >
        {SITE.contactEmail}
      </a>
      <p class="mt-3 text-xs leading-relaxed text-dim">{fill(t('footer.monitored'))}</p>
    </div>
  </div>

  <div class="border-t border-edge/60">
    <div
      class="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-dim sm:flex-row sm:items-center sm:justify-between sm:px-6"
    >
      <span>{fill(t('footer.nonDiffusible'))}</span>
      <span class="font-mono">{t('footer.bestEffort')}</span>
    </div>
  </div>
</footer>

