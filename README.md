# tendaisibanda.dev — Astro portfolio redesign

A lightweight portfolio + writing site for Tendai Sibanda, designed around bioinformatics, computational genomics, statistics, machine learning and research.

## Included

- Astro + TypeScript source
- 17 migrated project case studies
- 3 starter writing posts (review/edit before public deployment)
- Projects and writing filters
- Light/dark theme
- Smooth reveal + page transitions with reduced-motion support
- Reading progress indicator
- Responsive project figure galleries
- 480px / 900px WebP project thumbnails with original-resolution lightbox viewing
- Keyboard-accessible project image lightbox
- Formspree contact form using the existing endpoint
- SEO/Open Graph scaffolding, RSS and sitemap integration
- Dependency-free static preview

## Preview immediately

From the project root:

```bash
python3 -m http.server 8000 -d static-preview
```

Then open `http://localhost:8000`.

## Run the Astro source

```bash
npm install
npm run dev
```

Production validation:

```bash
npm run build
npm run preview
```

## Project image system

Project figures are intentionally not rendered at their original size inside case studies.

- Normal page view loads responsive WebP derivatives.
- Charts and screenshots use `object-fit: contain`; axes and legends are never cropped.
- Galleries use two columns on normal desktop widths and three columns for large galleries on wide screens.
- Mobile collapses galleries to one column.
- Selecting a figure opens the original image in a full-resolution lightbox.
- Tables/wide outputs receive shorter display heights; tall plots receive a little more vertical room.

When adding a new project figure, keep the original in `public/images/` and use the same responsive markup pattern as the existing project Markdown. To regenerate the WebP derivatives:

```bash
python3 -m pip install pillow
python3 scripts/generate_project_thumbnails.py
```

## Add a blog post

Create `src/content/blog/my-post.md` with frontmatter:

```md
---
title: "My post"
description: "One-sentence description."
date: 2026-09-07
category: "Research Notes"
tags: [Bioinformatics, Statistics]
relatedProject: "graph-cross-correction-simulation"
draft: false
---

Write the article here.
```

## Add a project

Create `src/content/projects/my-project.md`. The Projects page and route are generated from the content collection.

## Main configuration

Edit `src/config.ts` for social links, site metadata and the Formspree endpoint.

## Content notes

The three included writing posts are starter drafts derived from existing project material. Review wording and dates before treating them as published posts.

## Deployment

The repository includes `netlify.toml`. It can also deploy as a static Astro site to Vercel or Cloudflare Pages.
