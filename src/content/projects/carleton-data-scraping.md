---
title: "Data Scraping"
description: "Scraping and data analysis of keywords from various news sites."
institutions: ["carleton"]
status: current
partner: "Political Science Department"
partnerType: "research"
client: "Barbara Allen"
team: ["Aaron Bronstone", "Serafin Patino"]
category: ["Data collection & scraping"]
heroImage: "/img/projects/carleton-data-scraping.jpeg"
heroImageAlt: "Screenshot from the Data Scraping project"
sourceUrl: "https://carletondatasquad.bitbucket.io/#projects"
---

Serafin '24 and I have been working with poli-sci professor Barbara Allen to scrape transcripts from a news data aggregation
service (News Data Service). Scraping websites involves analyzing the structure of website pages and automating the process
of web surfing to extract information.

The transcripts range from key presidential election periods (2004, 2008, 2012, 2016, 2020). We scraped all transcripts from
2019-2023 due to the many drastic events in that range that pertain to both state and national politics (George Floyd's murder,
January 6th uprising, etc.). The transcripts are from both national news sources such as CNN, NBC and FOX, as well as local
news sources in Minnesota, Iowa and Wisconsin. These transcripts will undergo natural language processing techniques to identify
trends that specific news sources talk about as well as the biases they might have about certain topics or people.

With over 30 news sources and 1,760 individual dates to scrape, we had over 52,000 queries (requests for transcripts from a
specific date and news source) to submit to the News Data Service to extract all the needed transcripts. Serafin and I
inherited NDS scraping code from previous Data Squad analysts, where each query would take roughly one minute to complete.
This added up to over a month of straight scraping, which was highly unrealistic given limited computing resources. We spent
time optimizing the code to cut the average query time in half, and using 3 computers, we were able to complete the scraping
process within a month. A lot of the October-February timeline was spent optimizing the code and performing integrity checks
on the transcripts scraped.
