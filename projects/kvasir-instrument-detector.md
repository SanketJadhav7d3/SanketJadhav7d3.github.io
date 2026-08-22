---
title: "surgical instrument detector"
date: 2026-07-10
layout: project.njk        # directly in _includes/
summary: "yolo26n on endoscopic frames, plus a robustness study of what breaks it"
cover: https://raw.githubusercontent.com/SanketJadhav7d3/Kvasir-Instrument-Detector/main/results/degradation_samples.png
tech:
  - computer vision
  - yolo
  - pytorch
  - python
  - onnx
permalink: /projects/kvasir-instrument-detector/
repo: https://github.com/SanketJadhav7d3/Kvasir-Instrument-Detector
---

# 🔬 surgical instrument detection & robustness study

fine-tuned **yolo26n** to detect surgical instruments in real endoscopic frames (kvasir-instrument), then ran a **simulated robustness study** over zoom and focus — because a detector that scores well on clean validation data tells you almost nothing about what happens in an operating room.

**baseline on clean val:** mAP@50 = **0.974**, mAP@50-95 = **0.877**

the model wasn't the deliverable. the study of *how it degrades* was.

## 📉 what actually breaks it

perturbations hit the **val set only**, one dataset per condition. photometric changes leave ground-truth boxes alone; zoom center-crops and resizes, so gt boxes are transformed and off-frame boxes dropped — with `z=1.0` asserted as an exact passthrough, so the harness can prove it isn't silently corrupting labels.

| axis | mild | strong | takeaway |
|---|---|---|---|
| **zoom** | 1.5× → 0.924 | **2.0× → 0.662** | hardest axis; sharp fall-off past 1.5× |
| **blur (defocus)** | σ=2 → 0.961 | σ=6 → 0.925 | graceful |
| **brightness** | 0.6× → 0.971 | 1.4× → 0.971 | negligible |

## 🎯 the finding the headline number hides

mAP@50 alone makes zoom look survivable until 2×. the stricter metric says otherwise:

| zoom | mAP@50 | mAP@50-95 |
|---|---|---|
| 1.0× | 0.973 | 0.875 |
| 1.25× | 0.966 | **0.716** |
| 1.5× | 0.924 | **0.571** |
| 2.0× | 0.662 | 0.453 |

at 1.25× zoom, mAP@50 has barely moved — but mAP@50-95 has already fallen **18 points**. the model still *finds* the instrument; it stops localizing it precisely.

that distinction matters for anything downstream that consumes the box rather than the class. a tracker or a measurement built on those coordinates degrades long before the detection metric admits there's a problem.

blur shows the same pattern more gently — mAP@50 holds at 0.925 out to σ=6 while mAP@50-95 slides 0.877 → 0.728.

![degradation samples](https://raw.githubusercontent.com/SanketJadhav7d3/Kvasir-Instrument-Detector/main/results/degradation_samples.png)

*clean | blur σ=4 | zoom ×2 — predictions with confidence*

| mAP@50 vs blur σ | mAP@50 vs zoom |
|---|---|
| ![blur curve](https://raw.githubusercontent.com/SanketJadhav7d3/Kvasir-Instrument-Detector/main/results/curve_blur.png) | ![zoom curve](https://raw.githubusercontent.com/SanketJadhav7d3/Kvasir-Instrument-Detector/main/results/curve_zoom.png) |

## 🔧 the pipeline

the emphasis was reproducibility over benchmark-chasing — every stage is a make target, and the environment is locked:

```
make all   # data -> train -> perturb -> eval -> viz -> bench
```

| stage | what it does |
|---|---|
| `convert.py` | kvasir json → yolo txt + data.yaml, split-aware |
| `check_labels.py` | label sanity grid — catches conversion bugs before training |
| `perturb.py` | generates zoom/focus/brightness eval sets from `perturbations.yaml` |
| `evaluate.py` | per-condition validation → `metrics.csv` |
| `benchmark.py` | cpu vs gpu latency → `latency.csv` |

`uv.lock` pins the environment and `SEED=42` fixes the run, so the numbers above regenerate rather than being screenshots of a run nobody can reproduce.

## ⚡ inference

single-image at imgsz 640, **cpu: 66.2 ms mean, 15.1 fps**. an onnx export (~9.4 mb) is produced alongside the torch weights.

only the cpu row is measured — there was no local cuda gpu available. the gpu row is produced automatically when the benchmark runs on a cuda host, rather than being estimated.

## ⚠️ limitations

stated rather than papered over: the dataset is single-frame, so there are **no tracking or temporal metrics**; the perturbations are synthetic approximations of operating-room optics, not clinical realism; and it's a single class.

training early-stopped at 95/100 epochs (patience=25) on a colab t4.
