# Tendai N Sibanda — Data Science Portfolio

This repository contains my personal data science portfolio website. It showcases projects across R, Python, machine learning, deep learning, and applied mathematics.

The site is built with static HTML, CSS, and JavaScript. Project write-ups are stored as separate HTML fragments under `project-content/` and loaded dynamically when selected, keeping the homepage lighter and easier to navigate.

## Key Features

* Static portfolio website with no build step required
* Dynamic project loading using JavaScript
* Project content organised by category
* Original images preserved with lazy loading
* Applied Mathematics section added for modelling-focused projects
* Designed for deployment on Netlify

## Project Areas

* **Applied Mathematics:** World Bank macroeconomic downturn prediction and graph cross-correction simulation
* **Machine Learning:** classification, regression, clustering, and model comparison projects
* **Deep Learning:** LSTM, ANN, and image classification projects
* **Python and R:** data analysis, financial modelling, and exploratory workflows

## Run Locally

Use a local server so dynamic project loading works correctly:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```


```text
Build command: leave blank
Publish directory: .
```

## Credits

Template based on **Dimension by HTML5 UP**.
Custom content, project structure, and modifications by Tendai N Sibanda.
