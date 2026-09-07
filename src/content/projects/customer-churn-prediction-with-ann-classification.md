---
title: "Customer Churn Prediction with ANN (Classification)"
description: "A bank-customer churn classifier built with an ANN after encoding mixed categorical and numerical features into one training pipeline."
category: "Deep Learning"
technologies: ["Python", "TensorFlow", "scikit-learn", "ANN"]
featured: false
visual: "grid"
github: "https://github.com/tendai-codes/DeepLearning/tree/main/artificial_neural_network-bank%20customer%20churn"
question: "Can a small feed-forward neural network learn churn patterns from a mixture of demographic and account variables?"
focus: ["Neural networks", "Categorical encoding", "Binary classification"]
outcome: "An ANN churn-classification pipeline with encoded features, scaling and confusion-matrix evaluation."
keyChallenge: "The main challenge was handling mixed categorical and numerical data types efficiently. Initially, I struggled with applying different encoding methods to different columns simultaneously. After experimenting with various approaches, I discovered ColumnTransformer, which allowed me to apply One-Hot Encoding to geography while preserving other numerical features, streamlining the preprocessing pipeline significantly."
---
## The problem

This project developed a binary classification model to predict bank customer churn using an Artificial Neural Network (ANN). I built a deep learning solution to identify customers likely to leave the bank based on their demographic and account information, enabling proactive retention strategies.

<div class="case-question">
  <span class="case-note-label">Question</span>
  <p>Can a small feed-forward neural network learn churn patterns from a mixture of demographic and account variables?</p>
</div>

## Approach

Rather than presenting the project as a notebook dump, this case study focuses on the decisions that shaped the analysis.

1. Load & inspect data: Loaded customer banking dataset with demographic and account features, selected relevant features (columns [:, 3:-1]) as input variables and extracted churn status as target binary variable loc[] .
2. Data preprocessing Analysis: Applied Label Encoding to convert Gender column to numerical format, Implemented One-Hot Encoding for Geography column to handle multiple categories and used ColumnTransformer to apply different encodings to specific columns
3. Model Architecture: Built Sequential ANN with three layers: two hidden layers (6 units each, ReLU activation ) and output layer (1 unit, sigmoid activation ), compiled with Adam optimizer and binary crossentropy loss for binary classification and trained for 100 epochs with batch size of 32
4. Model Evaluation: Generated predictions on test set with 0.5 probability threshold, created confusion matrix to analyze true/false positives and negatives and calculated accuracy score for overall model performance assessment

## Key implementation decision

### Make heterogeneous tabular data model-ready before tuning the network

The hardest part was not the neural-network syntax; it was constructing a consistent numerical feature matrix. Label encoding, one-hot encoding and standardisation were separated so each variable type was handled deliberately.

```python
ct = ColumnTransformer(
    transformers=[("encoder", OneHotEncoder(), [1])],
    remainder="passthrough"
)
X = np.array(ct.fit_transform(X))

sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

ann = tf.keras.models.Sequential([
    tf.keras.layers.Dense(6, activation="relu"),
    tf.keras.layers.Dense(6, activation="relu"),
    tf.keras.layers.Dense(1, activation="sigmoid"),
])
```

<div class="case-comment">
  <span class="case-note-label">Why this matters</span>
  <p>Churn data mixes categories such as geography with financial measurements on very different scales. The project became an exercise in building a clean preprocessing path before asking the network to learn anything useful.</p>
</div>

## Results & evidence

The figures below are the project evidence I would show first. The full implementation remains available through the GitHub link at the top of the page.

