---
title: "Converting old Microsoft Office files to PDF"
description: "A bash script that converts a folder of old .doc, .xls and .ppt files to PDF in one pass, keeping names and timestamps."
institutions: ["carleton"]
status: past
years: "2017"
partner: "Carleton College"
partnerType: "campus-operations"
tools: ["bash", "LibreOffice"]
category: ["Data management & infrastructure"]
sourceUrl: "https://www.carleton.edu/its/blog/converting-microsoft-office-files-to-pdf-files/"
---

Old Microsoft Office files will eventually become impossible to open in newer software. PDF is the most convenient format for preserving what they contain: it is familiar, keeps formatting intact, has no incompatible versions, and is supported on almost every system. Office can save as PDF itself, but opening and re-saving every old document by hand is laborious.

A DataSquad student, posting under the name yingh, wrote a bash script for Mac and Linux that uses LibreOffice to convert every .doc, .xls and .ppt file in a folder and its subfolders. Each PDF is saved next to the original under the same filename, and it keeps the original's permissions and timestamps. The post gives the steps for running it from the terminal.
