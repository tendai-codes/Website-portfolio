---
title: "Bank Customer Segmentation"
description: "I used K-Means clustering and PCA to turn high-dimensional credit-card behaviour into an interpretable customer-segmentation exercise."
category: "Machine Learning"
technologies: ["Python", "K-Means", "PCA", "scikit-learn"]
featured: false
visual: "grid"
github: "https://github.com/tendai-codes/Machine-learning/tree/main/bank-customers-segmentation"
question: "Can high-dimensional credit-card behaviour be reduced into useful customer groups without losing the structure that makes those groups meaningful?"
focus: ["Unsupervised learning", "Feature scaling", "PCA visualisation"]
outcome: "A seven-cluster K-Means solution explored in two-dimensional PCA space."
keyChallenge: "Initial visualisations of K-Means clusters were ambiguous due to the high dimensionality of features. Reducing dimensions with PCA made it easier to see meaningful separation, but it required balancing between retaining variance and simplifying complexity. I resolved this by examining explained variance ratios and adjusting the number of components accordingly."
---
## The problem

Analyzed bank customer data to segment customers using K-Means Clustering, with dimensionality reduction achieved through PCA. This approach resulted in 7 well-defined customer segments based on key financial behaviors, optimizing the bank's ability to market tailored products and services to their customers.

<div class="case-question">
  <span class="case-note-label">Question</span>
  <p>Can high-dimensional credit-card behaviour be reduced into useful customer groups without losing the structure that makes those groups meaningful?</p>
</div>

## Approach

Rather than presenting the project as a notebook dump, this case study focuses on the decisions that shaped the analysis.

1. Load & inspect data: Loaded the dataset using pd.read_csv() , checked for nulls and reviewed data types using .info() and .describe() .
2. Exploratory Analysis: Removed customer ID column. Handled missing values, especially in MINIMUM_PAYMENTS and CREDIT_LIMIT . Used pair plots and distribution plots to understand feature distributions and detect outliers.
3. Feature selection & scaling: Selected numerical columns (like Age, Income, Spending Score) and scaled them using StandardScaler for optimal clustering.
4. Clustering with K-Means: Applied the Elbow Method to determine the optimal number of clusters and used KMeans to group customers.
5. Visualisation: Plotted clusters using PCA components. Created scatter plots with cluster labels to visualise customer groupings based on income and spending behaviour.

## Key implementation decision

### Scale first, cluster second, visualise last

K-Means is distance-based, so the raw financial features needed to be put on a comparable scale before clustering. PCA was then used as a visualisation layer rather than as a substitute for the clustering step.

```python
scaler = StandardScaler()
credit_card_df_scaled = scaler.fit_transform(credit_card_df)

kmeans = KMeans(n_clusters=7, init="k-means++", random_state=42)
kmeans.fit(credit_card_df_scaled)
labels = kmeans.labels_

pca = PCA(n_components=2)
principalComp = pca.fit_transform(credit_card_df_scaled)
```

<div class="case-comment">
  <span class="case-note-label">Why this matters</span>
  <p>The original dataset contains many behavioural variables on different numerical scales. The useful question was not only whether clusters could be generated, but whether their separation could be inspected and interpreted after dimensionality reduction.</p>
</div>

## Results & evidence

The figures below are the project evidence I would show first. The full implementation remains available through the GitHub link at the top of the page.

