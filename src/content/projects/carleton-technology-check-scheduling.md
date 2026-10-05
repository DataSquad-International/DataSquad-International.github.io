---
title: "Scheduling technology checks across more than a hundred rooms"
description: "Student workers check projectors and touch panels in classrooms around campus; a student wrote code to build their schedules."
institutions: ["carleton"]
status: past
years: "2025"
partner: "Presentation, Events, and Production Support"
partnerType: "campus-operations"
team: ["Auiannce Euwing"]
category: ["Tools & automation"]
sourceUrl: "https://www.carleton.edu/its/blog/automating-technology-check-scheduling/"
---
The PEPS office (Presentation, Events, and Production Support) employs student workers to check the technology in over a hundred classrooms, performance spaces and meeting rooms: projectors, touch panels, document cameras and CD players. Building their schedules by hand took too long, because work schedules vary and rooms are occupied at set times.

Auiannce Euwing '26 wrote code to automate it. The task looked straightforward until the questions arrived. Should some spaces take priority? When are spaces empty? How long is a shift? The hardest was distance: a student can only cover rooms that are close together in one shift.

After several attempts, including one that computed distances from latitude and longitude, the practical answer was to divide the presentation spaces into four zones, based on distance and on how many spaces each building holds. Some buildings have a single space and others have fourteen. Workers are then assigned spaces within a zone, so nobody spends a shift walking across campus.

The write-up was by Dashiell Coyier, a fellow DataSquad member.
