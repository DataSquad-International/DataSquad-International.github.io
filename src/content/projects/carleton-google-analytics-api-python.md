---
title: "Pulling 100,000 web visit records past the Google Analytics limit"
description: "The Google Analytics interface exports 5,000 records at a time; a Python script pulled more than 100,000."
institutions: ["carleton"]
status: past
years: "2023"
partner: "Carleton College"
partnerType: "campus-operations"
team: ["Jimmy Zhong"]
tools: ["Python", "Google Analytics API"]
category: ["Data collection & scraping"]
sourceUrl: "https://www.carleton.edu/its/blog/using-python-with-the-google-analytics-api/"
---
The Google Analytics interface lets you download 5,000 web visit records at a time, and the standard API allows 10,000. Jimmy Zhong needed about a million records for Carleton College's own analysis.

He adopted a Python script originally written by Ryan Praski and was able to download more than 100,000 records through the API. His write-up walks through the two steps for anyone repeating it: registering for the Analytics API in the Google Developers Console, including configuring the consent screen as an internal app for a Carleton account, and running the script to pull records in bulk. When the script runs, a Google login window opens to authenticate.
