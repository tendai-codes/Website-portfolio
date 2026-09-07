---
title: "Breast Cancer Classification: Multi-Algorithm Comparison"
description: "A comparative medical-classification exercise using multiple algorithms, standardised cellular features and confusion-matrix analysis."
category: "Machine Learning"
technologies: ["Python", "Classification", "scikit-learn", "Medical ML"]
featured: true
visual: "scatter"
github: "https://github.com/tendai-codes/Machine-learning/tree/main/breast-cancer-prognosis"
question: "How do common classifiers differ when they are evaluated on the same breast-cancer diagnostic dataset and preprocessing pipeline?"
focus: ["Classification", "Model comparison", "Medical ML evaluation"]
outcome: "A shared evaluation pipeline across multiple classifiers, with confusion matrices used alongside accuracy."
keyChallenge: "Working with medical diagnostic data presented a critical class imbalance consideration that required careful attention to evaluation metrics beyond simple accuracy. While accuracy score provides an overall performance measure, it can be misleading in medical contexts where false negatives (missing actual cancer cases) have far more severe consequences than false positives (flagging benign cases as suspicious). The challenge was ensuring that model evaluation properly weighted the clinical importance of sensitivity (recall) versus specificity, as a model with 95% accuracy might still miss 20% of actual cancer cases if the dataset is imbalanced. This was addressed by implementing confusion matrix analysis to examine true positives, false positives, true negatives, and false negatives separately, enabling assessment of each model's ability to minimize the most clinically dangerous errors while maintaining overall diagnostic reliability."
---
## The problem

This project implemented and compared six different machine learning classification algorithms to predict breast cancer diagnosis (malignant vs benign) based on cellular characteristics. I built a comprehensive medical classification pipeline using multiple algorithms to identify the most effective approach for cancer detection and diagnosis support.

<div class="case-question">
  <span class="case-note-label">Question</span>
  <p>How do common classifiers differ when they are evaluated on the same breast-cancer diagnostic dataset and preprocessing pipeline?</p>
</div>

## Approach

Rather than presenting the project as a notebook dump, this case study focuses on the decisions that shaped the analysis.

1. Load & inspect data: Loaded breast cancer dataset using pd.read_csv() and separated cellular features (X) from diagnosis labels (y) using iloc[:, :-1] and iloc[:, -1] respectively, ensuring proper handling of medical diagnostic data.
2. Train-test stratification: Applied train_test_split() with 75-25 split ( test_size=0.25 ) and fixed random state for reproducible medical model evaluation, crucial for healthcare applications.
3. Feature standardization: Implemented StandardScaler() using fit_transform() on training data and transform() on test data to normalize cellular measurements across different scales without data leakage.
4. Logistic Regression: Built a LogisticRegression(random_state=0) model as the statistical baseline for binary medical classification, providing interpretable probability outputs for clinical decision-making.
5. Support Vector Machine (Linear): Implemented SVC(kernel='linear') to find optimal linear decision boundaries for separating malignant from benign cases using maximum margin principles.
6. Decision Tree Classification: Applied DecisionTreeClassifier(criterion='entropy') to create interpretable rule-based diagnostic pathways that clinicians can follow and understand.
7. K-Nearest Neighbors: Used KNeighborsClassifier(n_neighbors=5, metric='minkowski', p=2) to classify cases based on similarity to neighboring data points, leveraging local patterns in cellular characteristics.

## Key implementation decision

### Keep preprocessing fixed so the model comparison is meaningful

Every classifier sees the same train/test split and standardised feature representation. That makes differences in predictions easier to attribute to the model rather than to inconsistent preprocessing.

```python
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=0
)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

classifier = DecisionTreeClassifier(criterion="entropy", random_state=0)
classifier.fit(X_train, y_train)
y_pred = classifier.predict(X_test)
cm = confusion_matrix(y_test, y_pred)
```

<div class="case-comment">
  <span class="case-note-label">Why this matters</span>
  <p>In a diagnostic setting, a headline accuracy value can hide clinically important error patterns. The comparison therefore becomes more useful when false positives and false negatives are visible rather than collapsed into a single score.</p>
</div>

## Results & evidence

The figures below are the project evidence I would show first. The full implementation remains available through the GitHub link at the top of the page.

