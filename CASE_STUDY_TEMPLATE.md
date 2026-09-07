# Project case-study template

Use this structure for future projects. The website should carry the reasoning; GitHub should carry the full source code.

```yaml
---
title: "Project title"
description: "One concise sentence describing the project."
category: "Research & Modelling"
technologies: ["Python", "R"]
featured: false
visual: "grid"
github: "https://github.com/..."
question: "What question did this project investigate?"
focus: ["Method", "Domain", "Tool"]
outcome: "What tangible output did the project produce?"
keyChallenge: "The main technical or analytical challenge."
---
```

Recommended body:

1. `## The problem` — context and why the problem matters.
2. Question callout — one precise question.
3. `## Approach` — 3–6 ordered steps, not a notebook transcript.
4. `## Key implementation decision` — explain one decision that demonstrates reasoning.
5. One selected code block — usually 5–20 lines.
6. `Why this matters` callout — interpret the code instead of narrating syntax.
7. `## Results & evidence` — selected plots/tables/screenshots.
8. `## What challenged me` — what went wrong or required thought.
9. `## What I learned` — 2–4 concrete lessons.
10. `## What I would improve next` — limitations and future work.

Guidelines:

- Do not paste the full notebook into the website.
- Link to GitHub for the complete implementation.
- Prefer 1 strong code snippet to 100 lines of setup/imports.
- Results should show evidence, not only screenshots of code output.
- State limitations explicitly, especially for medical, biological and financial modelling.
- Avoid causal or production-grade claims that the analysis did not establish.
