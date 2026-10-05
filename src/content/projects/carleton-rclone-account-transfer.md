---
title: "Moving a graduating student's files with rclone"
description: "When a student account ends, years of files go with it; a comparison of rclone and rsync for moving large amounts of data."
institutions: ["carleton"]
status: past
years: "2024"
partner: "Information Technology Services"
partnerType: "campus-operations"
team: ["Ryan Yang"]
tools: ["rclone", "rsync", "Google Drive"]
category: ["Tools & automation"]
sourceUrl: "https://www.carleton.edu/its/blog/transferring-your-stuff-efficiently-and-effectively-is-rclone-the-right-tool/"
---

One problem at graduation is that a student's account will soon disappear. Students gather many files on Google Drive over the years, and not every transfer method copes well with a large volume. What counts as a lot depends on who is asking: a 15-minute download may feel large to some people and four hours to others. Whatever the size, it matters to know whether the data arrived intact, and with many files it is hard to tell what has and has not transferred.

Ryan Yang compared two command-line tools. His conclusion: for cloud storage services, rclone is the more straightforward choice because of its cloud-focused features and broad provider support. Where the aim is efficient transfer that minimizes bandwidth, rsync's approach of sending only differences may suit local and remote transfers better. rsync can also resume interrupted transfers.
