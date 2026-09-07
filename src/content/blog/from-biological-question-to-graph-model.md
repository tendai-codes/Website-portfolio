---
title: "From biological question to graph model"
description: "Notes on translating a molecular cross-correction hypothesis into a simplified computational experiment."
date: 2026-09-07
category: "Research Notes"
tags: ["Bioinformatics", "Graph Modelling", "Simulation"]
relatedProject: "graph-cross-correction-simulation"
draft: false
---

<p class="lede">A biological question can be compelling long before it is computationally precise. One useful role of modelling is to expose the assumptions hiding between those two states.</p>
<h2>The question</h2>
<p>My graph cross-correction project starts from a simplified question: if only some nuclei in a multinucleated muscle fibre are genetically corrected, could a locally transported corrective signal accumulate enough to affect neighbouring nuclei?</p>
<h2>Turning biology into structure</h2>
<p>The model represents nuclei as nodes and local transport as edges. Corrected nuclei act as sources. Diffusion, decay and a rescue threshold turn the qualitative hypothesis into quantities that can be varied and tested.</p>
<pre><code class="language-python">for t in range(num_steps):
    diffusion = -alpha * (L @ u)
    decay = -beta * u
    u = u + dt * (diffusion + decay + source)
    exposure += u * dt
    rescued = exposure >= rescue_threshold</code></pre>
<h2>What the simulation is — and is not</h2>
<p>The value of the exercise is not to claim a calibrated biological result. The current model deliberately simplifies fibre geometry, signal chemistry, stochastic expression and tissue-level variation. Its value is in making assumptions explicit and creating a framework for sensitivity testing.</p>
<h2>What I am taking forward</h2>
<p>The interesting part for me is the translation itself: biological observation → mathematical abstraction → executable model → sensitivity analysis. That reasoning chain is increasingly central to how I want to approach computational genomics.</p>
