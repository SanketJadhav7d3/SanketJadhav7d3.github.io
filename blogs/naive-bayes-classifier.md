---
title: Naive Bayes Classifier
cover: /assets/images/blog cover image.png
layout: blog.njk
permalink: /blogs/naive-bayes-classifier/
description: "An introduction to Naive Bayes Classifier"
---

# Bayes’ Theorem

Before jumping into the Naive Bayes Classifier, it helps to build some intuition around **Bayes’ Theorem** itself. It is one of the central ideas in probability theory. At its core, it gives you a principled way to **update what you believe when new evidence appears**.

---

## A motivating example

Imagine a medical test for a rare disease.

* The disease affects **1 in 1000 people** (0.1%)
* The test is **99% accurate** for detecting the disease (true positive rate)
* However, even if you do not have the disease, the test still gives a **false positive 5% of the time**

Now suppose you take the test, and the result comes back **positive**.

> **What is the actual probability that you have the disease?**

At first glance, it is tempting to think:
“99% accurate test means I probably have it.”

This intuition turns out to be misleading, and this is exactly where Bayes’ Theorem becomes useful.

---

## Terminology

What we are trying to compute is:

> The probability that you **have the disease given that the test is positive**

This is written as:


![Bayes Theorem Formula](/assets/blogs/naive-bayes-classifier/first.png)


* The **evidence** is that the test result is positive
* The **hypothesis** is that you have the disease
* The vertical bar “|” is read as **“given”**

So this reads:

> “Probability of the hypothesis being true, given the evidence”

This is also called the **posterior probability**, since it represents your updated belief after observing new information.

---

## A visual way to think about it

![Bayes Theorem Formula Visualized](/assets/blogs/naive-bayes-classifier/visualized.png)

It helps to imagine this using sets.

* The entire rectangle represents the **sample space** or all possible outcomes
* Circle **A** represents people who have the disease
* Circle **B** represents people who test positive
* The overlap $$(A \cap B)$$ represents people who both have the disease and test positive

Bayes’ Theorem is essentially answering:

> “Given that I am already inside B, how much of B actually belongs to A?”

---

## Building the formula step by step

Start by looking at the overlap from inside **B**:

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)}
$$

This says:
Take the overlap and view it as a fraction of all outcomes in B.

Rewriting:

$$
P(A \mid B),P(B) = P(A \cap B)
$$

---

Now look at the same overlap, but from inside **A**:

$$
P(B \mid A) = \frac{P(B \cap A)}{P(A)}
$$

or:

$$
P(B \mid A),P(A) = P(B \cap A)
$$

---

## The key insight

Both expressions describe the exact same region:

$$
P(A \cap B)
$$

So we can equate them:

$$
P(B \mid A),P(A) = P(A \mid B)P(B)
$$

Rearranging gives us Bayes’ Theorem:

$$
P(A \mid B) = \frac{P(B \mid A)P(A)}{P(B)}
$$

---

## Why this matters

Bayes’ Theorem lets you **flip conditional probabilities**.

* From something easier to measure, $$P(B \mid A)$$
* To something you actually care about, $$P(A \mid B)$$

In the medical example:

$$P(\text{Positive} \mid \text{Disease})$$ 
is known from test accuracy

What we really want is 
$$P(\text{Disease} \mid \text{Positive})$$

Bayes’ Theorem provides the connection between the two.

---

## Intuition in one line

Bayes’ Theorem is simply:

> Looking at the same overlap, but changing the perspective from which you measure it.

---

This simple idea is what drives the Naive Bayes Classifier and many real world probabilistic models.

