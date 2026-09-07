---
title: "Building a reproducible macroeconomic risk pipeline"
description: "A project note on separating data engineering, feature construction and modelling across Rust and Python."
date: 2026-09-07
category: "Project Notes"
tags: ["Rust", "Python", "Data Engineering", "Machine Learning"]
relatedProject: "macroeconomic-downturn-prediction-using-linear-algebra-and-machine-learning"
draft: false
---

<p class="lede">One of the most useful architectural decisions in a data project is deciding where each kind of work should live.</p>
<h2>Two languages, distinct responsibilities</h2>
<p>In my macroeconomic downturn project, Rust handles CSV ingestion, validation and feature engineering, while Python handles modelling, linear-algebra analysis and the interactive dashboard. The point is not to use two languages for novelty; it is to keep a clear boundary between deterministic preprocessing and exploratory/model-facing work.</p>
<h2>Why the boundary matters</h2>
<p>A reproducible pipeline should make it obvious where a value came from and which transformation produced it. Separating responsibilities makes it easier to test the engineered dataset before modelling begins.</p>
<h2>The larger lesson</h2>
<p>For me, this project sits between data science and software engineering. That intersection is increasingly important in scientific computing too: a model is only as trustworthy as the pipeline that produced its inputs.</p>