<div class="image-gallery">
<figure>
<img alt="Table 1: Variable X" class="gallery-trigger" data-caption="Table 1: Variable X" data-full="/images/ANNClass_table%201.png" data-gallery="ANNClass" decoding="async" height="678" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/ANNClass_table%201-900.webp" srcset="/images/thumbs/ANNClass_table%201-480.webp 480w, /images/thumbs/ANNClass_table%201-900.webp 900w" width="1242"/>
<figcaption><strong>Table 1</strong> Variable X</figcaption>
</figure>
<figure>
<img alt="Table 2: Variable y" class="gallery-trigger" data-caption="Table 2: Variable y" data-full="/images/ANNClass_table%202.png" data-gallery="ANNClass" decoding="async" height="390" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/ANNClass_table%202-900.webp" srcset="/images/thumbs/ANNClass_table%202-480.webp 480w, /images/thumbs/ANNClass_table%202-900.webp 900w" width="1240"/>
<figcaption><strong>Table 2</strong> Variable y</figcaption>
</figure>
<figure>
<img alt="Table 3: Encoding Gender" class="gallery-trigger" data-caption="Table 3: Encoding Gender" data-full="/images/ANNClass_table%203.png" data-gallery="ANNClass" decoding="async" height="678" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/ANNClass_table%203-900.webp" srcset="/images/thumbs/ANNClass_table%203-480.webp 480w, /images/thumbs/ANNClass_table%203-900.webp 900w" width="1242"/>
<figcaption><strong>Table 3</strong> Encoding Gender</figcaption>
</figure>
<figure>
<img alt="Table 4: Encoding Country" class="gallery-trigger" data-caption="Table 4: Encoding Country" data-full="/images/ANNClass_table%204.png" data-gallery="ANNClass" decoding="async" height="678" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/ANNClass_table%204-900.webp" srcset="/images/thumbs/ANNClass_table%204-480.webp 480w, /images/thumbs/ANNClass_table%204-900.webp 900w" width="1242"/>
<figcaption><strong>Table 4</strong> Encoding Country</figcaption>
</figure>
<figure>
<img alt="Table 5: Training the ANN" class="gallery-trigger" data-caption="Table 5: Training the ANN" data-full="/images/ANNClass_table%205.png" data-gallery="ANNClass" decoding="async" height="1210" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/ANNClass_table%205-900.webp" srcset="/images/thumbs/ANNClass_table%205-480.webp 480w, /images/thumbs/ANNClass_table%205-900.webp 900w" width="1360"/>
<figcaption><strong>Table 5</strong> Training the ANN</figcaption>
</figure>
<figure>
<img alt="Table 6: Predicting Test Set Results" class="gallery-trigger" data-caption="Table 6: Predicting Test Set Results" data-full="/images/ANNClass_table%206.png" data-gallery="ANNClass" decoding="async" height="694" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/ANNClass_table%206-900.webp" srcset="/images/thumbs/ANNClass_table%206-480.webp 480w, /images/thumbs/ANNClass_table%206-900.webp 900w" width="2026"/>
<figcaption><strong>Table 6</strong> Predicting Test Set Results</figcaption>
</figure>
<figure>
<img alt="Table 7: Confusion Matrix" class="gallery-trigger" data-caption="Table 7: Confusion Matrix" data-full="/images/ANNClass_table%207.png" data-gallery="ANNClass" decoding="async" height="604" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/ANNClass_table%207-900.webp" srcset="/images/thumbs/ANNClass_table%207-480.webp 480w, /images/thumbs/ANNClass_table%207-900.webp 900w" width="1496"/>
<figcaption><strong>Table 7</strong> Confusion Matrix</figcaption>
</figure>
</div>

## What challenged me

The main challenge was handling mixed categorical and numerical data types efficiently. Initially, I struggled with applying different encoding methods to different columns simultaneously. After experimenting with various approaches, I discovered ColumnTransformer, which allowed me to apply One-Hot Encoding to geography while preserving other numerical features, streamlining the preprocessing pipeline significantly.

## What I learned

- The preprocessing pipeline was as important as the ANN architecture because the raw data mixed categories and continuous financial variables.
- Standardisation helped make the optimisation problem better behaved for the neural network.
- Churn evaluation should focus on how well likely churners are identified, not only on aggregate accuracy.

## What I would improve next

- Compare the ANN with simpler tabular baselines such as logistic regression and tree ensembles.
- Use precision, recall and class-specific error analysis to assess how well likely churners are detected.
- Move preprocessing into a reusable pipeline so training and single-customer inference cannot drift apart.

<div class="case-end-note">
  <strong>Full implementation:</strong> use the GitHub link in the project header for the complete notebook/code rather than expanding the case study into a full source listing.
</div>
