---
title: "Shedding Light on Injustice"
description: "Four cohorts of DataSquad consultants spent five years building the dataset behind Terence Keel's book on hidden deaths in police custody."
institutions: ["ucla"]
team: ["Julia Wood", "Ethan Allavarpu", "Tristan Dewing", "Lawrence Lee"]
years: "2021–2025"
tools: ["R", "Python", "OpenRefine", "Tableau"]
category: ["Data Integration", "Social Justice Research"]
heroImage: "/img/projects/keel-coroners-silence-cover.jpg"
heroImageAlt: "Cover of The Coroner's Silence by Terence Keel"
quote:
  text: "The UCLA DataSquad is one of the most impactful resources I've engaged with at UCLA."
  attribution: "Grace Sosa, Biocritical Lab manager"
sourceUrl: "https://ucla-datasquad.github.io/portfolio/03-keel-injustice/"
---

Professor Terence Keel and the [Biocritical Studies Lab](https://www.terencekeel.com/research) have been building a comprehensive dataset of deaths in custody across the United States from 2000 to 2020, integrating records from Fatal Encounters, The Guardian, Reuters, the LA Times Homicide Report, and the Bureau of Justice Statistics. The UCLA DataSquad supported this work continuously from 2021 through 2025, across four cohorts of consultants.

The core challenge: law enforcement and medical examiners routinely undercount and misclassify deaths at the hands of police. The dataset exists to recover those hidden names.

### 2021, first cohort: Julia Wood, Ethan Allavarpu

Julia and Ethan merged four datasets, cleaned the data, and built Tableau dashboards visualizing fatal encounters by weapon, location, race, and ethnicity, including LA-specific views. Ethan ran chi-square tests to identify localities with statistically anomalous undercounts, helping researchers pinpoint where to look for hidden cases.

![Tableau visualization of fatal encounters with police in Los Angeles by race and ethnicity](/img/projects/keel-policedeath-la.png)

See Julia's full [Tableau visualizations](https://public.tableau.com/app/profile/julia2053) and the [animation of the hidden](https://public.tableau.com/app/profile/julia2053/viz/AnimationoftheHiddenFatalEncounters/HiddenAnimation).

### 2023, second cohort: Tristan Dewing

Tristan continued the data integration work, tracing hidden names back through the original source data, updating summary statistics, and calculating rates of death against census population figures across six counties.

### 2024–2025, third cohort: Lawrence Lee

Lawrence did the most extensive normalization work: standardizing names with OpenRefine, resolving duplicate records, flagging newly surfaced entries that appeared when source data was updated, and building a reproducible pipeline that subsequent analysts could maintain. The dataset shrank by roughly 30% after deduplication, and became far more reliable.

![Animation of fatal encounters with police across the United States, highlighting previously hidden deaths](/img/projects/keel-policedeath-us.png)

The results of this multi-year collaboration are now part of Professor Keel's published book, *The Coroner's Silence: Death Records and the Hidden Victims of Police Violence* (Beacon Press, 2025), which Keel has been presenting at talks and conferences. He was also one of six recipients of UCLA's **2024 Public Impact Research Award**.

[Check it out at the UCLA Library](https://search.library.ucla.edu/permalink/01UCS_LAL/tk6osu/alma9997265754106533) · [Bookshop.org](https://bookshop.org/p/books/the-coroner-s-silence-death-records-and-the-hidden-victims-of-police-violence-terence-keel/176e80a41aa79205?ean=9780807017517)
