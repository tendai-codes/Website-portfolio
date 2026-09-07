# Apply the project case-study redesign

This bundle contains only the files required for the project-presentation update. It intentionally does **not** include deployment workflows, `site.js`, global theme logic, Git metadata, `node_modules`, `.astro`, or `dist`, so copying it into the current repository will not undo later fixes.

## Files changed

- `src/content/projects/*.md` — all 17 project pages rewritten as concise technical case studies.
- `src/content.config.ts` — adds `question`, `focus`, `outcome`, and `keyChallenge` project metadata.
- `src/layouts/ProjectLayout.astro` — adds question/focus/outcome summary and related-writing section.
- `src/pages/projects/[...slug].astro` — finds blog posts whose `relatedProject` matches the project title.
- `src/components/ProjectCard.astro` — changes project CTA wording to `Read case study`.
- `src/pages/projects/index.astro` — reframes the Projects archive around technical case studies.
- `src/styles/project-case-study.css` — isolated styles for the new editorial project layout.
- `CASE_STUDY_TEMPLATE.md` — template for future projects.

## macOS / VS Code application

From the current repository root:

```bash
cd "/Users/tendaisibanda/Documents/Github Projects/Website portfolio/Website-portfolio"
git status
```

Create a safety branch if desired:

```bash
git switch -c project-case-study-redesign
```

Extract this bundle elsewhere, then copy its contents over the repository root. Do **not** delete unrelated files.

Run:

```bash
npm install
npm run dev
```

Review `/projects/` and representative pages from each category.

Then:

```bash
npm run build
npm run preview
```

Finally inspect:

```bash
git status --short
```

Commit only after the build and production preview pass.
