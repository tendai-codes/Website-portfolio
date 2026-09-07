---
title: "Box Office Data Analysis"
description: "This project explored publicly available data on top-grossing US films to identify patterns across genres, studios, and release schedules. I used R and ggplot2 for data exploration and visualisation."
category: "Data Analysis"
technologies: ["R", "ggplot2", "EDA", "Data Visualisation"]
featured: false
visual: "grid"
github: "https://github.com/tendai-codes/Data-Analysis/tree/main/box-office-analysis"
---



<p>
							This project explored publicly available data on top-grossing US films to identify patterns across genres, studios, and release schedules. I used <strong>R</strong> and <strong>ggplot2</strong> for data exploration and visualisation.
						</p>
<h3>💻 <strong>Tech Stack:</strong></h3>
<ul>
<li><strong>R</strong> for data manipulation and visualisation</li>
<li><strong>ggplot2</strong> for creating custom, layered visual insights</li>
</ul>
<h3>🧪 <strong>Data Pipeline:</strong></h3>
<ul>
<li><strong>Import &amp; inspect data:</strong> Used <code>read.csv()</code>, <code>summary()</code>, and <code>str()</code></li>
<li><strong>Initial exploration:</strong> Identified no Monday releases using a bar plot of <code>Day.of.Week</code></li>
<li><strong>Filtering for significance:</strong> Narrowed to key genres and major studios</li>
<li><strong>Visualisation:</strong> Created jitter + box plots comparing domestic gross</li>
<li><strong>Aesthetics:</strong> Tuned themes for clarity and presentation</li>
</ul>
<h3>📊 <strong>Code Snippets &amp; Visualisations:</strong></h3>
<!-- Code Snippet -->
<pre><code class="language-r" data-trim=""># No movies are ever released on a Monday. (Figure 1)
ggplot(data = mov, aes(x = Day.of.Week)) + 
geom_bar()

# Filter dataset for desired genres:
filt &lt;- (mov$Genre == "action") | 
		(mov$Genre == "adventure") | 
		(mov$Genre == "animation") | 
		(mov$Genre == "comedy") | 
		(mov$Genre == "drama")

# Filter dataset for desired studios:
filt2 &lt;- (mov$Studio == "Buena Vista Studios") | 
		(mov$Studio == "WB") | 
		(mov$Studio == "Fox") | 
		(mov$Studio == "Universal") | 
		(mov$Studio == "Sony") | 
		(mov$Studio == "Paramount Pictures")

# Apply filters
mov2 &lt;- mov[filt &amp; filt2, ]

# Prepare the plot's data and aes layers (Figure 2)
p &lt;- ggplot(data = mov2, aes(x = Genre, y = Gross...US))

q &lt;- p +
geom_jitter(aes(size = Budget...mill., colour = Studio)) +
geom_boxplot(alpha = 0.7, outlier.colour = NA)

# Non-data info
q &lt;- q +
xlab("Genre") + 
ylab("Gross % US") + 
ggtitle("Domestic Gross % by Genre")

# Theme
q &lt;- q +
theme(
	text = element_text(family = "Times New Roman"),
	axis.title.x = element_text(colour = "Blue", size = 30),
	axis.title.y = element_text(colour = "Blue", size = 30),
	axis.text.x = element_text(size = 20),
	axis.text.y = element_text(size = 20),
	plot.title = element_text(colour = "Black", size = 40),
	legend.title = element_text(size = 20),
	legend.text = element_text(size = 12)
)

						</code></pre>
<!-- Visualisations -->
<div class="image-gallery">
<figure>
<img alt="Figure 1: No releases on Mondays" class="gallery-trigger" data-caption="Figure 1: No releases on Mondays" data-gallery="box-analysis" decoding="async" height="840" loading="lazy" width="840"/ src="/images/thumbs/box_office-900.webp" srcset="/images/thumbs/box_office-480.webp 480w, /images/thumbs/box_office-900.webp 900w" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" data-full="/images/box_office.png">
<figcaption><strong>Figure 1</strong> No releases on Mondays</figcaption>
</figure>
<figure>
<img alt="Figure 2: Domestic gross by genre" class="gallery-trigger" data-caption="Figure 2: Domestic gross by genre" data-gallery="box-analysis" decoding="async" height="840" loading="lazy" width="840"/ src="/images/thumbs/box_genre-900.webp" srcset="/images/thumbs/box_genre-480.webp 480w, /images/thumbs/box_genre-900.webp 900w" sizes="(max-width: 640px) calc(100vw - 60px), (min-width: 1181px) 30vw, 46vw" data-full="/images/box_genre.png">
<figcaption><strong>Figure 2</strong> Domestic gross by genre</figcaption>
</figure>
</div>
<h3>🌟 <strong>Key Insights:</strong></h3>
<p>
								Profitable genres are concentrated among a few studios. Monday releases are avoided — possibly a scheduling strategy.
							</p>
<h3>🧗🏾 <strong>Challenge Faced:</strong></h3>
<p>
								Overlapping outliers and jitter points in ggplot2 caused clutter. I resolved this with <code>outlier.colour = NA</code> and <code>alpha</code> blending.
							</p>



