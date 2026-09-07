---
title: "Stock Market Analysis"
description: "An exploratory stock-market analysis of normalised prices, daily returns, correlations and volatility across multiple equities and the S&P 500."
category: "Data Analysis"
technologies: ["Python", "Pandas", "Data Visualisation", "Finance"]
featured: false
visual: "grid"
github: "https://github.com/tendai-codes/Data-Analysis/tree/main/stocks-data-analysis-and-visualization"
question: "What changes when stock performance is compared through normalised prices and daily returns rather than raw price levels?"
focus: ["Time-series exploration", "Returns", "Correlation"]
outcome: "A reusable set of functions for rebasing prices, calculating daily returns and comparing cross-stock relationships."
keyChallenge: "The daily returns calculation initially produced incorrect values for the first row of each stock. After debugging, the issue was that there's no previous day to calculate a return from for the first entry. This was solved by explicitly setting the first day's return to 0 using df_daily_return[i][0] = 0 after the loop calculation, ensuring accurate percentage calculations for all subsequent days."
---
## The problem

This project analyzed historical stock price data for major companies and the S&P 500 index to understand price movements, correlations, and daily return patterns. I built an interactive dashboard using Python's data science stack to visualize both raw and normalized stock performance alongside risk metrics.

<div class="case-question">
  <span class="case-note-label">Question</span>
  <p>What changes when stock performance is compared through normalised prices and daily returns rather than raw price levels?</p>
</div>

## Approach

Rather than presenting the project as a notebook dump, this case study focuses on the decisions that shaped the analysis.

1. Explore data: Loaded stock price data using pd.read_csv() and explored the dataset structure with .info() , .describe() , and .head() to understand the time series format and identify key stocks. Checked for missing values using .isnull().sum() and calculated basic statistics like mean returns and standard deviation to assess data completeness and variability.
2. Price Normalisation: Created a custom normalize() function to standardize all stock prices to their starting values, enabling fair comparison of relative performance across different price ranges.
3. Daily Returns Calculations: Built a daily_return() function using nested loops to compute percentage daily returns: ((current_price - previous_price) / previous_price) * 100 for each stock.
4. Visualisation: Developed reusable plotting functions show_plot() and interactive_plot() to create both static matplotlib charts and interactive Plotly visualizations for raw prices, normalized prices, and daily returns.
5. Correlation Analysis: Generated a correlation matrix using .corr() and visualized it with a Seaborn heatmap to identify relationships between stock movements.
6. Distribution Analysis: Created histograms and compiled distribution plots using Plotly's create_distplot() to analyze the statistical properties of daily returns.

## Key implementation decision

### Separate long-run price movement from short-run return behaviour

Normalised prices make relative growth comparable, while daily returns expose short-term volatility. Keeping both views prevents a smooth price chart from hiding the variability experienced day to day.

```python
def normalize(df):
    x = df.copy()
    for stock in x.columns[1:]:
        x[stock] = x[stock] / x[stock][0]
    return x

def daily_return(df):
    out = df.copy()
    for stock in df.columns[1:]:
        for j in range(1, len(df)):
            out[stock][j] = ((df[stock][j] - df[stock][j-1]) / df[stock][j-1]) * 100
        out[stock][0] = 0
    return out
```

<div class="case-comment">
  <span class="case-note-label">Why this matters</span>
  <p>The project is exploratory rather than predictive. Its strongest contribution is showing how the same market can look different depending on whether the analysis is performed on levels, rebased levels or returns.</p>
</div>

## Results & evidence

The figures below are the project evidence I would show first. The full implementation remains available through the GitHub link at the top of the page.

