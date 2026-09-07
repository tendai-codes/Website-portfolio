---
title: "Stock Market Analysis"
description: "This project analyzed historical stock price data for major companies and the S&P 500 index to understand price movements, correlations, and daily return patterns. I built an interactive dashboard using Python's data science stack to visualize both raw and…"
category: "Data Analysis"
technologies: ["Python", "Pandas", "Data Visualisation", "Finance"]
featured: false
visual: "grid"
github: "https://github.com/tendai-codes/Data-Analysis/tree/main/stocks-data-analysis-and-visualization"
---



<p>
							This project analyzed historical stock price data for major companies and the S&amp;P 500 index to understand price movements, correlations, and daily return patterns. I built an interactive dashboard using Python's data science stack to visualize both raw and normalized stock performance alongside risk metrics.
						</p>
<h4>💻 <strong>Tech Stack:</strong></h4>
<ul>
<li><strong>Python</strong> for data manipulation and analysis</li>
<li><strong>Pandas</strong> for computations</li>
<li><strong>Matplotlib &amp; Seaborn</strong> for static visualisations</li>
<li><strong>Plotly</strong> for interactive charts and dashboards</li>
<li><strong>NumPy &amp; SciPy</strong> for statistical computations</li>
</ul>
<h4>🧪 <strong>Data Pipeline:</strong></h4>
<ul>
<li><strong>Explore data:</strong> Loaded stock price data using <code>pd.read_csv()</code> and explored the dataset structure with <code>.info()</code>, <code>.describe()</code>, and <code>.head()</code> to understand the time series format and identify key stocks. Checked for missing values using <code>.isnull().sum()</code> and calculated basic statistics like mean returns and standard deviation to assess data completeness and variability.</li>
<li><strong>Price Normalisation:</strong> Created a custom <code>normalize()</code> function to standardize all stock prices to their starting values, enabling fair comparison of relative performance across different price ranges. </li>
<li><strong>Daily Returns Calculations:</strong> Built a <code>daily_return()</code> function using nested loops to compute percentage daily returns: <code>((current_price - previous_price) / previous_price) * 100</code> for each stock.</li>
<li><strong>Visualisation:</strong> Developed reusable plotting functions <code>show_plot()</code> and <code>interactive_plot()</code> to create both static matplotlib charts and interactive Plotly visualizations for raw prices, normalized prices, and daily returns.</li>
<li><strong>Correlation Analysis:</strong> Generated a correlation matrix using <code>.corr()</code> and visualized it with a Seaborn heatmap to identify relationships between stock movements.</li>
<li><strong>Distribution Analysis:</strong> Created histograms and compiled distribution plots using Plotly's <code>create_distplot()</code> to analyze the statistical properties of daily returns.</li>
</ul>
<h4>📊 <strong>Code Snippets &amp; Visualisations:</strong></h4>
<!-- Code Snippet -->

```python
def show_plot(df, title):
    df.plot(x='Date', figsize=(12, 8), linewidth=3, title=title)
    plt.xlabel('Date')
    plt.ylabel('Price')
    plt.grid()
    plt.show()

# Plot the data (Figure 1)
show_plot(stocks_df, 'STOCKS DATA')

# Normalized Stock Data (Figure 2)
def normalize(df):
    x = df.copy()
    for i in x.columns[1:]:
        x[i] = x[i] / x[i][0]
    return x

normalize(stocks_df)

# Create Interactive chart of Stock Data (Figure 3)
def interactive_plot(df, title):
    fig = px.line(title=title)
    for i in df.columns[1:]:
        fig.add_scatter(x=df['Date'], y=df[i], name=i)
    fig.update_layout(
        xaxis_title="Date",
        yaxis_title="Price"
    )
    fig.show()

interactive_plot(stocks_df, 'STOCKS DATA')

# Create Interactive chart of Normalized Stock Data (Figure 4)
interactive_plot(normalize(stocks_df), 'STOCKS DATA')

# Calculate stocks daily returns
def daily_return(df):
    df_daily_return = df.copy()
    for i in df.columns[1:]:  # loop through columns
        for j in range(1, len(df)):  # loop through rows
            df_daily_return[i][j] = ((df[i][j] - df[i][j - 1]) / df[i][j - 1]) * 100
        df_daily_return[i][0] = 0
    return df_daily_return

# Get the daily returns (Figure 5)
stocks_daily_return = daily_return(stocks_df)
stocks_daily_return

interactive_plot(stocks_daily_return, 'Stocks Daily returns')

# Daily Return Correlation
cm = stocks_daily_return.drop(columns=['Date']).corr()
cm

# Heatmap showing correlations (Figure 6)
plt.figure(figsize=(10, 8))
sns.heatmap(cm, annot=True, cmap='RdYlGn')  # `annot=True` displays values on the heatmap
plt.show()

# Histogram of daily returns (Figure 7)
stocks_daily_return.hist(bins=50, figsize=(20, 10))
plt.show()
```

