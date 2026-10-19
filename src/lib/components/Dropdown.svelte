<script>
  import { onMount } from 'svelte';

  /** Accessible dropdown menu (navbar "Panels" etc.).
   *  @type {{ label: string, items: { label: string, href: string }[] }} */
  let { label, items } = $props();

  let open = $state(false);
  let root;

  function close() {
    open = false;
  }

  function onPointerDown(event) {
    if (open && root && !root.contains(event.target)) close();
  }

  function onKeydown(event) {
    if (event.key === 'Escape') close();
  }

  onMount(() => {
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeydown);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeydown);
    };
  });
</script>

<div class="relative" bind:this={root}>
  <button
    type="button"
    class="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors {open
      ? 'bg-iris/10 text-iris'
      : 'text-dim hover:bg-panel-2 hover:text-slate-200'}"
    aria-haspopup="menu"
    aria-expanded={open}
    onclick={() => (open = !open)}
  >
    {label}
    <svg
      class="h-3 w-3 transition-transform {open ? 'rotate-180' : ''}"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>

  {#if open}
    <div
      role="menu"
      class="pop-in panel absolute right-0 z-50 mt-2 min-w-52 overflow-hidden p-1.5 shadow-2xl shadow-black/40"
    >
      {#each items as item (item.label)}
        <a
          role="menuitem"
          href={item.href}
          target={item.href.startsWith('http') ? '_blank' : undefined}
          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          class="block rounded-lg px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-iris/10 hover:text-iris"
          onclick={close}
        >
          <span class="inline-flex items-center justify-between gap-3 w-full">
            {item.label}
            {#if item.href.startsWith('http')}
              <svg
                class="h-3 w-3 opacity-60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  d="M7 17 17 7M9 7h8v8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            {/if}
          </span>
        </a>
      {/each}
    </div>
  {/if}
</div>
