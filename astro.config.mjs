import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
        enabled: true
    },
    runtime: { mode: 'local', type: 'pages' },
    nodejsCompat: true
  })
});
