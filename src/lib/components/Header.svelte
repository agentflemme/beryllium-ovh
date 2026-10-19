<script>
  import { page } from '$app/state';
  import { SITE, PANELS } from '$lib/config.js';
  import { t, getLang, toggleLang } from '$lib/i18n/index.svelte.js';
  import Dropdown from './Dropdown.svelte';

  const links = [
    { href: '/', labelKey: 'nav.home' },
    { href: '/status', labelKey: 'nav.status' },
    { href: '/services', labelKey: 'nav.services' },
  ];

  let path = $derived(page.url.pathname);
</script>

<header class="sticky top-0 z-40 border-b border-edge/70 bg-abyss/80 backdrop-blur-md">
  <div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
    <a href="/" class="group flex items-center gap-3" aria-label="{SITE.name} — home">
      <img src="/favicon.png" alt="Beryllium" class="w-10 h-10 object-contain" />
      <span class="flex flex-col leading-tight">
        <span class="font-mono text-sm font-semibold tracking-[0.22em] text-slate-100">
          {SITE.name.toUpperCase()}
        </span>
        <span class="hidden text-[0.68rem] text-dim sm:block">{SITE.domain}</span>
      </span>
    </a>

    <nav class="flex items-center gap-1 sm:gap-2">
      {#each links as link (link.href)}
        <a
          href={link.href}
          class="rounded-full px-3 py-1.5 text-sm transition-colors {path === link.href
            ? 'bg-iris/10 text-iris'
            : 'text-dim hover:bg-panel-2 hover:text-slate-200'}"
          aria-current={path === link.href ? 'page' : undefined}
        >
          {t(link.labelKey)}
        </a>
      {/each}

      <Dropdown label={t('nav.panels')} items={PANELS} />

      <button
        type="button"
        onclick={toggleLang}
        aria-label={t('nav.switchTo')}
        title={t('nav.switchTo')}
        class="flex items-center gap-1.5 rounded-full border border-edge bg-panel-2 px-3 py-1.5 font-mono text-sm text-slate-300 transition-colors hover:border-iris/40 hover:text-iris"
      >
        <svg
          class="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
        </svg>
        {getLang().toUpperCase()}
      </button>

      <!-- svelte-ignore a11y_consider_explicit_label -->
      <a
        href='https://discord.com/invite/hmvWhxMnE'
        target="_blank"
        rel="noopener noreferrer"
        class="rounded-full px-3 py-1.5 text-sm transition-colors {path === 'https://discord.com/invite/hmvWhxMnE'
          ? 'bg-iris/10 text-iris'
          : 'text-dim hover:bg-panel-2 hover:text-slate-200'}"
        aria-current={path === 'https://discord.com/invite/hmvWhxMnE' ? 'page' : undefined}
      >
        <svg class="w-5 h-5 fill-current" viewBox="0 0 127.14 96.36" xmlns="http://www.w3.org/2000/svg">
          <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.15c2.62-27.29-4.52-51.2-19.49-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5.18-12.72,11.45-12.72S53.9,46,53.88,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.18-12.72,11.45-12.72S96.14,46,96.12,53,91,65.69,84.69,65.69Z"/>
        </svg>
      </a>
    </nav>
  </div>
</header>

