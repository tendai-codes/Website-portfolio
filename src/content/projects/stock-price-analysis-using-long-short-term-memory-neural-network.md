---
title: "Stock Price Analysis using Long Short Term Memory Neural Network"
description: "A Tesla next-day price forecasting experiment using scaled price/volume inputs and a stacked LSTM network."
category: "Deep Learning"
technologies: ["Python", "LSTM", "Time Series", "Deep Learning"]
featured: false
visual: "grid"
github: "https://github.com/tendai-codes/Machine-learning/tree/main/stock-price-prediction-lstm"
question: "Can an LSTM use recent Tesla price and volume information to model next-day closing-price behaviour?"
focus: ["Time-series modelling", "LSTM", "TensorFlow / Keras"]
outcome: "A stacked LSTM forecasting pipeline with scaled inputs, held-out predictions and model-performance visualisation."
keyChallenge: "My biggest challenge was preparing the time series data in the correct 3D format for LSTM input. Initially, I struggled with reshaping arrays from 1D to the required (samples, timesteps, features) structure. After researching LSTM input requirements and experimenting with NumPy reshape operations, I learned to properly sequence the data with sliding windows and convert to the appropriate tensor dimensions for neural network training."
---
## The problem

This project focused on predicting Tesla (TSLA) stock prices using deep learning techniques with LSTM neural networks. I built a time series forecasting model that uses historical closing prices and trading volumes to predict next-day stock prices, implementing robust validation through K-fold cross-validation.

<div class="case-question">
  <span class="case-note-label">Question</span>
  <p>Can an LSTM use recent Tesla price and volume information to model next-day closing-price behaviour?</p>
</div>

<div class="case-note case-note-caution">
  <span class="case-note-label">Evaluation caution</span>
  <p>The original experiment includes K-fold validation. For financial time series, I would now prefer walk-forward or expanding-window validation because chronology should be preserved during evaluation.</p>
</div>

## Approach

Rather than presenting the project as a notebook dump, this case study focuses on the decisions that shaped the analysis.

1. Data Preparation: Combined separate stock price and volume datasets using custom individual_stock() function. Created target variable using trading_window() function with 1-day prediction horizon. Focused on Tesla (TSLA) stock as the primary case study.
2. Feature Engineering & Preprocessing: Applied MinMaxScaler to normalize closing prices and volumes to (0,1) range. Converted 1D arrays to 3D format required for LSTM input (samples, timesteps, features). Split data with 75% for training and 25% for testing.
3. Model Architecture: Built multi-layer LSTM model with three LSTM layers (150 units each). Implemented dropout layers (0.3 rate) between LSTM layers to prevent overfitting, used linear activation for final dense layer to output continuous price predictions and compiled with Adam optimizer and MSE loss function.
4. Model Validation: Implemented 5-fold cross-validation to ensure model robustness, trained for 20 epochs with batch size of 32 and used 20% validation split during training for monitoring.

## Key implementation decision

### Reshape the time series explicitly into the tensor shape expected by the LSTM

The network expects data shaped as samples × timesteps × features. Making that transformation explicit prevents a silent mismatch between tabular arrays and sequence-model inputs.

```python
sc = MinMaxScaler(feature_range=(0, 1))
training_set_scaled = sc.fit_transform(training_data)

X_train = np.reshape(
    X_train, (X_train.shape[0], X_train.shape[1], 1)
)

inputs = keras.layers.Input(shape=(X_train.shape[1], X_train.shape[2]))
x = keras.layers.LSTM(150, return_sequences=True)(inputs)
x = keras.layers.Dropout(0.3)(x)
x = keras.layers.LSTM(150)(x)
outputs = keras.layers.Dense(1, activation="linear")(x)
```

<div class="case-comment">
  <span class="case-note-label">Why this matters</span>
  <p>This project is useful as a sequence-modelling exercise because it makes the data-shape requirements and architecture choices visible. The predictive result should still be interpreted cautiously because financial time series are non-stationary and evaluation design matters heavily.</p>
