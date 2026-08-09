import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://trybastion.ai',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
  // /articles shipped first and may be linked externally. Vercel serves the
  // real 301 (vercel.json); this covers local preview and other hosts.
  redirects: { '/articles': '/research' },
})
