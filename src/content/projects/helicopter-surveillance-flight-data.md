---
title: "Flight data for research on police helicopter surveillance"
description: "Twelve monthly files of about a million rows each, with nested records, turned into one analyzable dataset for an undergraduate researcher."
institutions: ["ucla"]
years: "2022\u20132024"
partner: "UCLA undergraduate research on police helicopter surveillance"
partnerType: "research"
team: ["Ethan Allavarpu", "Kristian Allen"]
category: ["Data cleaning & integration", "Analysis & modeling"]
sourceUrl: "https://ucla-datasquad.github.io/2023/07/27/kate-m-helicopter-data.html"
---
Kate McInerny first used the Data Science Center in a 2019 African American Studies course that taught GIS and R. By 2022 she was studying how law enforcement helicopter surveillance in Los Angeles is racialized and how its noise affects residents' sleep. After suing the LAPD for flight data, she had twelve monthly datasets, each with around a million rows.

The records were nested, so Kristian Allen and DataSquad consultant Ethan Allavarpu wrote functions that flattened them and tagged each row with a flight ID. Kate then adapted that base code for her own questions. The Center also set her up on its deep learning machine, which let her combine all twelve months and run the analysis in one pass.

She met with the Center and DataSquad consultants more than thirty times in 2022. A later round of work on her code, which pulled data from an API, improved its efficiency by over 800%, so she spent less time waiting and more time interpreting results.

Her advice to other student researchers is to start with the Data Science Center and keep asking until the logic of each step is clear. Her research was covered by the LA Times.
