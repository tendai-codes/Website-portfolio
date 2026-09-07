---
title: "Customer Purchase Prediction – Model Comparison & Optimization"
description: "A classification comparison on social-network advertising data, using age and salary to predict purchase behaviour and visualise decision boundaries."
category: "Machine Learning"
technologies: ["Python", "Classification", "Model Comparison", "scikit-learn"]
featured: false
visual: "grid"
github: "https://github.com/tendai-codes/Machine-learning"
question: "Which classifier best captures the purchase boundary in a simple two-feature problem, and how does scaling affect both modelling and interpretation?"
focus: ["Model comparison", "Decision boundaries", "Feature scaling"]
outcome: "A Decision Tree selected from the compared models for this dataset, with boundaries plotted back in the original feature scale."
keyChallenge: "At first, the visualisations were hard to understand because the data had been scaled. The age and salary values didn’t look realistic in the plots. I solved this by converting the data back to its original scale before plotting. This made the decision areas easier to read and relate to real-life values."
---
## The problem

This project involved comparing multiple classification algorithms to predict whether users would purchase a product based on their age and estimated salary from social network advertisement data. I tested various models including Logistic Regression, SVM, Kernel SVM, Naive Bayes, K-NN, Random Forest, and Decision Tree. The Decision Tree classifier yielded the best results, which is why I've included its implementation in my portfolio.

<div class="case-question">
  <span class="case-note-label">Question</span>
  <p>Which classifier best captures the purchase boundary in a simple two-feature problem, and how does scaling affect both modelling and interpretation?</p>
</div>

## Approach

Rather than presenting the project as a notebook dump, this case study focuses on the decisions that shaped the analysis.

1. Model Comparison & selection: Tested multiple classification algorithms (Logistic Regression, SVM, Kernel SVM, Naive Bayes, K-NN, Random Forest, and Decision Tree) to identify the best-performing model for this dataset.
2. Data Import & Preparation: Loaded the Social Network Ads dataset using pandas and separated features (age, salary) from the target variable (purchase decision).
3. Data Splitting: Used train_test_split() to divide the dataset into 75% training and 25% testing sets with a fixed random state for reproducibility.
4. Feature scaling: Applied StandardScaler to normalize both age and salary features, ensuring equal contribution to the model since salary values are much larger than age values.
5. Model Training: Implemented and trained seven different classifiers on the scaled training data: LogisticRegression , SVC (linear and RBF kernel) , GaussianNB , KNeighborsClassifier , RandomForestClassifier , and DecisionTreeClassifier with entropy criterion.
6. Model Evaluation: Generated predictions on the test set and created a confusion matrix to assess classification performance and calculate accuracy score..
7. Decision Boundary Visualization feature engineering: Created contour plots showing decision boundaries for both training and test sets, with red and green regions representing different classification zones.

## Key implementation decision

### Train in scaled space, explain in human-readable space

Scaling helps models treat age and salary comparably, but scaled coordinates make plots harder to interpret. The visualisation therefore inverse-transforms the features before displaying the learned boundary.

```python
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

classifier = DecisionTreeClassifier(criterion="entropy", random_state=0)
classifier.fit(X_train, y_train)

y_pred = classifier.predict(X_test)
cm = confusion_matrix(y_test, y_pred)
accuracy = accuracy_score(y_test, y_pred)
```

<div class="case-comment">
  <span class="case-note-label">Why this matters</span>
  <p>Because the dataset has only age and estimated salary as inputs, it is possible to inspect the classification surface directly. That makes the project useful for connecting model behaviour to a visual decision boundary.</p>
</div>

## Results & evidence

The figures below are the project evidence I would show first. The full implementation remains available through the GitHub link at the top of the page.

