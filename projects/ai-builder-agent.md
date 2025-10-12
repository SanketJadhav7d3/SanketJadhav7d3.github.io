---
title: "AI Builder Agent"
date: 2024-08-15
layout: project.njk        # directly in _includes/
summary: "An agentic architect to build structures in a game"
cover: /assets/images/Agentic-AI-Builder.png
tech:
  - Agentic AI
  - LangGraph
  - Python
  - Minetest
permalink: /projects/ai-builder-agent/
---

# 🏰 Minetest Builder Agent


AI-powered voxel architect that uses LLMs to plan and build structures (houses, castles, gardens, and more) inside Minetest

# 🚀 What is this?

This project is an autonomous builder agent that:

- 🧠 Uses LLMs to plan construction goals into step-by-step tasks.
- 🏗️ Translates plans into tool calls that place blocks, build floors, raise walls, and decorate.
- 🎮 Connects directly with a Minetest server to execute builds in real time.
- 🔄 Follows an agentic workflow (planning → execution → summarization → refinement).

With a single prompt like “Build a 3x3 stone house with a wooden roof and a garden”, the agent generates a structured plan, places voxel blocks, and constructs the build autonomously.
