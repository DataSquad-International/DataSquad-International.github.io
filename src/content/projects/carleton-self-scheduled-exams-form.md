---
title: "Collecting self-scheduled exam opt-ins with Google Forms"
description: "The registrar's office emailed every professor each term and tallied replies by hand; a prefilled form now compiles them automatically."
institutions: ["carleton"]
status: past
years: "2017"
partner: "Registrar's office"
partnerType: "campus-operations"
team: ["Quinn Schiller"]
tools: ["Google Forms", "Google Sheets", "Mail merge"]
category: ["Tools & automation"]
sourceUrl: "https://www.carleton.edu/its/blog/modernizing-mail-merge-with-google-forms/"
---

Every term the registrar's office emails each teaching professor to ask whether the class will use self-scheduled exams. The sending had been automated with mail merge, but replies arrived one at a time and the office spent hours building a table of which classes had opted in.

Quinn Schiller kept the mail merge the office already knew and changed how the answers come back. He built a Google Form that can be reused every term unchanged. Google Forms can prefill fields from a specially encoded link, so he added a calculation to the enrollment spreadsheet from Colleague, the system Carleton uses to manage class enrollment, that encodes each class's details into its link. Professors do not have to type those in, which saves time and keeps the data clean.

Getting the link into the mail merge needed a workaround for a Microsoft problem known since at least 2002. Now each professor receives a custom email with their name, their class, instructions and a link to the prefilled form, and the answers compile in a Google Sheet, producing the list the office used to build by hand.
