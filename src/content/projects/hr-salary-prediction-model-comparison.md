---
title: "HR Salary Prediction: Model Comparison"
description: "A small-regression comparison exploring how linear, polynomial, SVR, tree and ensemble models represent non-linear salary progression by position level."
category: "Machine Learning"
technologies: ["Python", "Regression", "Model Comparison", "scikit-learn"]
featured: false
visual: "grid"
question: "How do different regression families behave when the relationship between position level and salary is strongly non-linear?"
focus: ["Regression", "Model comparison", "Small-data modelling"]
outcome: "A visual comparison of multiple regressors on the same position-salary dataset."
keyChallenge: "The SVR model visualization presented scaling complications because support vector regression requires feature scaling for optimal performance, but the visualization needed to display results in original salary units. The challenge was handling the forward and inverse transformations correctly. This was resolved by implementing a multi-step process: using sc_X.transform(X_grid) to scale the grid for SVR prediction, then applying sc_y.inverse_transform() to convert predictions back to actual salary values, with careful attention to array reshaping using .reshape(-1, 1) to maintain proper dimensionality throughout the scaling pipeline. This approach ensured accurate model performance while maintaining interpretable visualizations in original salary units."
---
## The problem

This project compares regression approaches on a small position-level salary dataset. Because the dataset is tiny, I treat the exercise as a way to inspect model shape and preprocessing behaviour rather than as evidence of deployable salary prediction.

<div class="case-question">
  <span class="case-note-label">Question</span>
  <p>How do different regression families behave when the relationship between position level and salary is strongly non-linear?</p>
</div>

## Approach

Rather than presenting the project as a notebook dump, this case study focuses on the decisions that shaped the analysis.

1. Data Preparation: Loaded position-salary dataset using pd.read_csv() and extracted features using iloc[:, 1:-1] (position levels) and target variable using iloc[:, -1] (salaries), strategically excluding the first column containing position titles.
2. Linear regression baseline: Implemented a standard LinearRegression() model using .fit(X, y) to establish a baseline for salary prediction based on position level with a straight-line relationship.
3. Polynomial feature engineering: Applied PolynomialFeatures(degree=4) to transform the single position level feature into polynomial terms (x, x², x³, x⁴), creating a richer feature space to capture non-linear salary progression patterns.
4. Support Vector Regression: Implemented feature scaling using StandardScaler() for both X and y variables, then trained an SVR model with RBF kernel to handle non-linear relationships while managing the different scales between position levels and salary amounts.
5. Decision Tree : Built a DecisionTreeRegressor() model that creates hierarchical decision rules to predict salaries, capturing complex non-linear patterns without requiring feature scaling.
6. Random Forest Regression: Implemented RandomForestRegressor() with multiple decision trees to reduce overfitting and improve prediction stability through ensemble learning.
7. SVR Inverse scaling: Applied sc_X.inverse_transform() and sc_y.inverse_transform() to convert scaled predictions back to original salary units, with proper reshaping using .reshape(-1, 1) for visualization.

## Key implementation decision

### Use dense prediction grids to make model shape visible

With a very small one-dimensional dataset, the plot is an important diagnostic. Increasing the grid resolution makes the stepwise behaviour of a tree model easier to see instead of implying a smooth relationship that the model does not learn.

```python
regressor = DecisionTreeRegressor(random_state=0)
regressor.fit(X, y)

X_grid = np.arange(min(X), max(X), 0.01)
X_grid = X_grid.reshape((len(X_grid), 1))

plt.scatter(X, y, color="red")
plt.plot(X_grid, regressor.predict(X_grid), color="blue")
```

<div class="case-comment">
  <span class="case-note-label">Why this matters</span>
  <p>The dataset is deliberately small, so this page is most useful as a visual model-behaviour comparison rather than as evidence of generalisable salary prediction.</p>
</div>

## Results & evidence

The figures below are the project evidence I would show first. The full implementation remains available through the GitHub link at the top of the page.