<!-- Visualisations -->
<div class="image-gallery">
<figure>
<img alt="Figure 1: stocks_1" class="gallery-trigger" data-caption="Figure 1: stocks_1" data-gallery="project1" decoding="async" height="701" loading="lazy" width="1014" src="/images/thumbs/stocks_1-900.webp" srcset="/images/thumbs/stocks_1-480.webp 480w, /images/thumbs/stocks_1-900.webp 900w" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" data-full="/images/stocks_1.png">
<figcaption><strong>Figure 1</strong></figcaption>
</figure>
<figure>
<img alt="Figure 2: stocknormal1" class="gallery-trigger" data-caption="Figure 2: stocknormal1" data-gallery="project1" decoding="async" height="701" loading="lazy" width="996" src="/images/thumbs/stocknormal1-900.webp" srcset="/images/thumbs/stocknormal1-480.webp 480w, /images/thumbs/stocknormal1-900.webp 900w" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" data-full="/images/stocknormal1.png">
<figcaption><strong>Figure 2</strong></figcaption>
</figure>
<figure>
<img alt="Figure 3: stocksdata" class="gallery-trigger" data-caption="Figure 3: stocksdata" data-gallery="project1" decoding="async" height="525" loading="lazy" width="629" src="/images/thumbs/stocksdata-900.webp" srcset="/images/thumbs/stocksdata-480.webp 480w, /images/thumbs/stocksdata-900.webp 900w" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" data-full="/images/stocksdata.png">
<figcaption><strong>Figure 3</strong></figcaption>
</figure>
<figure>
<img alt="Figure 4: stocks data normal" class="gallery-trigger" data-caption="Figure 4: stocks data normal" data-gallery="project1" decoding="async" height="525" loading="lazy" width="629" src="/images/thumbs/stockdatan-900.webp" srcset="/images/thumbs/stockdatan-480.webp 480w, /images/thumbs/stockdatan-900.webp 900w" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" data-full="/images/stockdatan.png">
<figcaption><strong>Figure 4</strong></figcaption>
</figure>
<figure>
<img alt="Figure 5: stockdailyr" class="gallery-trigger" data-caption="Figure 5: stockdailyr" data-gallery="stock-market" decoding="async" height="525" loading="lazy" width="629" src="/images/thumbs/stockdailyr-900.webp" srcset="/images/thumbs/stockdailyr-480.webp 480w, /images/thumbs/stockdailyr-900.webp 900w" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" data-full="/images/stockdailyr.png">
<figcaption><strong>Figure 5</strong></figcaption>
</figure>
<figure>
<img alt="Figure 6: stockdataheat" class="gallery-trigger" data-caption="Figure 6: stockdataheat" data-gallery="stock-market" decoding="async" height="665" loading="lazy" width="764" src="/images/thumbs/stockdataheat-900.webp" srcset="/images/thumbs/stockdataheat-480.webp 480w, /images/thumbs/stockdataheat-900.webp 900w" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" data-full="/images/stockdataheat.png">
<figcaption><strong>Figure 6</strong></figcaption>
</figure>
<figure>
<img alt="Figure 7: stockdatahist" class="gallery-trigger" data-caption="Figure 7: stockdatahist" data-gallery="stock-market" decoding="async" height="836" loading="lazy" width="1606" src="/images/thumbs/stockdatahist-900.webp" srcset="/images/thumbs/stockdatahist-480.webp 480w, /images/thumbs/stockdatahist-900.webp 900w" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" data-full="/images/stockdatahist.png">
<figcaption><strong>Figure 7</strong></figcaption>
</figure>
</div>
<h4>🌟 <strong>Key Insights:</strong></h4>
<ul>
<li>Stock movements are highly correlated across companies, indicating that broader market forces often drive price trends rather than company-specific factors.</li>
<li>Daily returns fluctuate far more than overall price trends suggest, revealing short-term volatility that long-term averages tend to conceal.</li>
<li>Volatility patterns differ by stock, with some showing consistently wider swings in daily returns — signalling higher risk and potential reward compared to more stable peers.</li>
</ul>
<h4>🧗🏾 <strong>Challenge Faced:</strong></h4>
<p>
								The daily returns calculation initially produced incorrect values for the first row of each stock. After debugging, the issue was that there's no previous day to calculate a return from for the first entry. This was solved by explicitly setting the first day's return to 0 using <code>df_daily_return[i][0] = 0</code> after the loop calculation, ensuring accurate percentage calculations for all subsequent days.
							</p>



