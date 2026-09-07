---
title: "Startup Revenue Prediction Model"
description: "A multiple-linear-regression pipeline predicting startup profit from spending variables and encoded location information."
category: "Machine Learning"
technologies: ["Python", "Regression", "Data Preprocessing", "scikit-learn"]
featured: false
visual: "grid"
github: "https://github.com/tendai-codes/Machine-learning/tree/main/startup-profit-prediction"
question: "How well can a simple linear model explain startup profit from R&D, administration, marketing and state-level inputs?"
focus: ["Linear regression", "Categorical encoding", "Regression evaluation"]
outcome: "A reproducible train/test regression pipeline with one-hot encoded categorical inputs and predicted-vs-actual comparison."
keyChallenge: "The array reshaping and concatenation for results display presented a significant hurdle because the predicted and actual values were 1D arrays that couldn't be directly concatenated horizontally. The error occurred when trying to use np.concatenate() without proper dimensionality. This was solved by using reshape(len(y_pred),1) to convert both arrays into column vectors (2D arrays with one column), then applying horizontal concatenation with the parameter 1 to stack them side-by-side. This approach created a clean comparison matrix showing predicted values next to actual values, making model performance evaluation much more intuitive."
---
## The problem

This project built a multiple linear regression model to predict startup profitability based on their R&D spending, administration costs, marketing expenditure, and location. I implemented a complete machine learning pipeline using scikit-learn to analyze which factors most strongly influence startup success and revenue generation.

<div class="case-question">
  <span class="case-note-label">Question</span>
  <p>How well can a simple linear model explain startup profit from R&D, administration, marketing and state-level inputs?</p>
</div>

## Approach

Rather than presenting the project as a notebook dump, this case study focuses on the decisions that shaped the analysis.

1. Data import & separation: Loaded the 50 Startups dataset using pd.read_csv() and strategically separated features (X) from the target variable (y) using .iloc[:, -1] for all columns except the last, and .iloc[:, -1] for the dependent variable (profit).
2. Categorical Encoding: Applied One-Hot Encoding using ColumnTransformer and OneHotEncoder() to convert the categorical 'State' variable (column index [3]) into numerical dummy variables, while keeping other numerical features intact using remainder='passthrough' .
3. Data transformation, model training & prediction: Used np.array(ct.fit_transform(X)) to convert the transformed data back into a NumPy array format suitable for machine learning algorithms. Implemented train_test_split() with an 80-20 split (test_size=0.2) and fixed random state (random_state=0) to ensure reproducible results and proper model validation. Instantiated and trained a LinearRegression() model using .fit(X_train, y_train) to learn the relationships between startup characteristics and profitability. Generated predictions on the test set using regressor.predict(X_test) to evaluate model performance on unseen data.
4. Results Visualisation: Used np.set_printoptions(precision=2) for clean output formatting and np.concatenate() with reshape() to create side-by-side comparison of predicted vs. actual values for easy performance assessment.

## Key implementation decision

### Encode the categorical variable without disturbing numerical features

ColumnTransformer lets state be one-hot encoded while the spending variables pass through unchanged. That keeps preprocessing explicit and makes the resulting feature matrix compatible with the regression model.

```python
ct = ColumnTransformer(
    transformers=[("encoder", OneHotEncoder(), [3])],
    remainder="passthrough"
)
X = np.array(ct.fit_transform(X))

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=0
)

regressor = LinearRegression()
regressor.fit(X_train, y_train)
y_pred = regressor.predict(X_test)
```

<div class="case-comment">
  <span class="case-note-label">Why this matters</span>
  <p>This is a compact supervised-learning project where the main analytical value is seeing how preprocessing, splitting and prediction fit together in a complete regression workflow.</p>
</div>

## Results & evidence

The figures below are the project evidence I would show first. The full implementation remains available through the GitHub link at the top of the page.

<div class="image-gallery">
<figure>
<img alt="Figure 1: startup" class="gallery-trigger" data-caption="Figure 1: startup" data-full="/images/startup_table1.png" data-gallery="startup" decoding="async" height="380" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/startup_table1-900.webp" srcset="/images/thumbs/startup_table1-480.webp 480w, /images/thumbs/startup_table1-900.webp 900w" width="1372"/>
<figcaption><strong>Figure 1</strong> Model Evaluation</figcaption>
</figure>
</div>

## What challenged me

The array reshaping and concatenation for results display presented a significant hurdle because the predicted and actual values were 1D arrays that couldn't be directly concatenated horizontally. The error occurred when trying to use np.concatenate() without proper dimensionality. This was solved by using reshape(len(y_pred),1) to convert both arrays into column vectors (2D arrays with one column), then applying horizontal concatenation with the parameter 1 to stack them side-by-side. This approach created a clean comparison matrix showing predicted values next to actual values, making model performance evaluation much more intuitive.

## What I learned

- ColumnTransformer made categorical encoding explicit without rewriting the numerical features.
- Predicted-versus-observed values are easier to interpret when they are placed side by side.
- A linear model is useful as an interpretable baseline, but residual diagnostics are needed before trusting the relationship.

## What I would improve next

- Report regression diagnostics and residual behaviour, not only predicted-vs-actual values.
- Test whether the location variable materially improves out-of-sample performance.
- Use cross-validation to reduce dependence on one train/test split.

<div class="case-end-note">
  <strong>Full implementation:</strong> use the GitHub link in the project header for the complete notebook/code rather than expanding the case study into a full source listing.
</div>
