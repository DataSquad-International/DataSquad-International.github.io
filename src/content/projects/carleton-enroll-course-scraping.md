---
title: "Scraping course descriptions for Writing Rich and Quantitative Reasoning lists"
description: "The course database had the listings but not the descriptions, so a script collected the descriptions from the registration site."
institutions: ["carleton"]
status: past
years: "2019"
partner: "Carleton College"
partnerType: "campus-operations"
team: ["Sam Terwilliger"]
tools: ["Python", "Beautiful Soup", "pandas"]
category: ["Data collection & scraping"]
sourceUrl: "https://www.carleton.edu/its/blog/scraping-enroll-with-beautiful-soup-and-pandas/"
---
Sam Terwilliger's first DataSquad project was to build up-to-date lists of Writing Rich and Quantitative Reasoning courses. The team expected an Excel export from the database behind ENROLL, the college's course site, to hold everything. Nearly all of it did, but the course descriptions were separate, and the only simple way to get them was the website itself.

The fix was to take the WR and QR listings from the database, then scrape the descriptions and course IDs from ENROLL with Beautiful Soup and match them to the original data in pandas. Sam's takeaway was how a project's scope shifts as roadblocks appear in getting and processing data.
