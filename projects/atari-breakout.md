---
title: "ai agent for atari breakout"
date: 2024-08-15
layout: project.njk        # directly in _includes/
summary: "trained an ai to play atari breakout game using python neat."
cover: /assets/images/AI-Plays-Atari.png
tech:
  - neat
  - genetic algorithms
  - pygame
permalink: /projects/atari-breakout/
---

trained an ai to play atari breakout game using python neat.

<video controls autoplay muted loop width="100%">
  <source src="https://github.com/user-attachments/assets/e6ce91d1-92af-4bd5-8259-850f37b9da01" type="video/mp4">
</video>

more about neat algorithm - https://nn.cs.utexas.edu/downloads/papers/stanley.cec02.pdf

this project uses the neat (neuroevolution of augmenting topologies) algorithm to evolve neural network controllers that learn to play a simplified version of atari breakout. pygame provides the game simulation (ball, bricks, paddle), while neat-python drives the evolutionary process. training progress and results are visualized using matplotlib and graphviz.

---

## features

- **game environment**: implemented in pygame with realistic ball physics, brick layouts, and paddle control.
- **neat integration**: uses neat-python to evolve paddle-control neural networks based on fitness from bricks broken.
- **configurable hyperparameters**: neat parameters (population size, mutation rates, species thresholds, network topology) are easily adjusted via `config.txt`.
- **visualization**: generates average/best fitness and speciation plots (`avg_fitness.svg`, `speciation.svg`) to track evolutionary dynamics.
- **modular design**: separate modules for game logic (`ball.py`, `tiles.py`, `player_block.py`) and training/visualization (`main.py`, `visualize.py`).

---

## installation

1. **clone the repository**
   ```bash
   git clone https://github.com/SanketJadhav7d3/AI-plays-Atari-Breakout.git
   cd ai-plays-atari-breakout
   ```

2. **create a virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

*note: ensure your system has pygame, neat-python, matplotlib, and graphviz installed.*

---

## configuration

all neat hyperparameters are specified in `config.txt`. key settings include:

- `pop_size`: number of genomes per generation
- `max_fitness_threshold`: fitness at which training stops
- mutation and crossover probabilities
- network architecture parameters (number of hidden layers, nodes)

edit `config.txt` to experiment with different evolutionary strategies.

---

## usage

### training

run the evolutionary training loop for 40 generations (default):

```bash
python main.py
```

- each genome represents a paddle controller receiving three inputs: paddle x-position, ball x-position, ball y-position.
- actions: move left, move right, or stay.
- fitness: +10 points per brick broken; game ends when the ball falls below the paddle or a high-score is reached.

### visualization

after training, generate performance plots:

```bash
python visualize.py
```

- `avg_fitness.svg`: mean and best fitness over generations.
- `speciation.svg`: species sizes across generations.

you can also render the winning genome’s network topology using graphviz (requires `neat-python`’s visualization helpers).

---

## file structure

```
ai-plays-atari-breakout/
├─ ball.py            # ball sprite & physics logic
├─ tiles.py           # brick grid manager
├─ player_block.py    # paddle sprites & neat genome integration
├─ main.py            # training loop & neat setup
├─ visualize.py       # plotting training statistics
├─ config.txt         # neat-python configuration
├─ avg_fitness.svg    # sample fitness plot
├─ speciation.svg     # sample speciation plot
└─ readme.md          # project documentation
```

trained an ai to play atari breakout game using python neat.

https://github.com/user-attachments/assets/e6ce91d1-92af-4bd5-8259-850f37b9da01

more about neat algorithm - https://nn.cs.utexas.edu/downloads/papers/stanley.cec02.pdf

this project uses the neat (neuroevolution of augmenting topologies) algorithm to evolve neural network controllers that learn to play a simplified version of atari breakout. pygame provides the game simulation (ball, bricks, paddle), while neat-python drives the evolutionary process. training progress and results are visualized using matplotlib and graphviz.

---

## features

- **game environment**: implemented in pygame with realistic ball physics, brick layouts, and paddle control.
- **neat integration**: uses neat-python to evolve paddle-control neural networks based on fitness from bricks broken.
- **configurable hyperparameters**: neat parameters (population size, mutation rates, species thresholds, network topology) are easily adjusted via `config.txt`.
- **visualization**: generates average/best fitness and speciation plots (`avg_fitness.svg`, `speciation.svg`) to track evolutionary dynamics.
- **modular design**: separate modules for game logic (`ball.py`, `tiles.py`, `player_block.py`) and training/visualization (`main.py`, `visualize.py`).

---

## installation

1. **clone the repository**
   ```bash
   git clone https://github.com/SanketJadhav7d3/AI-plays-Atari-Breakout.git
   cd ai-plays-atari-breakout
   ```

2. **create a virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

*note: ensure your system has pygame, neat-python, matplotlib, and graphviz installed.*

---

## configuration

all neat hyperparameters are specified in `config.txt`. key settings include:

- `pop_size`: number of genomes per generation
- `max_fitness_threshold`: fitness at which training stops
- mutation and crossover probabilities
- network architecture parameters (number of hidden layers, nodes)

edit `config.txt` to experiment with different evolutionary strategies.

---

## usage

### training

run the evolutionary training loop for 40 generations (default):

```bash
python main.py
```

- each genome represents a paddle controller receiving three inputs: paddle x-position, ball x-position, ball y-position.
- actions: move left, move right, or stay.
- fitness: +10 points per brick broken; game ends when the ball falls below the paddle or a high-score is reached.

### visualization

after training, generate performance plots:

```bash
python visualize.py
```

- `avg_fitness.svg`: mean and best fitness over generations.
- `speciation.svg`: species sizes across generations.

you can also render the winning genome’s network topology using graphviz (requires `neat-python`’s visualization helpers).

---

## file structure

```
ai-plays-atari-breakout/
├─ ball.py            # ball sprite & physics logic
├─ tiles.py           # brick grid manager
├─ player_block.py    # paddle sprites & neat genome integration
├─ main.py            # training loop & neat setup
├─ visualize.py       # plotting training statistics
├─ config.txt         # neat-python configuration
├─ avg_fitness.svg    # sample fitness plot
├─ speciation.svg     # sample speciation plot
└─ readme.md          # project documentation
```
