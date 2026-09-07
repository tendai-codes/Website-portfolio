---
title: "Box Office Data Analysis"
description: "An exploratory R analysis of top-grossing US films, focusing on release timing, genre, studio and domestic gross patterns."
category: "Data Analysis"
technologies: ["R", "ggplot2", "EDA", "Data Visualisation"]
featured: false
visual: "grid"
github: "https://github.com/tendai-codes/Data-Analysis/tree/main/box-office-analysis"
question: "What patterns appear when release timing, genre, studio and gross are explored together rather than as isolated variables?"
focus: ["Exploratory analysis", "Visual design", "R / ggplot2"]
outcome: "A compact set of visual comparisons for release-day and genre/studio patterns."
keyChallenge: "Overlapping outliers and jitter points in ggplot2 caused clutter. I resolved this with outlier.colour = NA and alpha blending."
---
## The problem

This project explored publicly available data on top-grossing US films to identify patterns across genres, studios, and release schedules. I used R and ggplot2 for data exploration and visualisation.

<div class="case-question">
  <span class="case-note-label">Question</span>
  <p>What patterns appear when release timing, genre, studio and gross are explored together rather than as isolated variables?</p>
</div>

## Approach

Rather than presenting the project as a notebook dump, this case study focuses on the decisions that shaped the analysis.

1. Import & inspect data: Used read.csv() , summary() , and str()
2. Initial exploration: Identified no Monday releases using a bar plot of Day.of.Week
3. Filtering for significance: Narrowed to key genres and major studios
4. Visualisation: Created jitter + box plots comparing domestic gross
5. Aesthetics: Tuned themes for clarity and presentation

## Key implementation decision

### Use layered plots to preserve both distribution and individual observations

A box plot summarises the distribution, while jittered points keep the underlying films visible. Removing duplicate outlier markers and using transparency reduced visual clutter.

```r
p <- ggplot(data = mov2, aes(x = Genre, y = Gross...US))

q <- p +
  geom_jitter(aes(size = Budget...mill., colour = Studio), alpha = 0.65) +
  geom_boxplot(alpha = 0.7, outlier.colour = NA)
```

<div class="case-comment">
  <span class="case-note-label">Why this matters</span>
  <p>The project was less about fitting a model and more about learning how filtering and visual encoding change what can be seen in a dataset. That made chart construction itself an analytical decision.</p>
</div>

## Results & evidence

The figures below are the project evidence I would show first. The full implementation remains available through the GitHub link at the top of the page.

<div class="image-gallery">
<figure>
<img alt="Figure 1: No releases on Mondays" class="gallery-trigger" data-caption="Figure 1: No releases on Mondays" data-full="/images/box_office.png" data-gallery="box-analysis" decoding="async" height="840" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/box_office-900.webp" srcset="/images/thumbs/box_office-480.webp 480w, /images/thumbs/box_office-900.webp 900w" width="840"/>
<figcaption><strong>Figure 1</strong> No releases on Mondays</figcaption>
</figure>
<figure>
<img alt="Figure 2: Domestic gross by genre" class="gallery-trigger" data-caption="Figure 2: Domestic gross by genre" data-full="/images/box_genre.png" data-gallery="box-analysis" decoding="async" height="840" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/box_genre-900.webp" srcset="/images/thumbs/box_genre-480.webp 480w, /images/thumbs/box_genre-900.webp 900w" width="840"/>
<figcaption><strong>Figure 2</strong> Domestic gross by genre</figcaption>
</figure>
</div>

## What challenged me

Overlapping outliers and jitter points in ggplot2 caused clutter. I resolved this with outlier.colour = NA and alpha blending.

## What I learned

- Visual encoding choices can change whether patterns are legible or buried under overlapping observations.
- Filtering to meaningful genre/studio subsets made the comparison clearer than plotting every category at once.
- Exploratory patterns are prompts for further testing, not causal conclusions.

## What I would improve next

- Add sample-size labels so genre comparisons are easier to contextualise.
- Test whether the apparent release-day pattern persists in a larger or more recent dataset.
- Separate exploratory observations from claims that would require statistical testing.

<div class="case-end-note">
  <strong>Full implementation:</strong> use the GitHub link in the project header for the complete notebook/code rather than expanding the case study into a full source listing.
</div>
