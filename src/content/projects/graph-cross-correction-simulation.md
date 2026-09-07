---
title: "Graph Cross-Correction Simulation"
description: "A graph-based proof-of-concept simulation that translates a biological cross-correction hypothesis into diffusion, decay, exposure and rescue-threshold dynamics."
category: "Research & Modelling"
technologies: ["Python", "NumPy", "Matplotlib", "Graph modelling"]
featured: true
visual: "network"
github: "https://github.com/tendai-codes/graph-cross-correction-sim"
publication: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11018779/"
question: "If only a subset of nuclei are corrected, can locally transported corrective signal plausibly accumulate enough to rescue neighbouring nuclei under simplified assumptions?"
focus: ["Biological modelling", "Graph diffusion", "Simulation"]
outcome: "A staged simulator that turns the biological hypothesis into a graph-diffusion experiment and sensitivity-testing framework."
keyChallenge: ""
---
## The problem

This project is a computational extension of my master's thesis research. It uses simulation and graph-based modelling to test whether a biological hypothesis around molecular cross-correction is plausible under simplified conditions. The central question is: if only a subset of nuclei in a multinucleated muscle fibre are corrected, could locally transported signal accumulate enough to rescue neighbouring nuclei? The model treats this as a structured numerical experiment in signal production, diffusion, decay, and rescue thresholds.

<div class="case-question">
  <span class="case-note-label">Question</span>
  <p>If only a subset of nuclei are corrected, can locally transported corrective signal plausibly accumulate enough to rescue neighbouring nuclei under simplified assumptions?</p>
</div>

<div class="case-note case-note-publication">
  <span class="case-note-label">Research context</span>
  <p>This simulation is conceptually linked to the co-authored publication <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11018779/" target="_blank" rel="noopener noreferrer"><em>Cell-mediated exon skipping normalizes dystrophin expression and muscle function in a new mouse model of Duchenne Muscular Dystrophy</em></a>. The publication provides the biological motivation; the simulator is a separate proof-of-concept modelling exercise.</p>
</div>

## Approach

Rather than presenting the project as a notebook dump, this case study focuses on the decisions that shaped the analysis.

1. Start with a naive line simulation to make the biological idea executable.
2. Replace manual local averaging with graph-Laplacian diffusion.
3. Introduce geometry-based connectivity so transport depends on proximity.
4. Vary source fraction, diffusion, decay and rescue threshold assumptions.
5. Track cumulative exposure so rescue can depend on sustained signal rather than an instantaneous value.

## Key implementation decision

### Represent local transport with the graph Laplacian

The graph makes spatial neighbourhoods explicit, while the Laplacian provides a compact operator for local signal exchange. Rescue is then defined separately as a threshold on accumulated exposure.

```python
for t in range(num_steps):
    diffusion = -alpha * (L @ u)
    decay = -beta * u
    source = q

    u = u + dt * (diffusion + decay + source)
    exposure = exposure + u * dt
    rescued = exposure >= rescue_threshold
```

<div class="case-comment">
  <span class="case-note-label">Why this matters</span>
  <p>The value of the project is not that it proves a biological mechanism. It forces a qualitative thesis hypothesis into explicit computational assumptions that can be inspected, varied and eventually calibrated against experimental evidence.</p>
</div>

## Results & evidence

The figures below are the project evidence I would show first. The full implementation remains available through the GitHub link at the top of the page.

<div class="concept-visual">
<figure>
<svg aria-label="Graph diffusion and rescue threshold visualisation" role="img" viewbox="0 0 760 360" xmlns="http://www.w3.org/2000/svg">
<rect fill="rgba(255,255,255,0.04)" height="360" rx="20" width="760"></rect>
<g fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="3">
<path d="M110 180 L210 105 L330 150 L455 88 L590 185 L440 265 L285 235 L110 180"></path>
<path d="M210 105 L285 235 M330 150 L440 265 M330 150 L590 185 M455 88 L590 185"></path>
</g>
<g stroke="rgba(255,255,255,0.7)" stroke-width="2">
<circle cx="110" cy="180" fill="rgba(116,220,190,0.8)" r="21"></circle>
<circle cx="210" cy="105" fill="rgba(216,181,109,0.8)" r="17"></circle>
<circle cx="330" cy="150" fill="rgba(116,220,190,0.8)" r="17"></circle>
<circle cx="455" cy="88" fill="rgba(255,255,255,0.18)" r="15"></circle>
<circle cx="590" cy="185" fill="rgba(255,255,255,0.18)" r="15"></circle>
<circle cx="440" cy="265" fill="rgba(216,181,109,0.8)" r="17"></circle>
<circle cx="285" cy="235" fill="rgba(255,255,255,0.18)" r="15"></circle>
</g>
<g fill="white" font-family="Arial, sans-serif">
<text font-size="19" x="44" y="52">Corrected source nodes → graph diffusion → rescue threshold</text>
<text font-size="14" opacity="0.8" x="44" y="315">Green: corrected/source · Gold: rescued/exposed · Grey: below threshold</text>
</g>
</svg>
<figcaption><strong>Conceptual visualisation:</strong> Corrected nuclei produce signal; neighbouring nuclei receive transported signal through graph connectivity.</figcaption>
</figure>
</div>

## What challenged me

The original project did not record a separate challenge note.

## What I learned

- A biological hypothesis becomes easier to challenge once every source, transport, decay and rescue assumption is explicit in code.
- Spatial placement matters alongside the fraction of corrected nuclei because transport occurs through the graph structure.
- The simulator is useful for sensitivity reasoning, but it is not a calibrated biological prediction.

## What I would improve next

- Calibrate diffusion, decay and rescue parameters against experimentally grounded measurements when suitable data become available.
- Replace simplified geometry with spatial structures closer to real multinucleated fibres.
- Introduce stochastic expression and uncertainty so sensitivity results are not tied only to deterministic parameter choices.

<div class="case-end-note">
  <strong>Full implementation:</strong> use the GitHub link in the project header for the complete notebook/code rather than expanding the case study into a full source listing.
</div>
