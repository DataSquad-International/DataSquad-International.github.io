# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

- **Framework:** Astro v6 (static output)
- **Hosting:** GitHub Pages via `.github/workflows/deploy.yml`
- **Domain:** datasquad.info (CNAME in `public/`)

## Commands

```bash
npm run dev        # local dev server at localhost:4321
npm run build      # production build to dist/
npm run preview    # preview built output
```

## Content collections (Astro v6)

Config is at `src/content.config.ts` (not `src/content/config.ts` — Astro v6 moved it).
Collections use the `glob()` loader. YAML files live in:

- `src/content/institutions/` — member institutions; fields include `ror_id`
- `src/content/projects/` — cross-institution project outputs
- `src/content/people/` — leads and contributors; fields include `orcid`

## Site architecture

```
/              Home
/about         Origin story, founder + leads
/model         How the program works
/institutions  Member directory (from institutions collection)
/join          How to adopt the model
/projects      Project showcase (from projects collection)
/resources     Templates, decks, tools
/contact       Contact
```

Phase 2: `/events`, `/blog`

## Key context

- **Founder:** Paula Lackie (Carleton) @plackie
- **UCLA leads:** Tim Dennis @jt14den, Leigh Phan
- **Content:** Deborah Wiltshire (GESIS, Cologne) @DeborahWiltshire
- **Builders:** Gianna @giaari15, Shawn Wang @ShouzhiWang
- Planning doc: `~/projects/datasquad-international/datasquad-international-website-plan.md`
- Reference Astro site: `~/websites/OSPO_WEBSITE`
