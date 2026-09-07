import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://tendaisibanda.dev',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark-default', wrap: true },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  }
});
