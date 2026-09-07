---
title: "FashionMNIST Image Classification"
description: "A FashionMNIST computer-vision experiment comparing CNN architectures, with a TinyVGG-inspired model and detailed error inspection."
category: "Deep Learning"
technologies: ["Python", "PyTorch", "CNN", "Computer Vision"]
featured: true
visual: "pixels"
github: "https://github.com/tendai-codes/DeepLearning/tree/main/computer-vision-fashionmnist"
question: "How much does a deeper convolutional architecture improve FashionMNIST classification, and where does it still confuse visually similar classes?"
focus: ["Computer vision", "CNN architecture", "PyTorch"]
outcome: "A TinyVGG-style CNN benchmarked against simpler baselines with prediction and confusion-matrix analysis."
keyChallenge: "A key challenge was dynamically computing the flattened input size after the convolutional layers to correctly set up the first Linear layer. To solve this, I used a with torch.no_grad() block to pass dummy input through the conv layers and automatically extract the output shape. This approach prevented manual miscalculation and made the model reusable for different input sizes."
---
## The problem

This project explores image classification using the FashionMNIST dataset, focusing on comparing CNN architectures to improve accuracy and training efficiency. It began as a practical extension of previous work in computer vision, driven by curiosity to deepen my understanding of how convolutional layers and activation functions impact learning. I designed a CNN inspired by the TinyVGG architecture and benchmarked it against two other models on performance and training time.

<div class="case-question">
  <span class="case-note-label">Question</span>
  <p>How much does a deeper convolutional architecture improve FashionMNIST classification, and where does it still confuse visually similar classes?</p>
</div>

## Approach

Rather than presenting the project as a notebook dump, this case study focuses on the decisions that shaped the analysis.

1. Import & Setup: Loaded FashionMNIST using torchvision.datasets , transforming PIL images into PyTorch tensors.
2. Visual Exploration: Used matplotlib.pyplot to visualise images in grayscale and display class names, gaining familiarity with the data distribution (Figures A–C).
3. Data Loaders: Implemented DataLoader objects with shuffling and batching (batch size = 32) for both training and test datasets.
4. Model Definition: Constructed a CNN (TinyVGG-inspired) using nn.Sequential blocks for convolution, activation, and pooling, with a dynamically calculated flattened feature size for the final Linear layer.
5. Model Training: Trained the CNN using a loop with manual timing and CrossEntropyLoss . Tracked model accuracy with a custom accuracy_function .
6. Model Evaluation: Used a combination of random sample predictions, visual comparisons (Figure 3), and a confusion matrix (Figure 4) using TorchMetrics + MLXtend for deeper analysis.

## Key implementation decision

### Calculate the flattened feature size dynamically instead of hard-coding it

Convolution and pooling layers change spatial dimensions. Passing a dummy tensor through the feature extractor makes the classifier reusable and avoids manually recalculating the input size every time the convolutional blocks change.

```python
with torch.no_grad():
    dummy_input = torch.randn(1, input_shape, 28, 28)
    x = self.conv_block_1(dummy_input)
    x = self.conv_block_2(x)
    self.flattened_size = x.view(1, -1).shape[1]

self.classifier = nn.Sequential(
    nn.Flatten(),
    nn.Linear(self.flattened_size, output_shape)
)
```

<div class="case-comment">
  <span class="case-note-label">Why this matters</span>
  <p>The project was a practical way to connect convolutional architecture choices with model behaviour. The confusion matrix is especially useful because FashionMNIST contains categories that are visually similar even when overall accuracy is strong.</p>
</div>

## Results & evidence

The figures below are the project evidence I would show first. The full implementation remains available through the GitHub link at the top of the page.

