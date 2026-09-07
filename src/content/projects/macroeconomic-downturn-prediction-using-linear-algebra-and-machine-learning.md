---
title: "Macroeconomic Downturn Prediction using Linear Algebra and Machine Learning"
description: "A country-year macroeconomic risk experiment combining Rust feature engineering, Python modelling and a Streamlit scenario dashboard."
category: "Research & Modelling"
technologies: ["Rust", "Python", "Linear Algebra", "Machine Learning"]
featured: true
visual: "matrix"
github: "https://github.com/tendai-codes/worldbank_unemployment_linear_algebra_project"
live: "https://macroeconomic-risk.streamlit.app/"
question: "Can country-year macroeconomic indicators be represented with temporal features that make next-year downturn risk easier to model and interpret?"
focus: ["Feature engineering", "Rust + Python pipeline", "Risk classification"]
outcome: "A reproducible country-year feature pipeline feeding a classifier and interactive scenario explorer."
keyChallenge: "The central challenge was turning broad macroeconomic indicators\n  into a reproducible modelling pipeline without overclaiming\n  forecasting precision. The solution was to frame the project as a\n  representation and classification experiment rather than a\n  policy-grade economic forecast."
---
## The problem

This project builds a country-year macroeconomic panel from World Bank indicators and adds temporal information before estimating next-year downturn risk. The emphasis is on representation, reproducible feature engineering and interpretable scenario testing rather than on presenting the output as a policy-grade forecast.

<div class="case-question">
  <span class="case-note-label">Question</span>
  <p>Can country-year macroeconomic indicators be represented with temporal features that make next-year downturn risk easier to model and interpret?</p>
</div>

## Approach

Rather than presenting the project as a notebook dump, this case study focuses on the decisions that shaped the analysis.

1. Panel construction: Country-year observations are built from macroeconomic indicators
    including GDP growth, inflation, unemployment, life expectancy,
    and population growth.
2. Vector representation: Each observation becomes a named macroeconomic profile x_country,year , containing indicators such as GDP
    growth, inflation, unemployment, population growth, and life
    expectancy.
3. Temporal feature engineering: Rust creates lag, annual-change, and three-year least-squares
    trend features efficiently before exporting the engineered panel
    for Python-based machine-learning processing.
4. Model training: Python consumes the engineered dataset and trains a classifier to
    estimate downturn probability in the following year.
5. Dashboard layer: The dashboard supports country selection, scenario simulation,
    similar-country comparison, and time-series diagnostics.

## Key implementation decision

### Separate deterministic feature generation from exploratory modelling

Rust owns repeatable panel ingestion and temporal features, while Python owns exploration, PCA, model fitting and dashboard integration. The split keeps the transformation layer distinct from model experimentation.

```python
features = [
    "gdp_growth",
    "inflation",
    "unemployment",
    "gdp_growth_lag_1",
    "unemployment_delta_1",
    "gdp_growth_trend_3y",
]

X = panel[features]
y = panel["downturn_next_year"]
model.fit(X_train, y_train)
downturn_probability = model.predict_proba(current_country_vector)[0, 1]
```

<div class="case-comment">
  <span class="case-note-label">Why this matters</span>
  <p>The central modelling move is to represent not only indicator levels but also recent movement. Lag, annual-change and trend features let the classifier see direction while keeping the experiment interpretable.</p>
</div>

## Results & evidence

The figures below are the project evidence I would show first. The full implementation remains available through the GitHub link at the top of the page.

<div class="concept-visual macro-risk-visual">
<figure class="macro-model-vertical">
<h3>From macro indicators to downturn-risk interpretation</h3>
<p class="macro-model-intro">
  The modelling path is shown as three transformations:
  raw country-year observations, engineered movement in feature space,
  and an interpretable model output.
</p>
<section aria-label="Country-year panel step" class="macro-step">
<div class="macro-card">
<h4>1. Country-year panel</h4>
<div class="panel-table">
<div class="panel-header">
<span>Country</span>
<span>Year</span>
<span>Macro profile</span>
</div>
<div class="panel-row">
<span>ZAF</span>
<span>2018</span>
<span class="vector-cell">
    [GDP growth, inflation, unemployment, ...]
  </span>
