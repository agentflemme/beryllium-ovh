import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    // adapter-node serves the prerendered (static) legal pages while keeping
    // /api/status as a real zero-state server endpoint for live telemetry.
    adapter: adapter()
  }
};

export default config;
