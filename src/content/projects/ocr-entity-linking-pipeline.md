---
title: "From scanned pages to searchable, linked text"
description: "A DataSquad member evaluated OCR, entity linking and layout formats to make UCLA Library collections computable for researchers."
institutions: ["ucla"]
years: "2023"
partner: "UCLA Library collections"
partnerType: "campus-operations"
team: ["Lukas Hager"]
tools: ["Tesseract", "ReFinED", "ALTO"]
category: ["Digitization & heritage", "Tools & automation"]
sourceUrl: "https://ucla-datasquad.github.io/2024/03/14/ocr-research-lukas.html"
---
UCLA Library collections hold texts from many years, media and languages, and much of it is scanned images that researchers cannot search. Lukas Hager, a Math of Computation student on the DataSquad, spent a summer and fall quarter building and testing a pipeline to change that.

He started with Tesseract, the open source OCR engine, and noted where it struggles, especially with non-Latin scripts such as Arabic and Hebrew. He then applied named entity recognition and linking, using Amazon Research's ReFinED to connect the people, places and organizations in the recognized text to Wikipedia and Wikidata records, so frequently mentioned terms become links.

To show the results he added a simple interface and compared two standard OCR output formats, ALTO and hOCR, which preserve the layout of the original page. The last step was tabular extraction, which turns tables in newspapers and magazines into a spreadsheet researchers can work with.

The work was exploratory, a survey of what each tool can and cannot do.
