---
title: "hybrid rag for sec filings"
date: 2026-09-02
layout: project.njk        # directly in _includes/
summary: "dense retrieval alone misses 45% of the answers — here's what fixes it"
tech:
  - rag
  - python
  - chroma
  - bm25
  - gemini
  - cross-encoder
permalink: /projects/hybrid-rag/
repo: https://github.com/SanketJadhav7d3/Hybrid-RAG
---

# 📑 hybrid rag for sec filings

a question-answering system over 10-K, 10-Q and 20-F filings from eight tech and semiconductor companies — meta, google, amazon, microsoft, nvidia, tsmc, broadcom and intel — covering roughly the last four years.

the point wasn't to build another rag demo. it was to **measure whether the extra machinery actually earns its place**.

## 📊 does hybrid retrieval actually help?

29 hand-built, keyword-verified queries, scored at `hit@8`:

| | hit rate |
|---|---|
| naive rag — dense only, no filtering, no reranking | 55.2% |
| **hybrid rag** — dense + sparse rrf, ticker filtering, reranking | **79.3%** |
| absolute improvement | +24.1 points |
| relative improvement | +43.8% |

the aggregate number hides the more interesting story, which is **where** the gain comes from:

| category | naive | hybrid |
|---|---|---|
| numeric exact lookup | 67% | 78% |
| conceptual / semantic | 57% | 86% |
| terminology mismatch | 40% | 60% |
| hybrid-rescue cases | 50% | 100% |
| cross-period | 50% | 50% |

two rows are worth pausing on. the **hybrid-rescue** cases — queries designed so that neither dense nor sparse retrieval alone can find the answer — go from a coin flip to perfect. and **cross-period** queries don't move at all: retrieval was never the bottleneck there, so no amount of retrieval engineering fixes them. knowing which of your failures retrieval can't solve is worth as much as the ones it can.

reproduce it with `uv run python src/compare_naive_vs_hybrid.py`.

## 🔍 why one retriever isn't enough

embeddings are good at meaning and bad at exact strings. bm25 is the reverse. a filing question is usually both at once — "what did nvidia say about *supply constraints*" is semantic, but "*data center revenue*, fiscal 2025" is a near-literal string match against a table.

so both indexes run, and **reciprocal rank fusion** merges the two ranked lists without needing the scores to be on a comparable scale — which they aren't. on top of that:

- **ticker-aware metadata filtering** — a question about nvidia should never be answered out of broadcom's 10-K, and without a filter it sometimes was
- **cross-encoder reranking** — rrf gets the right chunk into the top 20; the reranker gets it into the top 5, which is what the generator actually sees

## 🏗 the pipeline

```
edgar download → html parsing → section chunking → dense + sparse indexing
→ hybrid retrieval (rrf + ticker filter + reranker) → gemini generation
```

| stage | script |
|---|---|
| download filings from sec edgar | `src/edgar_client.py` |
| parse html into section-tagged text | `src/parser.py` |
| build the parsed dataset | `src/build_dataset.py` |
| chunk sections into token-bounded pieces | `src/chunker.py` |
| build dense (chroma) + sparse (bm25) indexes | `src/build_index.py` |
| hybrid retriever | `src/retriever.py` |
| answer generation with citations | `src/generator.py` |
| evaluation harness | `src/evaluate.py`, `src/compare_naive_vs_hybrid.py` |

chunking is section-based rather than fixed-window, because a filing already has structure and throwing it away costs you the metadata that makes ticker filtering possible in the first place.

## ⚠️ what it doesn't do well

**intel's filings are significantly under-parsed.** sec html is not one format — it's whatever each filer's software emitted, and intel's rendering defeats the parser badly enough that those documents are excluded from some eval cases rather than quietly polluting the numbers.

**the eval set is 29 queries.** hand-built and keyword-verified, but small. these are directional results, not a benchmark — the honest read is "hybrid retrieval helps a lot on this corpus", not "hybrid retrieval helps by exactly 24.1 points".

## 🛠 running it

```bash
uv sync
cp .env.example .env   # add your GEMINI_API_KEY

uv run python src/edgar_client.py    # download filings
uv run python src/build_dataset.py   # parse into sections
uv run python src/chunker.py         # chunk sections
uv run python src/build_index.py     # build dense + sparse indexes

uv run python src/generator.py "What was NVIDIA's data center revenue in fiscal 2025?"
```
