---
title: "Global Population Trends Exploration"
description: "This project used World Bank development indicators to explore trends in population growth, urbanisation, and fertility rates across continents and income groups. The objective was to uncover insights about global development patterns over time using Python."
category: "Data Analysis"
technologies: ["Python", "Pandas", "Data Visualisation", "World Bank Data"]
featured: false
visual: "grid"
github: "https://github.com/tendai-codes/Data-Analysis/tree/main/world-bank-data-exploration"
---



<p>
								This project used World Bank development indicators to explore trends in population growth, urbanisation, and fertility rates across continents and income groups. The objective was to uncover insights about global development patterns over time using Python.
							</p>
<h4>💻 <strong>Tech Stack:</strong></h4>
<ul>
<li><strong>Python</strong> for data handling and exploration</li>
<li><strong>Pandas</strong> for data manipulation</li>
<li><strong>Matplotlib</strong> for visualisations</li>
</ul>
<h4>🧪 <strong>Data Pipeline:</strong></h4>
<ul>
<li><strong>Load &amp; inspect data:</strong> Loaded the dataset using <code>pd.read_csv()</code> and inspected structure with <code>.info()</code> and <code>.head()</code> to understand column types and missing data. </li>
<li><strong>Cleaning:</strong> Renamed columns, removed irrelevant rows, and addressed missing values for smoother analysis. </li>
<li><strong>Initial Exploaration:</strong> Examined fertility rates, population growth, and urban population across income levels and continents.</li>
<li><strong>Grouping &amp; Summarisation:</strong> Used <code>groupby()</code> and <code>mean()</code> to aggregate indicators by continent and income level.</li>
<li><strong>Visualisation:</strong> Created scatter plots, line plots, and box plots to reveal relationships between population metrics and economic status.</li>
</ul>
<h4>📊 <strong>Code Snippets &amp; Visualisations:</strong></h4>
<!-- Code Snippet -->
<pre><code class="language-python" data-trim=""># Plot the BirthRate versus Internet Users categorised by Income Group (Figure 1)
vis1 = sns.lmplot(
	data=data,
	x='BirthRate',
	y='InternetUsers',
	fit_reg=False,
	hue='IncomeGroup',
	height=10
)

# Create the dataframe
country_data = pd.DataFrame({
	'CountryName': np.array(Countries_2012_Dataset),
	'CountryCode': np.array(Codes_2012_Dataset),
	'CountryRegion': np.array(Regions_2012_Dataset)
})

# Merge country data to the original dataframe (Table 1)
merged_data = pd.merge(
	left=data,
	right=country_data,
	how='inner',
	on='CountryCode'
)
merged_data.head()

# Create a data frame with the life expectancy
life_exp_data = pd.DataFrame({
	'CountryCode': np.array(Country_Code),
	'LifeExp1960': np.array(Life_Expectancy_At_Birth_1960),
	'LifeExp2013': np.array(Life_Expectancy_At_Birth_2013)
})

# Merge the data frame with the life expectancy
merged_data1 = pd.merge(
	left=merged_data,
	right=life_exp_data,
	how='inner',
	on='CountryCode'
)

# Explore the dataset (Table 2)
merged_data1.head()

# Plot the BirthRate versus LifeExpectancy categorised by Country Region in 1960 (Figure 3)
vis3 = sns.lmplot(
	data=merged_data1,
	x='BirthRate',
	y='LifeExp1960',
	fit_reg=False,
	hue='CountryRegion',
	height=10
)

# Plot the BirthRate versus LifeExpectancy categorised by Country Region in 2013 (Figure 4)
vis4 = sns.lmplot(
	data=merged_data1,
	x='BirthRate',
	y='LifeExp2013',
	fit_reg=False,
	hue='CountryRegion',
	height=10
)

						</code></pre>
