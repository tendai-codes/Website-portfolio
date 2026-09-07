---
title: "Stock Price Analysis using Ridge Regression"
description: "A regularised stock-price regression experiment using historical price/volume features, held-out testing and cross-validation."
category: "Machine Learning"
technologies: ["Python", "Ridge Regression", "Time Series", "scikit-learn"]
featured: false
visual: "grid"
github: "https://github.com/tendai-codes/Machine-learning/tree/main/stock-price-prediction-ridge-regression"
question: "Can L2 regularisation provide a more stable stock-price regression baseline when financial features are correlated?"
focus: ["Ridge regression", "Regularisation", "Time-series features"]
outcome: "A Ridge regression baseline with held-out predictions and cross-validation reported in the original experiment."
keyChallenge: "Feature engineering for time series prediction was a significant challenge. Initially, using raw historical prices didn’t yield strong predictive accuracy. After adding lagged variables and scaling features, the model performance improved. It required careful experimentation to balance information richness and model simplicity."
---
## The problem

This project focused on predicting future stock prices using historical data and Ridge Regression, comparing its performance to other models. I used Python and integrated both traditional machine learning and visualisation libraries to explore the data and build predictive models. Achieved an R-squared score of 98%, with a k-fold cross-validation score of 86%.

<div class="case-question">
  <span class="case-note-label">Question</span>
  <p>Can L2 regularisation provide a more stable stock-price regression baseline when financial features are correlated?</p>
</div>

## Approach

Rather than presenting the project as a notebook dump, this case study focuses on the decisions that shaped the analysis.

1. Load & inspect data: Loaded historical stock price and volume data from CSV files. Visualised trends in stock prices and volumes using line and distribution plots.
2. Preprocessing: Cleaned and aligned datasets by timestamps. Normalised features and created lag-based features for time series modelling.
3. Model Development: Applied Ridge Regression to reduce overfitting from correlated features. Split dataset into training and testing sets using train_test_split().
4. Performance comparison: Evaluated models using r2_score .
5. Visualisation: Plotted predicted vs actual stock prices to interpret model behaviour.

## Key implementation decision

### Use regularisation to control correlated financial features

Ridge keeps the linear modelling structure but penalises large coefficients. That makes it a useful baseline when price, volume and lag-derived features may carry overlapping information.

```python
regression_model = Ridge()
regression_model.fit(X_train, y_train)

ridge_score = regression_model.score(X_test, y_test)
predicted_prices = regression_model.predict(X_test)

accuracies = cross_val_score(
    estimator=regression_model,
    X=X_train,
    y=y_train,
    cv=10
)
```

<div class="case-comment">
  <span class="case-note-label">Why this matters</span>
  <p>Rather than jumping directly to a more complex forecasting model, this project tests a regularised linear baseline and makes predicted-versus-observed behaviour visible.</p>
</div>

## Results & evidence

The figures below are the project evidence I would show first. The full implementation remains available through the GitHub link at the top of the page.

