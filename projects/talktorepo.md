---
title: "talk to repo"
date: 2026-05-12
layout: project.njk        # directly in _includes/
summary: "Structural code intelligence engine"
cover: /assets/projects-cover/talktorepo.png
tech:
  - agentic ai
  - langgraph
  - python
  - treesitter
  - RAG
permalink: /projects/talktorepo/
repo: https://github.com/SanketJadhav7d3/talktorepo
---

# 🔍 TalkToRepo: Structural Code Intelligence Engine


TalkToRepo is a high-performance code intelligence engine designed to bridge the gap between massive codebases and Large Language Models. Unlike standard text splitters that break code at arbitrary line counts, TalkToRepo uses **AST (Abstract Syntax Tree)** parsing to extract logical units, ensuring AI models receive syntactically complete context.

## 🚀 Key Features

*   **🧠 Logic-Preserving RAG**: Uses Tree-Sitter to chunk code by function/class boundaries, significantly improving LLM reasoning over standard RAG.
*   **⚡ Polyglot Performance**: Sub-millisecond parsing of C++, Java, Rust, and TS using a hybrid Python `ast` and C-based Tree-Sitter strategy.
*   **🔗 Graph-Based Analysis**: Automatically maps project-wide dependencies to provide the AI with a structural understanding of the repository.
*   **🛠 Production Tooling**: Designed for low-latency agentic workflows (compatible with LangChain and Gemini).

## 🏗 Technical Architecture

1.  **Ingestion**: Files are filtered and validated via extension mapping.
2.  **Parsing**: 
    *   **Python**: Handled via native `ast` for 100% feature compliance.
    *   **Core Polyglot**: C-bindings for Tree-Sitter provide high-speed extraction for 7+ languages.
3.  **Extraction**: Metadata (line ranges, signatures, imports) is structured for vectorization.
4.  **Semantic Retrieval**: Logical blocks are indexed into a Vector Store for context-aware AI querying.

## Images

<img width="2485" height="1431" alt="image" src="https://github.com/user-attachments/assets/a388af55-cbc4-4bd6-b960-f6bf48118572" />

<img width="2485" height="1431" alt="image" src="https://github.com/user-attachments/assets/8d8fc284-c47d-45e5-85a8-7ed17719ee7c" />

<img width="2485" height="1431" alt="image" src="https://github.com/user-attachments/assets/1a9f4d07-5878-4b90-b585-ec8bf85189f9" />