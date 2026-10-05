---
title: "Downloading over 1,200 declassified meeting minutes"
description: "An archive that lets you download one PDF at a time, and a script that handled the rest."
institutions: ["ucla"]
years: "2026"
partner: "International Institute"
partnerType: "research"
team: ["Lian Elsa Linton"]
category: ["Data collection & scraping"]
sourceUrl: "https://ucla-datasquad.github.io/2026/04/29/spring-2026-update.html"
---
A researcher in the International Institute is building a Hebrew corpus of Israeli government meeting minutes, from the founding of the state in 1948 through the 1980s. All of the declassified meetings are online, each as a separate PDF, and the Israeli State Archives only allows them to be downloaded one file at a time.

Project manager Lian Elsa Linton met with the researcher in two consulting sessions and wrote a script that handled the downloading of the 1,200-plus PDFs. The code is kept in a repository so it can be rerun.

A follow-on request is now under way: some of the documents are poor scans, and the researcher and a postdoc want to feed them to an AI service that can read them only ten pages at a time, so the next step is a script that feeds the ten-page chunks to the service and collects the output.
