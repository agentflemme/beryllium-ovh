<script>
  import { page } from '$app/state';
  import { t } from '$lib/i18n/index.svelte.js';
</script>

<div class="panel mx-auto max-w-lg p-10 text-center">
  <p class="font-mono text-5xl font-bold text-iris">{page.status}</p>
  <h1 class="mt-4 text-xl font-semibold text-slate-100">
    {page.status === 404 ? t('error.notFound') : t('error.generic')}
  </h1>
  <p class="mt-2 text-sm text-dim">{page.error?.message ?? t('error.fallback')}</p>
  <a
    href="/"
    class="mt-6 inline-block rounded-full border border-iris/40 bg-iris/10 px-5 py-2 text-sm text-iris transition-colors hover:bg-iris/20"
  >
    {t('common.backHome')}
  </a>
</div>

