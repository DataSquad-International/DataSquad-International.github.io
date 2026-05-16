# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

Pre-initialization. The Astro project has not been scaffolded yet. This repo will become the DataSquad International website — a multi-institution network site extending the UCLA DataSquad model to peer institutions.

Planning doc: `~/projects/datasquad-international/datasquad-international-website-plan.md`

## Tech stack

- **Framework:** Astro (static output, no backend)
- **Content:** Markdown pages + YAML/JSON content collections for institutions and projects
- **Hosting:** GitHub Pages or Netlify (TBD — check where OSPO Education and IMLS Open Science sites are hosted)

## Commands (once Astro is initialized)

```bash
npm run dev        # local dev server at localhost:4321
npm run build      # production build to dist/
npm run preview    # preview built output
```

## Planned site architecture

```
/                  Home — headline, model summary, 3-panel goal overview
/about             Origin story, UCLA roots, co-leads
/model             How the program works — staffing, services, student outcomes
/institutions      Member directory (driven by YAML content collection)
/join              How to adopt the model — onboarding guide, templates, FAQ
/projects          Cross-institution project showcase (driven by YAML content collection)
/resources         Templates, decks, assessment tools
/contact           Contact info or form
```

Phase 2 additions: `/events`, `/blog` (or `/news`).

## Content model

Institution and project data should live in `src/content/` as YAML-fronted Markdown or standalone YAML, using Astro content collections. This keeps non-developer collaborators (Paula Lackie, Deborah Wiltshire) able to update data without touching components.

## Key context

- Co-led by Tim Dennis (UCLA) and Paula Lackie (Carleton College)
- GitHub org: https://github.com/DataSquad-International
- Reference sites (same Astro stack): OSPO Education, IMLS Open Science
- Sibling `docs/` folder in the parent directory (`../docs/`) is a Jekyll Just the Docs placeholder — separate from this Astro site
- Domain not yet decided: `datasquad.info` or a UCLA subdomain
- Brand/visual identity not yet decided: UCLA brand vs. distinct DataSquad International look
