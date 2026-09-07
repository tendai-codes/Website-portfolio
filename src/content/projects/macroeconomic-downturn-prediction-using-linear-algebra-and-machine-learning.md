---
title: "Macroeconomic Downturn Prediction using Linear Algebra and Machine Learning"
description: "This project builds a country-year macroeconomic panel from World Bank indicators and uses linear algebra, Rust-based feature engineering, Python modelling, and a Streamlit dashboard to estimate next-year economic downturn risk."
category: "Research & Modelling"
technologies: ["Rust", "Python", "Linear Algebra", "Machine Learning"]
featured: true
visual: "matrix"
github: "https://github.com/tendai-codes/worldbank_unemployment_linear_algebra_project"
live: "https://macroeconomic-risk.streamlit.app/"
---

<p>
  This project builds a country-year macroeconomic panel from World Bank indicators and uses linear algebra, Rust-based feature engineering, Python modelling, and a Streamlit dashboard to estimate next-year economic downturn risk.
</p>

<div class="applied-math-note">
  <strong>Core idea:</strong>
  represent each country-year as a vector in macroeconomic feature space, then add temporal structure through lag features, annual changes, and three-year trend slopes.
</div>

<h3>💻 <strong>Tech Stack:</strong></h3>

<ul>
  <li>
    <strong>Rust</strong> for deterministic CSV ingestion, validation,
    lag features, annual changes, and trend feature generation, chosen
    as an efficiency and scalability precaution for larger
    panel-processing workloads.
  </li>
  <li>
    <strong>Python</strong> for machine-learning data processing,
    exploratory analysis, PCA, similarity analysis, model training,
    and dashboard integration.
  </li>
  <li>
    <strong>Scikit-learn</strong> for supervised downturn-risk
    classification.
  </li>
  <li>
    <strong>Streamlit</strong> for scenario testing and multi-country
    comparison.
  </li>
</ul>

<h3>🧪 <strong>Data Pipeline:</strong></h3>

<ul>
  <li>
    <strong>Panel construction:</strong>
    Country-year observations are built from macroeconomic indicators
    including GDP growth, inflation, unemployment, life expectancy,
    and population growth.
  </li>

  <li>
    <strong>Vector representation:</strong>
    Each observation becomes a named macroeconomic profile
    <code>x_country,year</code>, containing indicators such as GDP
    growth, inflation, unemployment, population growth, and life
    expectancy.
  </li>

  <li>
    <strong>Temporal feature engineering:</strong>
    Rust creates lag, annual-change, and three-year least-squares
    trend features efficiently before exporting the engineered panel
    for Python-based machine-learning processing.
  </li>

  <li>
    <strong>Model training:</strong>
    Python consumes the engineered dataset and trains a classifier to
    estimate downturn probability in the following year.
  </li>

  <li>
    <strong>Dashboard layer:</strong>
    The dashboard supports country selection, scenario simulation,
    similar-country comparison, and time-series diagnostics.
  </li>
</ul>

<h3>📊 <strong>Code Snippets &amp; Visualisations:</strong></h3>

```python
# Country-year macroeconomic profile
features = [
    "gdp_growth",
    "inflation",
    "unemployment",
    "life_expectancy",
    "population_growth",
    "gdp_growth_lag_1",
    "unemployment_delta_1",
    "gdp_growth_trend_3y",
]

X = panel[features]
y = panel["downturn_next_year"]

model.fit(X_train, y_train)

downturn_probability = model.predict_proba(
    current_country_vector
)[0, 1]
```

<div class="concept-visual macro-risk-visual">

<figure class="macro-model-vertical">

<h3>From macro indicators to downturn-risk interpretation</h3>

<p class="macro-model-intro">
  The modelling path is shown as three transformations:
  raw country-year observations, engineered movement in feature space,
  and an interpretable model output.
</p>

<section
  aria-label="Country-year panel step"
  class="macro-step"
>

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

<div
  aria-hidden="true"
  class="macro-down-arrow"
>
  ↓
</div>

<section
  aria-label="Feature-space view step"
  class="macro-step"
>

<div class="macro-card feature-space-card">

<h4>2. Feature-space view</h4>

<div
  class="feature-plot"
  aria-label="Illustrative feature-space representation"
>

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

<div
  aria-hidden="true"
  class="macro-down-arrow"
>
  ↓
</div>

<section
  aria-label="Risk output step"
  class="macro-step"
>

<div class="macro-card risk-card">

<h4>3. Risk output</h4>

<p>Classifier + dashboard</p>

<div
  class="risk-meter"
  aria-label="Illustrative low-to-high risk scale"
>
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

<h3>🌟 <strong>Key Insights:</strong></h3>

<ul>
  <li>
    The strongest modelling move is shifting from static economic
    indicators to a feature-space representation with temporal
    movement.
  </li>

  <li>
    Lag, annual-change, and trend features make downturn risk easier
    to reason about than raw levels alone.
  </li>

  <li>
    The Rust/Python split keeps deterministic feature engineering
    separate from modelling and dashboard experimentation.
  </li>
</ul>

<h3>🧗🏾 <strong>Challenge Faced:</strong></h3>

<p>
  The central challenge was turning broad macroeconomic indicators
  into a reproducible modelling pipeline without overclaiming
  forecasting precision. The solution was to frame the project as a
  representation and classification experiment rather than a
  policy-grade economic forecast.
</p>