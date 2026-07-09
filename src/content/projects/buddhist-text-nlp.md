---
title: "Analyzing Ancient Chinese Buddhist Text with Python"
description: "Standard NLP tools assume modern, pre-segmented text. A Ming-dynasty Buddhist corpus needed a different approach to segmentation and comparison."
institutions: ["ucla"]
years: "2021"
tools: ["Python", "spaCy", "scikit-learn"]
category: ["Data Science Center", "Digital Humanities"]
heroImage: "/img/projects/buddhist-text-hero.jpg"
heroImageAlt: "Pages of ancient Chinese Buddhist text"
sourceUrl: "https://ucla-datasquad.github.io/portfolio/10-buddhist-text/"
---

A graduate student from Asian Languages and Cultures came to the Data Science Center to semantically analyze a set of ancient Buddhist texts: extracting meaning and comparing similarity across documents quantitatively. The consultation doubled as an exercise in applying Python's standard NLP toolbox (spaCy, scikit-learn, and word-cloud visualization) to a language the tools weren't built for.

The texts were Ming-dynasty Buddhist writing, originally a single unsegmented block with no white space between words, the norm for classical Chinese. Most NLP segmentation tools assume modern Chinese, so the team used a Python library to split the text by vocabulary matching instead of white space. That got the text segmented, but the library's default dictionary was modern, and modern vocabulary doesn't map cleanly onto Ming-era syntax. The team explored swapping in an ancient Chinese corpus and dictionary, several of which are maintained by the Georgetown Treebank project.

Once segmented, the team ran TF-IDF and other scikit-learn statistical tools on the corpus, plus word-cloud visualizations for a baseline read on the text. The next step, not yet started, was automated content tagging.