<div class="image-gallery">
<figure>
<img alt="Figure 1: stocks_1" class="gallery-trigger" data-caption="Figure 1: stocks_1" data-full="/images/stocks_1.png" data-gallery="project1" decoding="async" height="701" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/stocks_1-900.webp" srcset="/images/thumbs/stocks_1-480.webp 480w, /images/thumbs/stocks_1-900.webp 900w" width="1014"/>
<figcaption><strong>Figure 1</strong></figcaption>
</figure>
<figure>
<img alt="Figure 2: stocknormal1" class="gallery-trigger" data-caption="Figure 2: stocknormal1" data-full="/images/stocknormal1.png" data-gallery="project1" decoding="async" height="701" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/stocknormal1-900.webp" srcset="/images/thumbs/stocknormal1-480.webp 480w, /images/thumbs/stocknormal1-900.webp 900w" width="996"/>
<figcaption><strong>Figure 2</strong></figcaption>
</figure>
<figure>
<img alt="Figure 3: stocksdata" class="gallery-trigger" data-caption="Figure 3: stocksdata" data-full="/images/stocksdata.png" data-gallery="project1" decoding="async" height="525" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/stocksdata-900.webp" srcset="/images/thumbs/stocksdata-480.webp 480w, /images/thumbs/stocksdata-900.webp 900w" width="629"/>
<figcaption><strong>Figure 3</strong></figcaption>
</figure>
<figure>
<img alt="Figure 4: stocks data normal" class="gallery-trigger" data-caption="Figure 4: stocks data normal" data-full="/images/stockdatan.png" data-gallery="project1" decoding="async" height="525" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/stockdatan-900.webp" srcset="/images/thumbs/stockdatan-480.webp 480w, /images/thumbs/stockdatan-900.webp 900w" width="629"/>
<figcaption><strong>Figure 4</strong></figcaption>
</figure>
<figure>
<img alt="Figure 5: stockdailyr" class="gallery-trigger" data-caption="Figure 5: stockdailyr" data-full="/images/stockdailyr.png" data-gallery="stock-market" decoding="async" height="525" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/stockdailyr-900.webp" srcset="/images/thumbs/stockdailyr-480.webp 480w, /images/thumbs/stockdailyr-900.webp 900w" width="629"/>
<figcaption><strong>Figure 5</strong></figcaption>
</figure>
<figure>
<img alt="Figure 6: stockdataheat" class="gallery-trigger" data-caption="Figure 6: stockdataheat" data-full="/images/stockdataheat.png" data-gallery="stock-market" decoding="async" height="665" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/stockdataheat-900.webp" srcset="/images/thumbs/stockdataheat-480.webp 480w, /images/thumbs/stockdataheat-900.webp 900w" width="764"/>
<figcaption><strong>Figure 6</strong></figcaption>
</figure>
<figure>
<img alt="Figure 7: stockdatahist" class="gallery-trigger" data-caption="Figure 7: stockdatahist" data-full="/images/stockdatahist.png" data-gallery="stock-market" decoding="async" height="836" loading="lazy" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" src="/images/thumbs/stockdatahist-900.webp" srcset="/images/thumbs/stockdatahist-480.webp 480w, /images/thumbs/stockdatahist-900.webp 900w" width="1606"/>
<figcaption><strong>Figure 7</strong></figcaption>
</figure>
</div>

## What challenged me

The daily returns calculation initially produced incorrect values for the first row of each stock. After debugging, the issue was that there's no previous day to calculate a return from for the first entry. This was solved by explicitly setting the first day's return to 0 using df_daily_return[i][0] = 0 after the loop calculation, ensuring accurate percentage calculations for all subsequent days.

## What I learned

- Rebased prices and daily returns answer different questions about the same series.
- Correlation can reveal common movement, but it does not by itself establish why stocks moved together.
- The first observation in a return series has no previous day and needs an explicit convention or missing value.

## What I would improve next

- Vectorise the return calculation with pandas percentage-change operations.
- Separate correlation description from causal interpretation of common market drivers.
- Add rolling volatility and rolling correlation to show how relationships change over time.

<div class="case-end-note">
  <strong>Full implementation:</strong> use the GitHub link in the project header for the complete notebook/code rather than expanding the case study into a full source listing.
</div>