<div class="image-gallery">
<figure>
<img alt="Linear Regression Model" class="gallery-trigger" data-caption="Figure 1: Linear Regression Model" data-full="/images/HR_linReg.png" data-gallery="salary-prediction" decoding="async" height="900" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/HR_linReg-900.webp" srcset="/images/thumbs/HR_linReg-480.webp 480w, /images/thumbs/HR_linReg-900.webp 900w" width="1122"/>
<figcaption><strong>Figure 1</strong> Linear Regression</figcaption>
</figure>
<figure>
<img alt="Linear Regression Evaluation" class="gallery-trigger" data-caption="Figure 1a: Linear Regression Model Evaluation" data-full="/images/HReval_linReg.png" data-gallery="salary-prediction" decoding="async" height="308" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/HReval_linReg-900.webp" srcset="/images/thumbs/HReval_linReg-480.webp 480w, /images/thumbs/HReval_linReg-900.webp 900w" width="1342"/>
<figcaption><strong>Figure 1a</strong> Model Evaluation – Linear Regression</figcaption>
</figure>
<figure>
<img alt="Polynomial Regression Model" class="gallery-trigger" data-caption="Figure 2: Polynomial Regression Model" data-full="/images/HR_polyReg.png" data-gallery="salary-prediction" decoding="async" height="892" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/HR_polyReg-900.webp" srcset="/images/thumbs/HR_polyReg-480.webp 480w, /images/thumbs/HR_polyReg-900.webp 900w" width="1122"/>
<figcaption><strong>Figure 2</strong> Polynomial Regression</figcaption>
</figure>
<figure>
<img alt="Polynomial Regression Evaluation" class="gallery-trigger" data-caption="Figure 2a: Polynomial Regression Model Evaluation" data-full="/images/HReval_polyReg.png" data-gallery="salary-prediction" decoding="async" height="330" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/HReval_polyReg-900.webp" srcset="/images/thumbs/HReval_polyReg-480.webp 480w, /images/thumbs/HReval_polyReg-900.webp 900w" width="1340"/>
<figcaption><strong>Figure 2a</strong> Model Evaluation – Polynomial Regression</figcaption>
</figure>
<figure>
<img alt="SVR Model" class="gallery-trigger" data-caption="Figure 3: Support Vector Regression Model" data-full="/images/HR_svr.png" data-gallery="salary-prediction" decoding="async" height="890" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/HR_svr-900.webp" srcset="/images/thumbs/HR_svr-480.webp 480w, /images/thumbs/HR_svr-900.webp 900w" width="1116"/>
<figcaption><strong>Figure 3</strong> SVR</figcaption>
</figure>
<figure>
<img alt="SVR Evaluation" class="gallery-trigger" data-caption="Figure 3a: Support Vector Regression Model Evaluation" data-full="/images/HReval_svr.png" data-gallery="salary-prediction" decoding="async" height="498" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/HReval_svr-900.webp" srcset="/images/thumbs/HReval_svr-480.webp 480w, /images/thumbs/HReval_svr-900.webp 900w" width="1344"/>
<figcaption><strong>Figure 3a</strong> Model Evaluation – SVR</figcaption>
</figure>
<figure>
<img alt="Random Forest Model" class="gallery-trigger" data-caption="Figure 4: Random Forest Model" data-full="/images/HR_Randfor.png" data-gallery="salary-prediction" decoding="async" height="455" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/HR_Randfor-900.webp" srcset="/images/thumbs/HR_Randfor-480.webp 480w, /images/thumbs/HR_Randfor-900.webp 900w" width="567"/>
<figcaption><strong>Figure 4</strong> Random Forest</figcaption>
</figure>
<figure>
<img alt="Random Forest Evaluation" class="gallery-trigger" data-caption="Figure 4a: Random Forest Model Evaluation" data-full="/images/HReval_Randfor.png" data-gallery="salary-prediction" decoding="async" height="356" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/HReval_Randfor-900.webp" srcset="/images/thumbs/HReval_Randfor-480.webp 480w, /images/thumbs/HReval_Randfor-900.webp 900w" width="1344"/>
<figcaption><strong>Figure 4a</strong> Model Evaluation – Random Forest</figcaption>
</figure>
<figure>
<img alt="Decision Tree Model" class="gallery-trigger" data-caption="Figure 5: Decision Tree Model" data-full="/images/HR_DecT.png" data-gallery="salary-prediction" decoding="async" height="894" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/HR_DecT-900.webp" srcset="/images/thumbs/HR_DecT-480.webp 480w, /images/thumbs/HR_DecT-900.webp 900w" width="1126"/>
<figcaption><strong>Figure 5</strong> Decision Tree</figcaption>
</figure>
<figure>
<img alt="Decision Tree Evaluation" class="gallery-trigger" data-caption="Figure 5a: Decision Tree Model Evaluation" data-full="/images/HReval_DecT.png" data-gallery="salary-prediction" decoding="async" height="416" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/HReval_DecT-900.webp" srcset="/images/thumbs/HReval_DecT-480.webp 480w, /images/thumbs/HReval_DecT-900.webp 900w" width="1344"/>
<figcaption><strong>Figure 5a</strong> Model Evaluation – Decision Tree</figcaption>
</figure>
</div>

## What challenged me

The SVR model visualization presented scaling complications because support vector regression requires feature scaling for optimal performance, but the visualization needed to display results in original salary units. The challenge was handling the forward and inverse transformations correctly. This was resolved by implementing a multi-step process: using sc_X.transform(X_grid) to scale the grid for SVR prediction, then applying sc_y.inverse_transform() to convert predictions back to actual salary values, with careful attention to array reshaping using .reshape(-1, 1) to maintain proper dimensionality throughout the scaling pipeline. This approach ensured accurate model performance while maintaining interpretable visualizations in original salary units.

## What I learned

- Different regressors encode very different assumptions about smoothness and local behaviour.
- Dense prediction grids help reveal stepwise tree behaviour that can be hidden by sparse plotting.
- With a very small dataset, visual fit is not evidence of generalisation.

## What I would improve next

- Use a larger dataset before drawing conclusions about model generalisation.
- Introduce a proper holdout or resampling strategy once enough observations are available.
- Compare model complexity and extrapolation behaviour, not only fit on the observed points.

<div class="case-end-note">
  <strong>Full implementation:</strong> use the GitHub link in the project header for the complete notebook/code rather than expanding the case study into a full source listing.
</div>