<div class="image-gallery">
<figure>
<img alt="Logistic Regression visualization" class="gallery-trigger" data-caption="Logistic Regression Model" data-full="/images/Salary_logR.png" data-gallery="salary-network" decoding="async" height="790" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Salary_logR-900.webp" srcset="/images/thumbs/Salary_logR-480.webp 480w, /images/thumbs/Salary_logR-900.webp 900w" width="1164"/>
<figcaption><strong>Figure 1</strong> Logistic Regression</figcaption>
</figure>
<figure>
<img alt="Logistic Regression performance metrics" class="gallery-trigger" data-caption="Logistic Regression Results" data-full="/images/salary_logRT.png" data-gallery="salary-network" decoding="async" height="570" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/salary_logRT-900.webp" srcset="/images/thumbs/salary_logRT-480.webp 480w, /images/thumbs/salary_logRT-900.webp 900w" width="1480"/>
<figcaption><strong>Table 1</strong> Logistic Regression Metrics</figcaption>
</figure>
<figure>
<img alt="Support Vector Machine visualization" class="gallery-trigger" data-caption="SVM Model" data-full="/images/Salary_svm.png" data-gallery="salary-network" decoding="async" height="774" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Salary_svm-900.webp" srcset="/images/thumbs/Salary_svm-480.webp 480w, /images/thumbs/Salary_svm-900.webp 900w" width="1140"/>
<figcaption><strong>Figure 2</strong> Support Vector Machine</figcaption>
</figure>
<figure>
<img alt="SVM performance metrics" class="gallery-trigger" data-caption="SVM Results" data-full="/images/salary_svmT.png" data-gallery="salary-network" decoding="async" height="570" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/salary_svmT-900.webp" srcset="/images/thumbs/salary_svmT-480.webp 480w, /images/thumbs/salary_svmT-900.webp 900w" width="1480"/>
<figcaption><strong>Table 2</strong> SVM Metrics</figcaption>
</figure>
<figure>
<img alt="Kernel SVM visualization" class="gallery-trigger" data-caption="Kernel SVM Model" data-full="/images/Salary_kernsvm.png" data-gallery="salary-network" decoding="async" height="854" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Salary_kernsvm-900.webp" srcset="/images/thumbs/Salary_kernsvm-480.webp 480w, /images/thumbs/Salary_kernsvm-900.webp 900w" width="1262"/>
<figcaption><strong>Figure 3</strong> Kernel SVM</figcaption>
</figure>
<figure>
<img alt="Kernel SVM performance metrics" class="gallery-trigger" data-caption="Kernel SVM Results" data-full="/images/salary_kernsvmT.png" data-gallery="salary-network" decoding="async" height="570" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/salary_kernsvmT-900.webp" srcset="/images/thumbs/salary_kernsvmT-480.webp 480w, /images/thumbs/salary_kernsvmT-900.webp 900w" width="1480"/>
<figcaption><strong>Table 3</strong> Kernel SVM Metrics</figcaption>
</figure>
<figure>
<img alt="Naive Bayes visualization" class="gallery-trigger" data-caption="Naive Bayes Model" data-full="/images/Salary_naive.png" data-gallery="salary-network" decoding="async" height="776" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Salary_naive-900.webp" srcset="/images/thumbs/Salary_naive-480.webp 480w, /images/thumbs/Salary_naive-900.webp 900w" width="1156"/>
<figcaption><strong>Figure 4</strong> Naive Bayes</figcaption>
</figure>
<figure>
<img alt="Naive Bayes performance metrics" class="gallery-trigger" data-caption="Naive Bayes Results" data-full="/images/salary_naiveT.png" data-gallery="salary-network" decoding="async" height="570" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/salary_naiveT-900.webp" srcset="/images/thumbs/salary_naiveT-480.webp 480w, /images/thumbs/salary_naiveT-900.webp 900w" width="1480"/>
<figcaption><strong>Table 4</strong> Naive Bayes Metrics</figcaption>
</figure>
<figure>
<img alt="K-Nearest Neighbors visualization" class="gallery-trigger" data-caption="KNN Model" data-full="/images/Salary_knn.png" data-gallery="salary-network" decoding="async" height="714" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Salary_knn-900.webp" srcset="/images/thumbs/Salary_knn-480.webp 480w, /images/thumbs/Salary_knn-900.webp 900w" width="1058"/>
<figcaption><strong>Figure 5</strong> K-Nearest Neighbors</figcaption>
</figure>
<figure>
<img alt="KNN performance metrics" class="gallery-trigger" data-caption="KNN Results" data-full="/images/salary_knnT.png" data-gallery="salary-network" decoding="async" height="570" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/salary_knnT-900.webp" srcset="/images/thumbs/salary_knnT-480.webp 480w, /images/thumbs/salary_knnT-900.webp 900w" width="1480"/>
<figcaption><strong>Table 5</strong> KNN Metrics</figcaption>
</figure>
<figure>
<img alt="Random Forest visualization" class="gallery-trigger" data-caption="Random Forest Model" data-full="/images/Salary_random.png" data-gallery="salary-network" decoding="async" height="690" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Salary_random-900.webp" srcset="/images/thumbs/Salary_random-480.webp 480w, /images/thumbs/Salary_random-900.webp 900w" width="1012"/>
<figcaption><strong>Figure 6</strong> Random Forest</figcaption>
</figure>
<figure>
<img alt="Random Forest performance metrics" class="gallery-trigger" data-caption="Random Forest Results" data-full="/images/salary_randomT.png" data-gallery="salary-network" decoding="async" height="570" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/salary_randomT-900.webp" srcset="/images/thumbs/salary_randomT-480.webp 480w, /images/thumbs/salary_randomT-900.webp 900w" width="1480"/>
<figcaption><strong>Table 6</strong> Random Forest Metrics</figcaption>
</figure>
<figure>
<img alt="Decision Tree visualization" class="gallery-trigger" data-caption="Decision Tree Model" data-full="/images/Salary_dectree.png" data-gallery="salary-network" decoding="async" height="908" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Salary_dectree-900.webp" srcset="/images/thumbs/Salary_dectree-480.webp 480w, /images/thumbs/Salary_dectree-900.webp 900w" width="1340"/>
<figcaption><strong>Figure 7</strong> Decision Tree</figcaption>
</figure>
<figure>
<img alt="Decision Tree performance metrics" class="gallery-trigger" data-caption="Decision Tree Results" data-full="/images/salary_dectreeT.png" data-gallery="salary-network" decoding="async" height="570" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/salary_dectreeT-900.webp" srcset="/images/thumbs/salary_dectreeT-480.webp 480w, /images/thumbs/salary_dectreeT-900.webp 900w" width="1480"/>
<figcaption><strong>Table 7</strong> Decision Tree Metrics</figcaption>
</figure>
</div>

## What challenged me

At first, the visualisations were hard to understand because the data had been scaled. The age and salary values didn’t look realistic in the plots. I solved this by converting the data back to its original scale before plotting. This made the decision areas easier to read and relate to real-life values.

## What I learned

- Feature scaling prevented salary magnitude from dominating age during model fitting.
- Inverse-transforming the features made the decision-boundary plots interpretable in real units again.
- A winning model on one split should be treated as a dataset-specific result until it is validated more robustly.

## What I would improve next

- Compare models with cross-validation rather than a single holdout split.
- Report the full metric set instead of selecting the winner on accuracy alone.
- Use the two-dimensional setting to show where competing models disagree.

<div class="case-end-note">
  <strong>Full implementation:</strong> use the GitHub link in the project header for the complete notebook/code rather than expanding the case study into a full source listing.
</div>
