---
title: "research agent"
date: 2026-08-22
layout: project.njk        # directly in _includes/
summary: "an agentic researcher that scores its own work and loops until it's confident"
tech:
  - agentic ai
  - langgraph
  - python
  - fastapi
  - react
  - plotly
cover: /assets/videos/research-agent.mp4
permalink: /projects/research-agent/
repo: https://github.com/SanketJadhav7d3/Research-Agent
---

# 🔬 research agent

give it a research goal and it plans, picks its own tools, searches, reads sources, **scores its own confidence**, loops back when the findings are thin, and writes a cited report.

the interesting part isn't that it researches. it's that it *knows when it hasn't researched enough*.

## 🧠 the adaptive graph

most agent demos run a fixed pipeline: search → summarize → done. this one has a **fixed outer skeleton with free inner execution** — the sequence of nodes is guaranteed, but the decisions inside `execute` belong to the model.

```
clarify → plan → execute → reflect → visualize → synthesize
                    ↑          ↓
                    └──────────┘
              loops back on low confidence
```

`reflect` doesn't always continue. it scores its own work, and a gate in [`confidence.py`](https://github.com/SanketJadhav7d3/Research-Agent/blob/main/backend/agent/confidence.py) decides what happens next:

- **confidence ≥ 0.75** → write the report
- **below threshold, iterations remain** → back to `execute`, aimed at the specific gaps reflect just identified
- **below threshold, out of iterations** → write the report anyway, but synthesize is told to state the limitations plainly

that last branch matters. an agent that loops forever chasing certainty is worse than one that admits what it couldn't establish.

## 🛠 tools the agent chooses between

- **search** — web retrieval via tavily
- **reader** — pulls and cleans full source documents
- **pdf reader** — handles papers and filings directly
- **financial** — structured market/company data
- **code** — runs python in a sandbox against the evidence it has gathered

the code tool is the one with a real design constraint behind it. it's built **per run** rather than declared at import, because it has to carry that run's evidence with it — tools execute in a thread pool where per-run state doesn't propagate, so a factory closing over the data is the mechanism that actually works.

it also gets far more than the model does: the prompt caps a document at 8k characters, while code can regex a table out of forty thousand.

## 📊 charting after the evidence settles

`visualize` sits deliberately **outside** the research loop. a chart drawn mid-research may be plotting numbers a later round replaces — so charting happens once, after the evidence is settled, and renders through plotly in the frontend.

## 🧪 does the looping actually help?

the point of an eval harness is to be able to be wrong about your own design. looping is disabled by setting `max_iterations=1`, so both arms exercise identical code:

| | 1 iteration | 3 iterations |
|---|---|---|
| citations | 30.2 | **39.0** |
| confidence | 0.82 | 0.80 |
| loops taken | 1.00 | 1.40 |
| duration | 88s | 109s |

looping pulls in meaningfully more sources — about 30% more citations — at the cost of ~25% more wall-clock time. self-reported confidence barely moves, which is itself worth knowing: **the model's confidence score is not a reliable proxy for how well-sourced the answer is.**

with n=5 per arm these are directional, not conclusive. the harness appends to `results.jsonl` and skips pairs already recorded, so the run set grows as free-tier quota allows.

## 🏗 stack

**backend** — fastapi + langgraph, streaming the agent's trace over SSE so the ui shows tool calls, gate decisions, and confidence as they happen rather than after.

**frontend** — react + vite, with `AgentTrace`, `ToolCallCard`, `CodeRunCard`, and `ConfidenceBar` components that make the agent's reasoning legible instead of hiding it behind a spinner.

the whole thing runs with `docker compose up --build`.