<div class="image-gallery">
<figure>
<img alt="Table 1: Merged DF" class="gallery-trigger" data-caption="Table 1: Merged DF" data-gallery="world-bank" decoding="async" height="410" loading="lazy" width="1906"/ src="/images/thumbs/world_dfmerge-900.webp" srcset="/images/thumbs/world_dfmerge-480.webp 480w, /images/thumbs/world_dfmerge-900.webp 900w" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" data-full="/images/world_dfmerge.png">
<figcaption><strong>Table 1</strong> Merged DF</figcaption>
</figure>
<figure>
<img alt="Table 2: Merged DF 2" class="gallery-trigger" data-caption="Table 2: Merged DF 2" data-gallery="world-bank" decoding="async" height="414" loading="lazy" width="2310"/ src="/images/thumbs/world_dfmerge2-900.webp" srcset="/images/thumbs/world_dfmerge2-480.webp 480w, /images/thumbs/world_dfmerge2-900.webp 900w" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" data-full="/images/world_dfmerge2.png">
<figcaption><strong>Table 2</strong> Merged DF 2</figcaption>
</figure>
<figure>
<img alt="Figure 1: BirthRate versus Internet Users categorised by Income Group" class="gallery-trigger" data-caption="Figure 1: BirthRate versus Internet Users categorised by Income Group" data-gallery="world-bank" decoding="async" height="989" loading="lazy" width="1183"/ src="/images/thumbs/world_birthintIG-900.webp" srcset="/images/thumbs/world_birthintIG-480.webp 480w, /images/thumbs/world_birthintIG-900.webp 900w" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" data-full="/images/world_birthintIG.png">
<figcaption><strong>Figure 1</strong> BirthRate versus Internet Users categorised by Income Group</figcaption>
</figure>
<figure>
<img alt="Figure 2: BirthRate versus Internet Users categorised by Country Region" class="gallery-trigger" data-caption="Figure 2: BirthRate versus Internet Users categorised by Country Region" data-gallery="world-bank" decoding="async" height="989" loading="lazy" width="1132"/ src="/images/thumbs/world_birthintCR-900.webp" srcset="/images/thumbs/world_birthintCR-480.webp 480w, /images/thumbs/world_birthintCR-900.webp 900w" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" data-full="/images/world_birthintCR.png">
<figcaption><strong>Figure 2</strong> BirthRate versus Internet Users categorised by Country Region</figcaption>
</figure>
<figure>
<img alt="Figure 3: BirthRate versus LifeExpectancy in 1960" class="gallery-trigger" data-caption="Figure 3: BirthRate versus LifeExpectancy in 1960" data-gallery="world-bank" decoding="async" height="990" loading="lazy" width="1133"/ src="/images/thumbs/world_life1960-900.webp" srcset="/images/thumbs/world_life1960-480.webp 480w, /images/thumbs/world_life1960-900.webp 900w" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" data-full="/images/world_life1960.png">
<figcaption><strong>Figure 3</strong> BirthRate versus LifeExpectancy in 1960</figcaption>
</figure>
<figure>
<img alt="Figure 4: BirthRate versus LifeExpectancy in 2013" class="gallery-trigger" data-caption="Figure 4: BirthRate versus LifeExpectancy in 2013" data-gallery="world-bank" decoding="async" height="989" loading="lazy" width="1133"/ src="/images/thumbs/world_life2013-900.webp" srcset="/images/thumbs/world_life2013-480.webp 480w, /images/thumbs/world_life2013-900.webp 900w" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" data-full="/images/world_life2013.png">
<figcaption><strong>Figure 4</strong> BirthRate versus LifeExpectancy in 2013</figcaption>
</figure>
</div>
<h4>🌟 <strong>Key Insights:</strong></h4>
<ul>
<li>Countries with lower income levels showed higher fertility rates and population growth.</li>
<li>Urban population tends to correlate with income level, especially in developed regions.</li>
<li>Africa stands out with higher fertility rates and population growth compared to other continents.</li>
</ul>
<h4>🧗🏾 <strong>Challenge Faced:</strong></h4>
<p>
								Filtering and reshaping the dataset for multi-variable analysis was complex due to inconsistent column names and missing data. I solved this by methodically renaming columns and using <code>.dropna()</code> to exclude incomplete records while maintaining dataset integrity.
							</p>