<div class="image-gallery">
<figure>
<img alt="Figure A: EDA - Image (Colour)" class="gallery-trigger" data-caption="Figure A: EDA - Image (Colour)t" data-full="/images/Fashion_figA.png" data-gallery="CNN-Py" decoding="async" height="435" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Fashion_figA-900.webp" srcset="/images/thumbs/Fashion_figA-480.webp 480w, /images/thumbs/Fashion_figA-900.webp 900w" width="416"/>
<figcaption><strong>Figure A</strong> EDA - Image (Colour)</figcaption>
</figure>
<figure>
<img alt="Figure B: EDA - Image (Grayscale)" class="gallery-trigger" data-caption="Figure B: EDA - Image (Grayscale)" data-full="/images/Fashion_figB.png" data-gallery="CNN-Py" decoding="async" height="411" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Fashion_figB-900.webp" srcset="/images/thumbs/Fashion_figB-480.webp 480w, /images/thumbs/Fashion_figB-900.webp 900w" width="389"/>
<figcaption><strong>Figure B</strong> EDA - Image (Grayscale)</figcaption>
</figure>
<figure>
<img alt="Figure C: EDA - Range of Images (Grayscale)" class="gallery-trigger" data-caption="Figure C: EDA - Range of Images (Grayscale)" data-full="/images/Fashion_figC.png" data-gallery="CNN-Py" decoding="async" height="735" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Fashion_figC-900.webp" srcset="/images/thumbs/Fashion_figC-480.webp 480w, /images/thumbs/Fashion_figC-900.webp 900w" width="716"/>
<figcaption><strong>Figure C</strong> EDA - Range of Images (Grayscale)</figcaption>
</figure>
<figure>
<img alt="Figure 1: Training &amp; Testing Model" class="gallery-trigger" data-caption="Figure 1: Training &amp; Testing Model" data-full="/images/Fashion_fig1.png" data-gallery="CNN-Py" decoding="async" height="698" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Fashion_fig1-900.webp" srcset="/images/thumbs/Fashion_fig1-480.webp 480w, /images/thumbs/Fashion_fig1-900.webp 900w" width="1246"/>
<figcaption><strong>Figure 1</strong> Training &amp; Testing Model</figcaption>
</figure>
<figure>
<img alt="Table 2: Comparison of Different Model Performance" class="gallery-trigger" data-caption="Table 2: Comparison of Different Model Performance" data-full="/images/Fashion_Table1.png" data-gallery="CNN-Py" decoding="async" height="472" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Fashion_Table1-900.webp" srcset="/images/thumbs/Fashion_Table1-480.webp 480w, /images/thumbs/Fashion_Table1-900.webp 900w" width="1702"/>
<figcaption><strong>Table 2</strong> Comparison of Different Model Performance</figcaption>
</figure>
<figure>
<img alt="Figure 2: Bar Chart of Model Perfomance" class="gallery-trigger" data-caption="Figure 2: Bar Chart of Model Perfomance" data-full="/images/Fashion_fig2.png" data-gallery="CNN-Py" decoding="async" height="455" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Fashion_fig2-900.webp" srcset="/images/thumbs/Fashion_fig2-480.webp 480w, /images/thumbs/Fashion_fig2-900.webp 900w" width="648"/>
<figcaption><strong>Figure 2</strong> Bar Chart of Model Perfomance</figcaption>
</figure>
<figure>
<img alt="Figure 3: CNN Image Prediction" class="gallery-trigger" data-caption="Figure 2: CNN Image Prediction" data-full="/images/Fashion_fig3.png" data-gallery="CNN-Py" decoding="async" height="732" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Fashion_fig3-900.webp" srcset="/images/thumbs/Fashion_fig3-480.webp 480w, /images/thumbs/Fashion_fig3-900.webp 900w" width="737"/>
<figcaption><strong>Figure 3</strong> CNN Image Prediction</figcaption>
</figure>
<figure>
<img alt="Figure 4: Confusion Matrix" class="gallery-trigger" data-caption="Figure 4: Confusion Matrix" data-full="/images/Fashion_fig4.png" data-gallery="CNN-Py" decoding="async" height="650" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/Fashion_fig4-900.webp" srcset="/images/thumbs/Fashion_fig4-480.webp 480w, /images/thumbs/Fashion_fig4-900.webp 900w" width="662"/>
<figcaption><strong>Figure 4</strong> Confusion Matrix</figcaption>
</figure>
</div>

## What challenged me

A key challenge was dynamically computing the flattened input size after the convolutional layers to correctly set up the first Linear layer. To solve this, I used a with torch.no_grad() block to pass dummy input through the conv layers and automatically extract the output shape. This approach prevented manual miscalculation and made the model reusable for different input sizes.

## What I learned

- Deeper convolutional blocks captured spatial structure better than simpler baselines in this experiment.
- Error analysis exposed confusion between visually similar clothing classes that an aggregate score could hide.
- Computing the flattened feature size programmatically made the architecture easier to modify safely.

## What I would improve next

- Test targeted augmentation for the classes that are most frequently confused.
- Use a validation set or cross-validation strategy consistently when comparing architectures.
- Profile training time and parameter count alongside accuracy so efficiency is part of the comparison.

<div class="case-end-note">
  <strong>Full implementation:</strong> use the GitHub link in the project header for the complete notebook/code rather than expanding the case study into a full source listing.
</div>
