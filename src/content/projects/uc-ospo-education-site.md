---
title: "A lesson inventory and the site built from it for UC OSPO education"
description: "A catalog of 55 open source and research software lessons, and the searchable site two DataSquad students built to browse it."
institutions: ["ucla"]
years: "2025–2026"
partner: "UC OSPO Network education working group"
partnerType: "instruction"
team: ["Shawn Wang", "Gianna Kim", "Lian Elsa Linton", "Tim Dennis"]
tools: ["Astro", "Google Sheets"]
category: ["Tools & automation", "Teaching & training"]
sourceUrl: "https://ucla-datasquad.github.io/2026/04/29/spring-2026-update.html"
---
Before writing new lessons, the UC OSPO education group needed to know what already existed. Tim Dennis maintains an inventory, a spreadsheet already feeding the first site prototype by December 2025, of 55 candidate lessons gathered from Open Source Guides, CodeRefinery, the Carpentries Incubator, TeachingOpenSource.org and the network's own materials. Each lesson is described with 43 fields, borrowing schema.org's learning resource terms and adding the group's own, such as learner category and how relevant it is to an OSPO. 32 are marked as keep candidates, and a gap tab lists topics with no lesson yet, starting with licensing and compliance.

The inventory was the data. The DataSquad built the site on top of it, for UC OSPO's education pages at ucospo.net/education. Shawn Wang moved the lessons out of the spreadsheet into an editing system where a content editor can update a record without touching code, built a page for every lesson, wrote a small tool that catches differences between the spreadsheet and what is published, and set up automated checks that run on every change. Gianna Kim built the search, which uses fuzzy matching so that "Python data clean" still finds "Data Cleaning with Python", and the browse-by-pathway page, and she cleaned up the lesson category labels across the whole collection. Lian Elsa Linton, the squad's project manager, was assigned to the work.

The site launched with UC branding, a homepage that sends visitors two ways depending on whether they know what they want or need help choosing, a filterable lesson library, and a full accessibility review before launch.

The licensing gap the inventory found is now being developed into a lesson.
