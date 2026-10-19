<script>
  import { SITE, NODES, DONATE_URL, USERCOUNT, monthlyNodeElectricityEuros, monthlySubscriptionEuros, monthlyMiscEuros, pricePerUser } from '$lib/config.js';
  import { t, currentLocale } from '$lib/i18n/index.svelte.js';
  import { reveal } from '$lib/actions/reveal.js';

  function fill(str) {
    return str
      .replaceAll('{name}', SITE.name)
      .replaceAll('{watts}', String(NODES.nodePowerWatts))
      .replaceAll('{priceCents}', NODES.kwhpriceCentsEuros.toLocaleString(currentLocale()))
      .replaceAll('{userCount}', USERCOUNT)
      .replaceAll('{priceNode}', monthlyNodeElectricityEuros().toLocaleString(currentLocale(), {
        style: 'currency',
        currency: 'EUR'
      }))
      .replaceAll('{priceSecurity}', monthlySubscriptionEuros().toLocaleString(currentLocale(), {
        style: 'currency',
        currency: 'EUR'
      }))
      .replaceAll('{priceMisc}', monthlyMiscEuros().toLocaleString(currentLocale(), {
        style: 'currency',
        currency: 'EUR'
      }))
      .replaceAll('{priceMember}', pricePerUser().toLocaleString(currentLocale(), {
        style: 'currency',
        currency: 'EUR'
      }))
      ;
  }
</script>

<svelte:head>
  <title>{SITE.name} — {t('home.heroSubtitle')}</title>
  <meta name="description" content={t('home.heroText')} />
</svelte:head>

<!-- Hero -->
<section class="pb-14 pt-4 text-center">
  <p class="label-caps rise" style="--rise-delay: 0ms">{t('home.heroKicker')}</p>
  <h1
    class="rise mt-4 font-mono text-5xl font-bold tracking-[0.15em] text-slate-50 sm:text-6xl"
    style="--rise-delay: 80ms"
  >
    {SITE.name.toUpperCase()}
  </h1>
  <p class="rise mt-5 text-xl font-medium text-iris" style="--rise-delay: 160ms">
    {t('home.heroSubtitle')}
  </p>
  <p class="rise mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-dim sm:text-base" style="--rise-delay: 230ms">
    {t('home.heroText')}
  </p>
  <div class="rise mt-8 flex flex-wrap items-center justify-center gap-3" style="--rise-delay: 300ms">
    <a
      href="/status"
      class="lift inline-flex items-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-6 py-2.5 text-sm font-medium text-signal hover:bg-signal/20"
    >
      <span class="relative flex h-2 w-2">
        <span class="absolute h-2 w-2 animate-ping rounded-full bg-signal opacity-60"></span>
        <span class="relative h-2 w-2 rounded-full bg-signal"></span>
      </span>
      {t('home.ctaStatus')}
    </a>
    <a
      href="/services"
      class="lift rounded-full border border-edge bg-panel-2 px-6 py-2.5 text-sm text-slate-200 hover:border-iris/40 hover:text-iris"
    >
      {t('home.ctaServices')}
    </a>
  </div>
</section>

<!-- How it works -->
<section class="pb-14" use:reveal>
  <p class="label-caps">{t('home.howKicker')}</p>
  <h2 class="mt-2 text-2xl font-bold text-slate-50">{t('home.howTitle')}</h2>
  <p class="mt-3 max-w-2xl text-sm leading-relaxed whitespace-pre-line text-dim">{t('home.howText')}</p>
</section>

<!-- Cost transparency -->
<section class="pb-14" use:reveal>
  <p class="label-caps">{t('home.transparencyKicker')}</p>
  <h2 class="mt-2 text-2xl font-bold text-slate-50">{t('home.transparencyTitle')}</h2>
  <p class="mt-3 max-w-2xl text-sm leading-relaxed whitespace-pre-line text-dim">{t('home.transparencyText')}</p>

  <div class="mt-6 grid gap-5 md:grid-cols-3">
    <article class="panel p-6 transition-colors hover:border-iris/40" use:reveal={0}>
      <p class="label-caps">{t('home.cardPower')}</p>
      <p class="mt-3 font-mono text-2xl font-semibold text-iris">
        {fill(t('home.cardPowerValue'))}
      </p>
      <p class="mt-3 text-xs leading-relaxed text-dim">{fill(t('home.cardPowerNote'))}</p>
    </article>
    <article class="panel p-6 transition-colors hover:border-iris/40" use:reveal={90}>
      <p class="label-caps">{t('home.cardSecurity')}</p>
      <p class="mt-3 font-mono text-2xl font-semibold text-iris">{fill(t('home.cardSecurityValue'))}</p>
      <p class="mt-3 text-xs leading-relaxed text-dim">{t('home.cardSecurityNote')}</p>
    </article>
    <article class="panel p-6 transition-colors hover:border-iris/40" use:reveal={180}>
      <p class="label-caps">{t('home.cardMisc')}</p>
      <p class="mt-3 font-mono text-2xl font-semibold text-iris">{fill(t('home.cardMiscValue'))}</p>
      <p class="mt-3 text-xs leading-relaxed text-dim">{t('home.cardMiscNote')}</p>
    </article>
  </div>
  <div class="mt-6 grid gap-5 md:grid-cols-1">
    <article class="panel p-6 transition-colors border-signal/30" use:reveal={0}>
      <p class="label-caps">{t('home.cardMember')}</p>
      <p class="mt-3 font-mono text-2xl font-semibold text-signal">
        {fill(t('home.cardMemberValue'))}
      </p>
      <p class="mt-3 text-xs leading-relaxed text-dim">{fill(t('home.cardMemberNote'))}</p>
    </article>
  </div>
</section>

<!-- Donations -->
<section class="pb-14" use:reveal>
  <div class="panel border-warn/30 p-8">
    <div class="flex flex-wrap items-start justify-between gap-6">
      <div class="max-w-2xl">
        <p class="label-caps text-warn/80">{t('home.donationsKicker')}</p>
        <h2 class="mt-2 text-2xl font-bold text-slate-50">{t('home.donationsTitle')}</h2>
        <p class="mt-4 text-sm leading-relaxed whitespace-pre-line text-dim">{t('home.donationsText')}</p>
        <a href="/legal" class="mt-4 inline-block text-sm text-iris hover:underline">
          {t('home.donationsLink')}
        </a>
      </div>
      {#if DONATE_URL}
        <a
          href={DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          class="lift shrink-0 rounded-full border border-warn/40 bg-warn/10 px-6 py-2.5 text-sm font-medium text-warn hover:bg-warn/20"
        >
          {t('home.donationsCta')}
        </a>
      {/if}
    </div>
  </div>
</section>

<!-- Status teaser -->
<section class="text-center" use:reveal>
  <p class="label-caps">{t('home.statusKicker')}</p>
  <h2 class="mt-2 text-2xl font-bold text-slate-50">{t('home.statusTitle')}</h2>
  <p class="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-dim">{t('home.statusText')}</p>
  <a
    href="/status"
    class="lift mt-6 inline-block rounded-full border border-iris/40 bg-iris/10 px-6 py-2.5 text-sm text-iris hover:bg-iris/20"
  >
    {t('home.statusCta')}
  </a>
</section>
