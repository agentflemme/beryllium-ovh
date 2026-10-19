<script>
  import { SITE, NODES, monthlyNodeElectricityEuros } from '$lib/config.js';
  import { t, currentLocale } from '$lib/i18n/index.svelte.js';

  /** Fill placeholders. Only trusted, first-party dictionary HTML is used. */
  function fill(html) {
    return html
      .replaceAll('{email}', SITE.contactEmail)
      .replaceAll('{watts}', String(NODES.nodePowerWatts))
      .replaceAll('{priceCents}', NODES.kwhpriceCentsEuros.toLocaleString(currentLocale()))
      .replaceAll(
        '{electricity}',
        monthlyNodeElectricityEuros().toLocaleString(currentLocale(), {
          style: 'currency',
          currency: 'EUR'
        })
      )
      .replaceAll(
        '{date}',
        new Date().toLocaleDateString(currentLocale(), { month: 'long', year: 'numeric' })
      );
  }

  let sections = $derived(t('legal.sections'));
</script>

<svelte:head>
  <title>{t('legal.title')} — {SITE.name}</title>
  <meta name="description" content={t('legal.title')} />
</svelte:head>

<article class="max-w-3xl">
  <p class="label-caps">{t('legal.kicker')}</p>
  <h1 class="mt-2 text-3xl font-bold text-slate-50">{t('legal.title')}</h1>
  <p class="mt-2 text-sm text-dim">{fill(t('legal.updated'))}</p>

  {#each sections as section, i (i)}
    <section class="panel mt-6 p-6 sm:p-8 first:mt-8">
      <h2 class="text-lg font-semibold text-slate-100">{section.h}</h2>
      <div class="mt-4 space-y-4 text-sm leading-relaxed text-slate-300">
        {#each section.p as paragraph, j (j)}
          {@html fill(paragraph)}
        {/each}
      </div>
    </section>
  {/each}
</article>
