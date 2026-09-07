# Validation summary

## Completed checks

- 17 project Markdown files generated.
- Every project includes:
  - `The problem`
  - `Approach`
  - `Key implementation decision`
  - one selected code block
  - `Results & evidence`
  - `What challenged me`
  - `What I learned`
  - `What I would improve next`
- Every selected code block is 15 lines or fewer.
- Project frontmatter parses as YAML and includes the new `question`, `focus`, and `outcome` fields.
- No project Markdown file contains an embedded `<style>` tag.
- 176 local project-image references were checked against the supplied repository's `public/images` tree; no referenced image was missing.
- The bundle excludes deployment workflows, `site.js`, Git metadata, `node_modules`, `.astro`, and `dist` so it does not overwrite the user's later deployment/theme/navigation fixes.

## Build check limitation

A full `npm run build` could not be completed in the Linux packaging environment because the uploaded `node_modules` directory was installed on macOS and therefore did not contain Rollup's Linux-native optional package (`@rollup/rollup-linux-x64-gnu`). An attempted package reinstall timed out in the sandbox.

Run these checks on the target Mac after copying the files:

```bash
npm install
npm run build
npm run preview
```

Do not commit until the Mac build and production preview both pass.
