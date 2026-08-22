---
title: "industrial asr terminology correction"
date: 2026-07-14
layout: project.njk        # directly in _includes/
summary: "whisper mangles industrial jargon — fixing it without fine-tuning anything"
tech:
  - speech recognition
  - whisper
  - python
  - gemini
  - phonetics
permalink: /projects/industrial-asr-correction/
repo: https://github.com/SanketJadhav7d3/industrial-asr-terminology-correction
---

# 🎙️ industrial asr with domain-term correction

whisper transcribes ordinary english well and mangles industrial jargon:

> PROFIBUS → *"pro fibers"* · HART → *"heart"* · PROFINET → *"profanet"* · VLAN → *"flan"*

those are exactly the words carrying the meaning. everything around them is already correct.

so: **don't fine-tune.** the acoustic signal is intact and the terms are merely mislabelled, which means they can be recovered from the text — orders of magnitude cheaper than retraining. the model stays frozen and a correction layer maps mangled output back to canonical terms. there is no training loop in this repo.

## 📏 measuring the right thing

~95% of words in these sentences are ordinary english whisper already gets right, so **wer barely reflects the problem**. a system could destroy every domain term and still post a respectable word error rate.

so the metric is **term error rate** — accuracy on domain vocabulary only. frozen faster-whisper `small`, 750 clips, 3 voices, snr 20/10/5/0 db:

**term error rate (%)** — lower is better

| condition | baseline | phonetic | llm |
|---|---|---|---|
| clean | 20.8 | 2.5 | 1.1 |
| 20 db | 21.1 | 2.2 | 0.4 |
| 10 db | 21.9 | 2.2 | 0.4 |
| 5 db | 24.4 | 3.9 | 1.1 |
| 0 db | 29.7 | 13.6 | 6.8 |
| **all** | **23.6** | **4.9** | **1.9** |

ter drops **5× with phonetic matching and 12× with the llm**.

## 🔍 the number that makes the point

here's wer over the same runs:

| condition | baseline | phonetic | llm |
|---|---|---|---|
| **all** | **10.5** | 12.9 | 11.9 |

**wer gets worse.** 10.5 → 12.9. by the standard asr metric, both correction strategies made the system *worse*, while the terms that actually carry the meaning went from 23.6% wrong to 1.9%.

that gap is the whole argument. picking wer here would have led you to reject a change that fixed the problem, because wer weights "the" and "PROFIsafe" identically and the corrections introduce minor casing and punctuation churn. **the metric you choose decides what you're allowed to see.**

## ⚖️ two strategies

**phonetic** — double metaphone over the transcript. deterministic, explainable, no api call. blind to context, so it trips on true homophones: a genuinely spoken "heart" becomes `HART`.

**llm** — retrieves candidate terms and asks gemini to restore *only those*, changing nothing else. across all 750 clips it introduced **0 hallucinated substitutions** — zero terms outside the allowed candidate list. that was counted separately rather than assumed, because "the llm rewrote something it shouldn't have" is the obvious failure mode of this design.

the llm wins on accuracy; phonetic wins on cost, latency, and auditability. for a safety-adjacent domain that tradeoff isn't obvious.

## 🔁 the pipeline

```
00_download_noise  →  esc-50 noise (or synthetic fallback)
01_synthesize      →  sentences → speech, piper, 3 voices
02_mix_noise       →  mix at set snrs
03_transcribe      →  whisper baseline + harvest term errors
04_correct         →  phonetic + llm
05_evaluate        →  wer/ter tables
```

the 80-term database carries a german translation per term, and its `common_asr_errors` were **extended with errors actually observed in the baseline run** — harvested empirically by `--update-db`, not invented at the desk.

## ⚠️ limitations

audio is synthetic tts, not real speech, so the absolute rates are optimistic — the wer-vs-ter *contrast* is the finding, not the numbers. the term set is small and profinet-centric, and phonetic matching stays context-blind.

next: a librispeech clean-speech control, whisper prompt-biasing as a third strategy, and a hand-annotated real-audio set.
