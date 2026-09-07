---
title: "Global Population Trends Exploration"
description: "An exploratory World Bank analysis linking birth rate, internet use and life expectancy across countries, regions and income groups."
category: "Data Analysis"
technologies: ["Python", "Pandas", "Data Visualisation", "World Bank Data"]
featured: false
visual: "grid"
github: "https://github.com/tendai-codes/Data-Analysis/tree/main/world-bank-data-exploration"
question: "What development patterns become visible when demographic and socioeconomic indicators are merged at country level and compared across groups?"
focus: ["World Bank data", "Data merging", "Exploratory visualisation"]
outcome: "Merged country-level datasets and visual comparisons across income groups and geographic regions."
keyChallenge: "Filtering and reshaping the dataset for multi-variable analysis was complex due to inconsistent column names and missing data. I solved this by methodically renaming columns and using .dropna() to exclude incomplete records while maintaining dataset integrity."
---
## The problem

This project used World Bank development indicators to explore trends in population growth, urbanisation, and fertility rates across continents and income groups. The objective was to uncover insights about global development patterns over time using Python.

<div class="case-question">
  <span class="case-note-label">Question</span>
  <p>What development patterns become visible when demographic and socioeconomic indicators are merged at country level and compared across groups?</p>
</div>

## Approach

Rather than presenting the project as a notebook dump, this case study focuses on the decisions that shaped the analysis.

1. Load & inspect data: Loaded the dataset using pd.read_csv() and inspected structure with .info() and .head() to understand column types and missing data.
2. Cleaning: Renamed columns, removed irrelevant rows, and addressed missing values for smoother analysis.
3. Initial exploration: Examined fertility rates, population growth, and urban population across income levels and continents.
4. Grouping & Summarisation: Used groupby() and mean() to aggregate indicators by continent and income level.
5. Visualisation: Created scatter plots, line plots, and box plots to reveal relationships between population metrics and economic status.

## Key implementation decision

### Build a common country key before comparing indicators

The analysis depends on joining multiple indicator sources consistently. Country codes provide a stable key that lets life expectancy and regional metadata be brought into the same analytical frame.

```python
country_data = pd.DataFrame({
    "CountryName": np.array(Countries_2012_Dataset),
    "CountryCode": np.array(Codes_2012_Dataset),
    "CountryRegion": np.array(Regions_2012_Dataset),
})

merged_data = pd.merge(
    left=data, right=country_data, how="inner", on="CountryCode"
)

vis = sns.lmplot(
    data=merged_data, x="BirthRate", y="InternetUsers",
    fit_reg=False, hue="CountryRegion", height=10
)
```

<div class="case-comment">
  <span class="case-note-label">Why this matters</span>
  <p>The core difficulty in this project is relational rather than algorithmic: indicators from different sources only become comparable after the country metadata and measures are aligned correctly.</p>
</div>

## Results & evidence

The figures below are the project evidence I would show first. The full implementation remains available through the GitHub link at the top of the page.

<div class="image-gallery">
<figure>
<img alt="Table 1: Merged DF" class="gallery-trigger" data-caption="Table 1: Merged DF" data-full="/images/world_dfmerge.png" data-gallery="world-bank" decoding="async" height="410" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/world_dfmerge-900.webp" srcset="/images/thumbs/world_dfmerge-480.webp 480w, /images/thumbs/world_dfmerge-900.webp 900w" width="1906"/>
<figcaption><strong>Table 1</strong> Merged DF</figcaption>
</figure>
<figure>
<img alt="Table 2: Merged DF 2" class="gallery-trigger" data-caption="Table 2: Merged DF 2" data-full="/images/world_dfmerge2.png" data-gallery="world-bank" decoding="async" height="414" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/world_dfmerge2-900.webp" srcset="/images/thumbs/world_dfmerge2-480.webp 480w, /images/thumbs/world_dfmerge2-900.webp 900w" width="2310"/>
<figcaption><strong>Table 2</strong> Merged DF 2</figcaption>
</figure>
<figure>
<img alt="Figure 1: BirthRate versus Internet Users categorised by Income Group" class="gallery-trigger" data-caption="Figure 1: BirthRate versus Internet Users categorised by Income Group" data-full="/images/world_birthintIG.png" data-gallery="world-bank" decoding="async" height="989" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/world_birthintIG-900.webp" srcset="/images/thumbs/world_birthintIG-480.webp 480w, /images/thumbs/world_birthintIG-900.webp 900w" width="1183"/>
<figcaption><strong>Figure 1</strong> BirthRate versus Internet Users categorised by Income Group</figcaption>
</figure>
<figure>
<img alt="Figure 2: BirthRate versus Internet Users categorised by Country Region" class="gallery-trigger" data-caption="Figure 2: BirthRate versus Internet Users categorised by Country Region" data-full="/images/world_birthintCR.png" data-gallery="world-bank" decoding="async" height="989" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/world_birthintCR-900.webp" srcset="/images/thumbs/world_birthintCR-480.webp 480w, /images/thumbs/world_birthintCR-900.webp 900w" width="1132"/>
<figcaption><strong>Figure 2</strong> BirthRate versus Internet Users categorised by Country Region</figcaption>
</figure>
<figure>
<img alt="Figure 3: BirthRate versus LifeExpectancy in 1960" class="gallery-trigger" data-caption="Figure 3: BirthRate versus LifeExpectancy in 1960" data-full="/images/world_life1960.png" data-gallery="world-bank" decoding="async" height="990" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/world_life1960-900.webp" srcset="/images/thumbs/world_life1960-480.webp 480w, /images/thumbs/world_life1960-900.webp 900w" width="1133"/>
<figcaption><strong>Figure 3</strong> BirthRate versus LifeExpectancy in 1960</figcaption>
</figure>
<figure>
<img alt="Figure 4: BirthRate versus LifeExpectancy in 2013" class="gallery-trigger" data-caption="Figure 4: BirthRate versus LifeExpectancy in 2013" data-full="/images/world_life2013.png" data-gallery="world-bank" decoding="async" height="989" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/world_life2013-900.webp" srcset="/images/thumbs/world_life2013-480.webp 480w, /images/thumbs/world_life2013-900.webp 900w" width="1133"/>
<figcaption><strong>Figure 4</strong> BirthRate versus LifeExpectancy in 2013</figcaption>
</figure>
</div>

## What challenged me

Filtering and reshaping the dataset for multi-variable analysis was complex due to inconsistent column names and missing data. I solved this by methodically renaming columns and using .dropna() to exclude incomplete records while maintaining dataset integrity.

## What I learned

- Reliable joins are foundational when development indicators come from multiple country-level sources.
- Regional and income-group colour encodings made cross-country patterns easier to inspect.
- Missing-data handling can materially change a cross-country comparison and should be documented explicitly.

## What I would improve next

- Document missing-data decisions explicitly instead of silently excluding incomplete observations.
- Add temporal comparisons so cross-sectional patterns are not confused with long-term change.
- Quantify group differences with summary statistics before interpreting the visual separation.

<div class="case-end-note">
  <strong>Full implementation:</strong> use the GitHub link in the project header for the complete notebook/code rather than expanding the case study into a full source listing.
</div>