<div class="image-gallery">
<figure>
<img alt="Stock price visualization" class="gallery-trigger" data-caption="Stock Prices" data-full="/images/Ridge_stock%20price.png" data-gallery="ridge-regression" decoding="async" height="808" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Ridge_stock%20price-900.webp" srcset="/images/thumbs/Ridge_stock%20price-480.webp 480w, /images/thumbs/Ridge_stock%20price-900.webp 900w" width="1220"/>
<figcaption><strong>Figure 1</strong> Stock Prices</figcaption>
</figure>
<figure>
<img alt="Normalized stock price visualization" class="gallery-trigger" data-caption="Stock Prices - Normalised" data-full="/images/Ridge_stock%20price_norm.png" data-gallery="ridge-regression" decoding="async" height="808" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Ridge_stock%20price_norm-900.webp" srcset="/images/thumbs/Ridge_stock%20price_norm-480.webp 480w, /images/thumbs/Ridge_stock%20price_norm-900.webp 900w" width="1220"/>
<figcaption><strong>Figure 2</strong> Stock Prices - Normalised</figcaption>
</figure>
<figure>
<img alt="Stock trading volume visualization" class="gallery-trigger" data-caption="Stock Volumes" data-full="/images/Ridge_stock%20vol.png" data-gallery="ridge-regression" decoding="async" height="808" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Ridge_stock%20vol-900.webp" srcset="/images/thumbs/Ridge_stock%20vol-480.webp 480w, /images/thumbs/Ridge_stock%20vol-900.webp 900w" width="1220"/>
<figcaption><strong>Figure 3</strong> Stock Volumes</figcaption>
</figure>
<figure>
<img alt="Normalized stock trading volume visualization" class="gallery-trigger" data-caption="Stock Volumes - Normalised" data-full="/images/Ridge_stock%20vol_norm.png" data-gallery="ridge-regression" decoding="async" height="808" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Ridge_stock%20vol_norm-900.webp" srcset="/images/thumbs/Ridge_stock%20vol_norm-480.webp 480w, /images/thumbs/Ridge_stock%20vol_norm-900.webp 900w" width="1220"/>
<figcaption><strong>Figure 4</strong> Stock Volumes - Normalised</figcaption>
</figure>
<figure>
<img alt="Price and volume data table" class="gallery-trigger" data-caption="Price Volume Data" data-full="/images/Ridge_table%201.png" data-gallery="ridge-regression" decoding="async" height="1086" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Ridge_table%201-900.webp" srcset="/images/thumbs/Ridge_table%201-480.webp 480w, /images/thumbs/Ridge_table%201-900.webp 900w" width="1166"/>
<figcaption><strong>Table 1</strong> Price Volume Data</figcaption>
</figure>
<figure>
<img alt="Training and test data comparison" class="gallery-trigger" data-caption="Training &amp; Test Data" data-full="/images/Ridge_Figure%205.png" data-gallery="ridge-regression" decoding="async" height="451" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Ridge_Figure%205-900.webp" srcset="/images/thumbs/Ridge_Figure%205-480.webp 480w, /images/thumbs/Ridge_Figure%205-900.webp 900w" width="1059"/>
<figcaption><strong>Figure 5</strong> Training &amp; Test Data</figcaption>
</figure>
<figure>
<img alt="Closing and predicted values table" class="gallery-trigger" data-caption="Closing &amp; Predicted Values" data-full="/images/Ridge_table%202.png" data-gallery="ridge-regression" decoding="async" height="904" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Ridge_table%202-900.webp" srcset="/images/thumbs/Ridge_table%202-480.webp 480w, /images/thumbs/Ridge_table%202-900.webp 900w" width="778"/>
<figcaption><strong>Table 2</strong> Closing &amp; Predicted Values</figcaption>
</figure>
<figure>
<img alt="Random Forest model results" class="gallery-trigger" data-caption="Random Forest Analysis" data-full="/images/Ridge_Figure%206.png" data-gallery="ridge-regression" decoding="async" height="854" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Ridge_Figure%206-900.webp" srcset="/images/thumbs/Ridge_Figure%206-480.webp 480w, /images/thumbs/Ridge_Figure%206-900.webp 900w" width="1220"/>
<figcaption><strong>Figure 6</strong> Random Forest Analysis</figcaption>
</figure>
<figure>
<img alt="Decision Tree model results" class="gallery-trigger" data-caption="Decision Tree Analysis" data-full="/images/Ridge_Figure%207.png" data-gallery="ridge-regression" decoding="async" height="854" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Ridge_Figure%207-900.webp" srcset="/images/thumbs/Ridge_Figure%207-480.webp 480w, /images/thumbs/Ridge_Figure%207-900.webp 900w" width="1220"/>
<figcaption><strong>Figure 7</strong> Decision Tree Analysis</figcaption>
</figure>
</div>

## What challenged me

Feature engineering for time series prediction was a significant challenge. Initially, using raw historical prices didn’t yield strong predictive accuracy. After adding lagged variables and scaling features, the model performance improved. It required careful experimentation to balance information richness and model simplicity.

## What I learned

- Ridge is a useful linear baseline when predictors are correlated because L2 regularisation stabilises coefficient estimates.
- A strong in-sample or single-split score should not be interpreted as proof of robust forecasting performance.
- Time-series evaluation should preserve chronology instead of treating observations as exchangeable.

## What I would improve next

- Use time-aware validation rather than ordinary K-fold splits for sequential data.
- Compare against persistence and unregularised linear baselines on exactly the same horizon.
- Report MAE/RMSE alongside R² and inspect residuals over time.

<div class="case-end-note">
  <strong>Full implementation:</strong> use the GitHub link in the project header for the complete notebook/code rather than expanding the case study into a full source listing.
</div>
