<script>
  import { SITE, SERVICES, DONATE_URL } from '$lib/config.js';
  import { t } from '$lib/i18n/index.svelte.js';
  import { reveal } from '$lib/actions/reveal.js';
</script>

<svelte:head>
  <title>{t('services.title')} — {SITE.name}</title>
  <meta name="description" content={t('services.subtitle')} />
</svelte:head>

<section class="mb-10">
  <p class="label-caps">{t('services.kicker')}</p>
  <h1 class="mt-2 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
    {t('services.title')}
  </h1>
  <p class="mt-3 max-w-2xl text-sm leading-relaxed text-dim">{t('services.subtitle')}</p>
</section>

<div class="grid gap-6 md:grid-cols-2">
  {#each SERVICES as service, i (service.id)}
    <article class="panel flex flex-col p-6 transition-colors hover:border-iris/40" use:reveal={i * 70}>
      {#if service.badge}
        <span
          class="mb-4 w-fit rounded-full border border-warn/40 bg-warn/10 px-2.5 py-1 text-[0.68rem] font-medium text-warn"
        >
          {service.badge}
        </span>
      {/if}

      <h2 class="text-lg font-semibold text-slate-100">{service.name}</h2>
      {#if service.tagline}
        <p class="mt-1 text-sm text-iris">{service.tagline}</p>
      {/if}
      {#if service.description}
        <p class="mt-4 text-sm leading-relaxed text-dim">{service.description}</p>
      {/if}

      {#if service.features?.length}
        <p class="label-caps mt-5">{t('services.featuresTitle')}</p>
        <ul class="mt-3 mb-3 space-y-2 text-sm text-slate-300">
          {#each service.features as feature (feature)}
            <li class="flex items-start gap-2.5">
              <svg
                class="mt-1.5 h-4 w-4 shrink-0 text-signal"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                aria-hidden="true"
              >
                <path d="m5 13 4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {feature}
            </li>
          {/each}
        </ul>
      {/if}

      <div class="mt-auto border-t border-edge/60 pt-4">
        {#if service.priceCents}
          <p class="font-mono text-sm font-semibold text-signal">{service.priceCents}</p>
        {/if}
        {#if service.priceCentsNote}
          <p class="mt-1 text-xs text-dim">{service.priceCentsNote}</p>
        {/if}
      </div>
    </article>
  {/each}
</div>

<section class="panel mt-10 flex flex-wrap items-center justify-between gap-4 p-6">
  <p class="text-sm text-dim">
    {t('services.contactCta').replace('{email}', SITE.contactEmail)}
  </p>
  <div class="flex gap-3">
    <a
      href="/tos"
      class="lift rounded-full border border-edge bg-panel-2 px-4 py-1.5 text-sm text-slate-300 hover:border-iris/40 hover:text-iris"
    >
      {t('footer.tos')}
    </a>
    {#if DONATE_URL}
      <a
        href={DONATE_URL}
        target="_blank"
        rel="noopener noreferrer"
        class="lift rounded-full border border-warn/40 bg-warn/10 px-4 py-1.5 text-sm text-warn hover:bg-warn/20"
      >
        {t('home.donationsCta')}
      </a>
    {/if}
  </div>
</section>
