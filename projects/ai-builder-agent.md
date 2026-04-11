---
title: "ai builder agent"
date: 2024-08-15
layout: project.njk        # directly in _includes/
summary: "an agentic architect to build structures in a game"
cover: /assets/images/Agentic-AI-Builder.png
tech:
  - agentic ai
  - langgraph
  - python
  - minetest
permalink: /projects/ai-builder-agent/
---

# 🏰 minetest builder agent

ai-powered voxel architect that uses llms to plan and build structures (houses, castles, gardens, and more) inside minetest

# 🚀 what is this?

this project is an autonomous builder agent that:

- 🧠 uses llms to plan construction goals into step-by-step tasks.
- 🏗️ translates plans into tool calls that place blocks, build floors, raise walls, and decorate.
- 🎮 connects directly with a minetest server to execute builds in real time.
- 🔄 follows an agentic workflow (planning → execution → summarization → refinement).

with a single prompt like “build a 3x3 stone house with a wooden roof and a garden”, the agent generates a structured plan, places voxel blocks, and constructs the build autonomously.
