---
title: "Como-Q: A Skincare Ingredient Screener"
description: "The DataSquad's first project for an outside applicant: an R tool that flags comedogenic (pore-clogging) ingredients in skincare and hygiene products."
institutions: ["ucla"]
team: ["Will Foote", "Isabel Light"]
years: "2022"
tools: ["R"]
category: ["UCLA DataSquad"]
heroImage: "/img/projects/como-q-hero.png"
heroImageAlt: "Skincare products"
sourceUrl: "https://ucla-datasquad.github.io/portfolio/05-como-q/"
---

When Isabel Light filled out a request form for the UCLA DataSquad to help her code a passion project, she didn't know she'd be the first external applicant the team had ever helped. Isabel, a senior Microbiology, Immunology, and Molecular Genetics major at UCLA, had no prior connection to the Data Science Center; until then, every DataSquad consultation had come through referrals from within the DSC.

Norman Powell Data Science Consultant Will Foote helped on the coding side of the project: a program that screens a skincare product's ingredients to check whether any are comedogenic (pore-clogging). Isabel named it "Como-Q," inspired by how often skincare and general hygiene products go unlabeled or mislabeled for their pore-clogging properties.

"One of the main ingredients in many shampoos is comedogenic," Isabel said. "But no one really seems to know or care because it's not a skincare product. I wanted to build a tool that helps people easily identify if an item is pore-clogging even if it's not a typical skincare product."

She also wanted the tool to be customizable, since not everyone's skin reacts the same way to the same ingredients.

Over three consultations across Winter and Spring quarters, Will and Isabel got a base application working in R. In its current form, Como-Q runs from the R console and needs two inputs: a list of flagged ingredients and an ingredient to search for.

![Como-Q running in the R console](/img/projects/como-q-console.png)

Isabel plans to keep building on the foundation the DataSquad helped her lay, adding support for checking a full ingredient list at once and eventually wrapping the tool in R Shiny so it can run as a public web app.