</div>
<div class="panel-row">
<span>BRA</span>
<span>2019</span>
<span class="vector-cell">
    [GDP growth, inflation, unemployment, ...]
  </span>
</div>
<div class="panel-row">
<span>IND</span>
<span>2020</span>
<span class="vector-cell">
    [GDP growth, inflation, unemployment, ...]
  </span>
</div>
<div class="panel-row">
<span>KEN</span>
<span>2021</span>
<span class="vector-cell">
    [GDP growth, inflation, unemployment, ...]
  </span>
</div>
</div>
</div>
<div class="macro-description">
<h4>Raw indicators become comparable observations</h4>
<p>
  World Bank indicators are aligned into a country-year panel.
  Each row becomes a macroeconomic profile constructed from
  interpretable variables such as GDP growth, inflation,
  unemployment, population growth, and life expectancy.
</p>
</div>
</section>
<div aria-hidden="true" class="macro-down-arrow">
  ↓
</div>
<section aria-label="Feature-space view step" class="macro-step">
<div class="macro-card feature-space-card">
<h4>2. Feature-space view</h4>
<div aria-label="Illustrative feature-space representation" class="feature-plot">
<span class="trend-line"></span>
<span class="point low point-1"></span>
<span class="point low point-2"></span>
<span class="point low point-3"></span>
<span class="point low point-4"></span>
<span class="point mid point-5"></span>
<span class="point mid point-6"></span>
<span class="point mid point-7"></span>
<span class="point high point-8"></span>
<span class="point high point-9"></span>
</div>
</div>
<div class="macro-description">
<h4>Rust prepares the panel for scale</h4>
<p>
  Rust is used for the deterministic feature pipeline because it
  provides efficiency and scalability headroom if the panel grows
  across more countries, years, indicators, or repeated experiments.
  It creates lag features, annual changes, and three-year trend slopes
  before the engineered dataset moves into Python.
</p>
</div>
</section>
<div aria-hidden="true" class="macro-down-arrow">
  ↓
</div>
<section aria-label="Risk output step" class="macro-step">
<div class="macro-card risk-card">
<h4>3. Risk output</h4>
<p>Classifier + dashboard</p>
<div aria-label="Illustrative low-to-high risk scale" class="risk-meter">
<span class="risk-marker"></span>
</div>
<div class="risk-labels">
<span>Low</span>
<span>High</span>
</div>
<div class="risk-value">0.68</div>
<p class="risk-value-label">
  illustrative downturn probability
</p>
<span class="scenario-pill">
  Scenario testing
</span>
</div>
<div class="macro-description">
<h4>Python handles ML interpretation</h4>
<p>
  Python is used for the machine-learning processing layer:
  exploratory analysis, PCA, similarity analysis, model training,
  probability estimation, and Streamlit dashboard integration.
  The resulting workflow produces a probability score that can be
  explored under alternative scenarios rather than only a binary
  class label.
</p>
</div>
</section>
<figcaption class="macro-figure-caption">
  Conceptual representation of the project's modelling pipeline.
  The displayed risk value is illustrative rather than a reported
  empirical result.
</figcaption>
</figure>
</div>

## What challenged me

The central challenge was turning broad macroeconomic indicators
  into a reproducible modelling pipeline without overclaiming
  forecasting precision. The solution was to frame the project as a
  representation and classification experiment rather than a
  policy-grade economic forecast.

## What I learned

- Temporal movement can be represented explicitly with lag, delta and trend features instead of relying only on raw indicator levels.
- Keeping deterministic feature engineering separate from modelling makes the pipeline easier to reason about and reproduce.
- The resulting probability should be treated as an experimental model output, not a policy-grade economic forecast.

## What I would improve next

- Use walk-forward validation to respect the temporal structure of the panel.
- Test feature stability across countries and economic regimes.
- Add probability calibration and uncertainty reporting before treating the output as a decision-support score.

<div class="case-end-note">
  <strong>Full implementation:</strong> use the GitHub link in the project header for the complete notebook/code rather than expanding the case study into a full source listing.
</div>
