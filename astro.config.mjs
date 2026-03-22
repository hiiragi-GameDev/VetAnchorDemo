import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://hiiragi-GameDev.github.io',
  base: '/VetAnchorDemo',
  integrations: [react()],
});
