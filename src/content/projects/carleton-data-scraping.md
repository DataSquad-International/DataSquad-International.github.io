---
title: "Election news analysis: collecting transcripts from campaign-season coverage"
description: "A scraper built and improved by students over several years to gather news transcripts from presidential election periods for a political science research project."
institutions: ["carleton"]
status: current
years: "2021–2024"
partner: "Political Science Department"
partnerType: "research"
client: "Barbara Allen"
team: ["Aaron Bronstone", "Serafin Patino", "Hiromichi Ueda", "Helen Du", "Isabella Cha", "Cathy Duan", "Nina Sun", "Charles Nykamp", "Graham Gordon"]
tools: ["Python", "Selenium"]
category: ["Data collection & scraping"]
heroImage: "/img/projects/carleton-data-scraping.jpeg"
heroImageAlt: "Screenshot from the election news analysis project"
sourceUrl: "https://www.carleton.edu/its/blog/election-news-analysis-project/"
---

The goal is to gather transcripts from many news sources and study which topics were discussed during presidential election periods, and how key events such as the murder of George Floyd and January 6th shaped coverage. The research is Professor Barbara Allen's in Political Science, with a partner at the University of Exeter and several recent students.

The transcripts come from News Data Service, a national media monitoring service that Carleton subscribes to. At the end of 2023 word spread that the service planned to replace its dated interface, which could break the existing scraper, so it became urgent to collect as many transcripts as possible from other election periods for future research.

The scraper was started by Hiromichi Ueda '21 and improved over the years by students including Helen Du, Isabella Cha, Cathy Duan, Nina Sun, Charles Nykamp and Graham Gordon. From September 2023 to February 2024, Aaron Bronstone '24 and Serafin Patino '24 used it to collect transcripts from local sources in Minnesota, Iowa and Wisconsin and national sources for election years.

It works in two steps. It builds a query for every combination of source and day in a date range and submits each one through the service's search page, saving the transcript links to a CSV file. It then visits each link and saves the full text into a folder tree organized by year, station, month and day. The date ranges covered July through November of 2004, 2008, 2012 and 2016, plus later periods through early 2024. The write-up, by Ryan Yang, notes that Carleton's subscription permits the collection and that the scraper uses Selenium to drive the browser.