</div>

## Results & evidence

The figures below are the project evidence I would show first. The full implementation remains available through the GitHub link at the top of the page.

<div class="image-gallery">
<figure>
<img alt="Table 1: closing vol Df" class="gallery-trigger" data-caption="Table 1: closing vol Df" data-full="/images/LSTM_table%201.png" data-gallery="LSTM" decoding="async" height="1020" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/LSTM_table%201-900.webp" srcset="/images/thumbs/LSTM_table%201-480.webp 480w, /images/thumbs/LSTM_table%201-900.webp 900w" width="876"/>
<figcaption><strong>Table 1</strong></figcaption>
</figure>
<figure>
<img alt="Table 2: LSTM Model Execution" class="gallery-trigger" data-caption="Table 2: LSTM Model Execution" data-full="/images/LSTM_table%202.png" data-gallery="LSTM" decoding="async" height="708" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/LSTM_table%202-900.webp" srcset="/images/thumbs/LSTM_table%202-480.webp 480w, /images/thumbs/LSTM_table%202-900.webp 900w" width="1604"/>
<figcaption><strong>Table 2</strong> LSTM Model Execution</figcaption>
</figure>
<figure>
<img alt="Table 3: Closing vs Prediction Price" class="gallery-trigger" data-caption="Table 3: Closing vs Prediction Price" data-full="/images/LSTM_table%203.png" data-gallery="LSTM" decoding="async" height="1042" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/LSTM_table%203-900.webp" srcset="/images/thumbs/LSTM_table%203-480.webp 480w, /images/thumbs/LSTM_table%203-900.webp 900w" width="912"/>
<figcaption><strong>Table 3</strong> Closing vs Prediction Price</figcaption>
</figure>
<figure>
<img alt="Figure 1: Closing Price" class="gallery-trigger" data-caption="Figure 1: Closing Price" data-full="/images/LSTM_fig%201.png" data-gallery="LSTM" decoding="async" height="964" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/LSTM_fig%201-900.webp" srcset="/images/thumbs/LSTM_fig%201-480.webp 480w, /images/thumbs/LSTM_fig%201-900.webp 900w" width="1396"/>
<figcaption><strong>Figure 1</strong> Closing Price</figcaption>
</figure>
<figure>
<img alt="Figure 2: Closing vs Prediction Price" class="gallery-trigger" data-caption="Figure 2: Closing vs Prediction Price" data-full="/images/LSTM_fig%202.png" data-gallery="LSTM" decoding="async" height="964" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/LSTM_fig%202-900.webp" srcset="/images/thumbs/LSTM_fig%202-480.webp 480w, /images/thumbs/LSTM_fig%202-900.webp 900w" width="1396"/>
<figcaption><strong>Figure 2</strong> Closing vs Prediction Price</figcaption>
</figure>
</div>

## What challenged me

My biggest challenge was preparing the time series data in the correct 3D format for LSTM input. Initially, I struggled with reshaping arrays from 1D to the required (samples, timesteps, features) structure. After researching LSTM input requirements and experimenting with NumPy reshape operations, I learned to properly sequence the data with sliding windows and convert to the appropriate tensor dimensions for neural network training.

## What I learned

- Sequence models require deliberate tensor shaping; tabular arrays cannot simply be passed into an LSTM unchanged.
- Dropout and stacked recurrent layers add modelling capacity, but evaluation design is at least as important as architecture complexity.
- Financial forecasting needs time-aware validation because random resampling can leak temporal structure.

## What I would improve next

- Replace shuffled K-fold validation with walk-forward or expanding-window evaluation.
- Compare the LSTM against simple persistence and linear baselines.
- Use longer input windows and evaluate whether volume adds value beyond closing-price history.

<div class="case-end-note">
  <strong>Full implementation:</strong> use the GitHub link in the project header for the complete notebook/code rather than expanding the case study into a full source listing.
</div>
