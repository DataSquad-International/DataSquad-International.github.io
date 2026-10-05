---
title: "wbcheck: a lesson checker for Carpentries Workbench"
description: "A command-line tool that finds broken front matter, links and scaffold text in a Carpentries lesson in under a second, started by two DataSquad students and now at 48 rules."
institutions: ["ucla"]
years: "2023–2026"
partner: "UCLA IMLS Open Science lesson development"
partnerType: "instruction"
team: ["Lawrence Lee", "Eric Huang", "Tim Dennis"]
tools: ["Python", "pixi", "Carpentries Workbench"]
category: ["Tools & automation", "Teaching & training"]
sourceUrl: "https://github.com/ucla-imls-open-sci/carpentries-workbench-checker"
---

Lesson authors in the Carpentries Workbench usually learn a lesson is broken after they push it and wait for the sandpaper CI build. `wbcheck` runs the same kinds of checks locally, in under a second, before the push.

The first version was written by Lawrence Lee and Eric Huang, two UCLA DataSquad students, starting in September 2023. It checked lesson structure the way sandpaper and pegboard do: front matter, required blocks, headings, links and images.

In September 2026 Tim Dennis rebuilt it as `wbcheck` (releases 0.2.0 to 0.3.0). It now has 48 documented rules, each with an offline explanation that cites the specific section of the Carpentries guidance behind it. It can open the findings in an editor to fix them, draft GitHub issues grouped by file, and produce reports. An optional AI review adds writing and pedagogy comments, and every comment has to quote the lesson text it is about, so it can't invent a citation.

It is used on the IMLS Open Science pilot lessons and is open source under BSD-3-Clause. The original authors remain credited in the repository's citation file.

[Source and install instructions](https://github.com/ucla-imls-open-sci/carpentries-workbench-checker)
