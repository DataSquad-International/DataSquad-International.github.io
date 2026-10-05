---
title: "Redesigning book graphs to a publisher's rules"
description: "Graphs of every presidential ad aired in 2008, redrawn in black and white at 4 by 7.5 inches, with the original Excel file lost."
institutions: ["carleton"]
status: past
years: "2017"
partner: "Political Science"
partnerType: "research"
team: ["Quinn Schiller"]
tools: ["Python", "pandas", "R Markdown"]
category: ["Visualization & reporting"]
sourceUrl: "https://www.carleton.edu/its/blog/every-presidential-ad-ran-in-2008/"
---
Professor Barbara Allen asked the DataSquad to redesign the graphs in a book chapter for clarity and to meet the publisher's standards. The limits were strict: black and white only, no gray; 4 by 7.5 inches; readable without the context of the chapter; and no titles, because the publisher would add them.

Quinn Schiller received the chapter, the old graphs, a raw CSV and the Stata file that produced it, but not the Excel file the graphs were made in. Without it, the originals could not be salvaged, so he rebuilt them from the raw data. Because the data changed during the project, he made the graphs independent of the cleaning: pandas read the CSV, restored context from the Stata file, filtered invalid rows and wrote a processed CSV for each graph. An R Markdown notebook then drew each graph in its own chunk, with one chunk controlling the shared theme.