<div class="image-gallery">
<figure>
<img alt="Logistic Regression visualization for breast cancer classification" class="gallery-trigger" data-caption="Logistic Regression Model - Breast Cancer" data-full="/images/Breast_logR.png" data-gallery="breast-cancer" decoding="async" height="230" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Breast_logR-900.webp" srcset="/images/thumbs/Breast_logR-480.webp 480w, /images/thumbs/Breast_logR-900.webp 900w" width="632"/>
<figcaption><strong>Figure 1</strong> Logistic Regression</figcaption>
</figure>
<figure>
<img alt="Support Vector Machine visualization for breast cancer classification" class="gallery-trigger" data-caption="SVM Model - Breast Cancer" data-full="/images/Breast_svm.png" data-gallery="breast-cancer" decoding="async" height="226" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Breast_svm-900.webp" srcset="/images/thumbs/Breast_svm-480.webp 480w, /images/thumbs/Breast_svm-900.webp 900w" width="632"/>
<figcaption><strong>Figure 2</strong> SVM</figcaption>
</figure>
<figure>
<img alt="Kernel SVM visualization for breast cancer classification" class="gallery-trigger" data-caption="Kernel SVM Model - Breast Cancer" data-full="/images/Breast_ksvm.png" data-gallery="breast-cancer" decoding="async" height="230" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Breast_ksvm-900.webp" srcset="/images/thumbs/Breast_ksvm-480.webp 480w, /images/thumbs/Breast_ksvm-900.webp 900w" width="632"/>
<figcaption><strong>Figure 3</strong> Kernel SVM</figcaption>
</figure>
<figure>
<img alt="K-Nearest Neighbors visualization for breast cancer classification" class="gallery-trigger" data-caption="K-Nearest Neighbors Model - Breast Cancer" data-full="/images/Breast_knn.png" data-gallery="breast-cancer" decoding="async" height="226" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Breast_knn-900.webp" srcset="/images/thumbs/Breast_knn-480.webp 480w, /images/thumbs/Breast_knn-900.webp 900w" width="632"/>
<figcaption><strong>Figure 4</strong> K-Nearest Neighbor</figcaption>
</figure>
<figure>
<img alt="Naïve Bayes visualization for breast cancer classification" class="gallery-trigger" data-caption="Naïve Bayes Model - Breast Cancer" data-full="/images/Breast_naive.png" data-gallery="breast-cancer" decoding="async" height="230" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Breast_naive-900.webp" srcset="/images/thumbs/Breast_naive-480.webp 480w, /images/thumbs/Breast_naive-900.webp 900w" width="632"/>
<figcaption><strong>Figure 5</strong> Naïve Bayes</figcaption>
</figure>
<figure>
<img alt="Random Forest visualization for breast cancer classification" class="gallery-trigger" data-caption="Random Forest Model - Breast Cancer" data-full="/images/Breast_randfor.png" data-gallery="breast-cancer" decoding="async" height="230" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Breast_randfor-900.webp" srcset="/images/thumbs/Breast_randfor-480.webp 480w, /images/thumbs/Breast_randfor-900.webp 900w" width="632"/>
<figcaption><strong>Figure 6</strong> Random Forest</figcaption>
</figure>
<figure>
<img alt="Decision Tree visualization for breast cancer classification" class="gallery-trigger" data-caption="Decision Tree Model - Breast Cancer" data-full="/images/Breast_decision.png" data-gallery="breast-cancer" decoding="async" height="260" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Breast_decision-900.webp" srcset="/images/thumbs/Breast_decision-480.webp 480w, /images/thumbs/Breast_decision-900.webp 900w" width="788"/>
<figcaption><strong>Figure 7</strong> Decision Tree</figcaption>
</figure>
</div>

## What challenged me

Working with medical diagnostic data presented a critical class imbalance consideration that required careful attention to evaluation metrics beyond simple accuracy. While accuracy score provides an overall performance measure, it can be misleading in medical contexts where false negatives (missing actual cancer cases) have far more severe consequences than false positives (flagging benign cases as suspicious). The challenge was ensuring that model evaluation properly weighted the clinical importance of sensitivity (recall) versus specificity, as a model with 95% accuracy might still miss 20% of actual cancer cases if the dataset is imbalanced. This was addressed by implementing confusion matrix analysis to examine true positives, false positives, true negatives, and false negatives separately, enabling assessment of each model's ability to minimize the most clinically dangerous errors while maintaining overall diagnostic reliability.

## What I learned

- A fair model comparison requires a shared split and preprocessing path.
- For medical classification, confusion-matrix errors are more informative than accuracy alone because different mistakes have different consequences.
- Standardisation is particularly important for distance- and margin-based classifiers when cellular features use different scales.

## What I would improve next

- Use stratified cross-validation rather than relying on one split.
- Report sensitivity, specificity, precision, recall and ROC-AUC consistently across every model.
- Add probability calibration if the models are to be interpreted as decision-support tools.

<div class="case-end-note">
  <strong>Full implementation:</strong> use the GitHub link in the project header for the complete notebook/code rather than expanding the case study into a full source listing.
</div>