<div class="image-gallery">
<figure>
<img alt="Data frame showing bank customer characteristics" class="gallery-trigger" data-caption="Customer Data Overview" data-full="/images/Bank%20Customer_df.png" data-gallery="bank-customer" decoding="async" height="410" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Bank%20Customer_df-900.webp" srcset="/images/thumbs/Bank%20Customer_df-480.webp 480w, /images/thumbs/Bank%20Customer_df-900.webp 900w" width="2558"/>
<figcaption><strong>Table 1</strong> Customer Data Frame</figcaption>
</figure>
<figure>
<img alt="Table showing missing data patterns in customer records" class="gallery-trigger" data-caption="Missing Data Analysis" data-full="/images/Bank%20Customer_miss.png" data-gallery="bank-customer" decoding="async" height="922" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Bank%20Customer_miss-900.webp" srcset="/images/thumbs/Bank%20Customer_miss-480.webp 480w, /images/thumbs/Bank%20Customer_miss-900.webp 900w" width="620"/>
<figcaption><strong>Table 2</strong> Missing Data Analysis</figcaption>
</figure>
<figure>
<img alt="Visual confirmation of complete data after cleaning" class="gallery-trigger" data-caption="Data Completeness Verification" data-full="/images/Bank%20Customer_check%20missing.png" data-gallery="bank-customer" decoding="async" height="1190" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Bank%20Customer_check%20missing-900.webp" srcset="/images/thumbs/Bank%20Customer_check%20missing-480.webp 480w, /images/thumbs/Bank%20Customer_check%20missing-900.webp 900w" width="1028"/>
<figcaption><strong>Figure 1</strong> Data Completeness Verification</figcaption>
</figure>
<figure>
<img alt="Distribution plots of customer attributes" class="gallery-trigger" data-caption="Feature Distribution Analysis" data-full="/images/Bank%20Customer_distplots.png" data-gallery="bank-customer" decoding="async" height="2990" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Bank%20Customer_distplots-900.webp" srcset="/images/thumbs/Bank%20Customer_distplots-480.webp 480w, /images/thumbs/Bank%20Customer_distplots-900.webp 900w" width="1488"/>
<figcaption><strong>Figure 2</strong> Feature Distribution Analysis</figcaption>
</figure>
<figure>
<img alt="Heatmap showing correlations between features" class="gallery-trigger" data-caption="Feature Correlation Heatmap" data-full="/images/Bank%20Customer_heat.png" data-gallery="bank-customer" decoding="async" height="1860" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Bank%20Customer_heat-900.webp" srcset="/images/thumbs/Bank%20Customer_heat-480.webp 480w, /images/thumbs/Bank%20Customer_heat-900.webp 900w" width="1752"/>
<figcaption><strong>Figure 3</strong> Feature Correlation Heatmap</figcaption>
</figure>
<figure>
<img alt="Elbow method plot for optimal cluster determination" class="gallery-trigger" data-caption="Optimal Cluster Determination" data-full="/images/Bank%20Customer_elbow.png" data-gallery="bank-customer" decoding="async" height="888" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Bank%20Customer_elbow-900.webp" srcset="/images/thumbs/Bank%20Customer_elbow-480.webp 480w, /images/thumbs/Bank%20Customer_elbow-900.webp 900w" width="1184"/>
<figcaption><strong>Figure 4</strong> Optimal Cluster Determination</figcaption>
</figure>
<figure>
<img alt="Principal Component Analysis results table" class="gallery-trigger" data-caption="PCA Component Analysis" data-full="/images/Bank%20Customer_table%203.png" data-gallery="bank-customer" decoding="async" height="668" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Bank%20Customer_table%203-900.webp" srcset="/images/thumbs/Bank%20Customer_table%203-480.webp 480w, /images/thumbs/Bank%20Customer_table%203-900.webp 900w" width="1158"/>
<figcaption><strong>Table 3</strong> PCA Component Analysis</figcaption>
</figure>
<figure>
<img alt="Visualization of bank customer clusters" class="gallery-trigger" data-caption="Customer Cluster Visualization" data-full="/images/bank%20customers%20clusters.png" data-gallery="bank-customer" decoding="async" height="855" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/bank%20customers%20clusters-900.webp" srcset="/images/thumbs/bank%20customers%20clusters-480.webp 480w, /images/thumbs/bank%20customers%20clusters-900.webp 900w" width="841"/>
<figcaption><strong>Figure 5</strong> Customer Cluster Visualization</figcaption>
</figure>
</div>

## What challenged me

Initial visualisations of K-Means clusters were ambiguous due to the high dimensionality of features. Reducing dimensions with PCA made it easier to see meaningful separation, but it required balancing between retaining variance and simplifying complexity. I resolved this by examining explained variance ratios and adjusting the number of components accordingly.

## What I learned

- Distance-based clustering is sensitive to feature scale, so standardisation belongs in the core method rather than as a cosmetic preprocessing step.
- PCA made the cluster structure easier to inspect, but visual separation should not be confused with proof that the chosen number of clusters is optimal.
- The useful output of segmentation is the behavioural profile of each group, not just the cluster label itself.

## What I would improve next

- Validate cluster stability across different values of k and random seeds.
- Profile each cluster with summary statistics before attaching marketing interpretations.
- Compare PCA with another projection method while keeping K-Means evaluation separate from the visualisation.

<div class="case-end-note">
  <strong>Full implementation:</strong> use the GitHub link in the project header for the complete notebook/code rather than expanding the case study into a full source listing.
</div>
