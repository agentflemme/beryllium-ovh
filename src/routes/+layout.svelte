<script>
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { initLang, getLang } from '$lib/i18n/index.svelte.js';

  let { children } = $props();

  // Apply stored/browser language after hydration (SSR always renders the
  // default language so prerendered pages stay cacheable).
  onMount(() => {
    initLang();
    document.documentElement.lang = getLang();
  });
</script>

<div class="flex min-h-screen flex-col">
  <Header />
  <main class="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
    <!-- Re-keyed on navigation so the enter animation replays on page change. -->
    {#key page.url.pathname}
      <div class="page-enter">
        {@render children()}
      </div>
    {/key}
  </main>
  <Footer />
</div>

