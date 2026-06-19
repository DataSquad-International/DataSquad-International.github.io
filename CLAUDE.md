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

- `src/content/institutions/` — member institutions; fields include `ror_id`,
  `blog_feed_url`, and `brand_color` / `brand_color_alt` (the school's own colors,
  used only as a thin local accent — see "Institutional accent system" below)
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

Phase 2: `/events`

## Blog, feeds & syndication

The `/blog` is a **shared, aggregating** blog:

- **Native posts** live in `src/content/blog/*.md` (collection schema in
  `src/content.config.ts`). Markdown now; Keystatic is a planned follow-up.
- **External posts** are pulled at build time from each member squad's feed.
  Set `blog_feed_url` on an institution YAML to opt it in. The aggregator
  (`src/lib/posts.ts`) normalizes RSS / Atom / JSON Feed, shows excerpt + link
  cards (never full-text republish), and **fails soft** if a feed is down.
- `getAllPosts()` in `src/lib/posts.ts` is the single source for everything
  below — change post shape there, not in each consumer.

Generated automatically every build:

- Feeds: `/rss.xml`, `/atom.xml`, `/feed.json`
- JSON API: `/api/posts.json`, `/api/institutions.json` (CORS-open)
- `/sitemap-index.xml` (via `@astrojs/sitemap`), `public/robots.txt`
- Per-post: Open Graph + Twitter meta + `BlogPosting` JSON-LD (LinkedIn cards)

Social syndication: see `docs/SYNDICATION.md`. LinkedIn is **not** auto-posted
from CI (needs an approved app) — route `/rss.xml` through Buffer/Zapier/Make.
`.github/workflows/syndicate.yml.example` is a disabled scaffold for
Bluesky/Mastodon/LinkedIn.

**TODO before launch:** fill in real `blog_feed_url` values for squads that have
feeds (UCLA, Carleton confirmed-unknown paths; GESIS may lack one).

## People / profiles

`/people` groups the `people` collection by `status`: **lead → staff → current →
alumni** (empty groups are hidden). Each person is a card with headshot (or an
initials fallback), role, institution, and optional LinkedIn + ORCID links.
Schema fields beyond the basics: `status`, `linkedin`, `order` (manual sort
within a group). Add a person = one YAML in `src/content/people/`.

The UCLA roster (staff + current + alumni Hall of Fame, ~27 people) was ported
from the UCLA Jekyll site (`~/websites/ucla-datasquad.github.io/_data/sitetext.yml`)
with headshots in `public/people/`. Person fields include `github`, `email`,
`linkedin`, `orcid` (all optional); `bio` is optional. TODO: add Carleton + GESIS
rosters (Carleton's public roster is thin — Lin Winton + an alum page); confirm
reuse of student headshots is OK per our content license.

## Institutional accent system

The network unifies on the shared navy/orange frame; each institution carries its
own school color **only as a thin local identifier** (design doc: "Scalability and
Network Identity"). Set `brand_color` (+ optional `brand_color_alt`) on an
institution YAML. It's used for: the homepage institutions-strip dot, and the
left border of that squad's cards on `/blog`. Never used as body text (the golds
fail contrast). Frame, type, and navy stay constant.

Current values (official unless noted): UCLA `#2774AE`/`#FFD100`, Carleton
`#003069`/`#FFD24F`, GESIS `#0090D4`/`#00357A` (**approximated** from CMYK —
GESIS publishes no hex; replace with their exact value when comms provides it).

## Typography & licensing

- Font: **Atkinson Hyperlegible** (Braille Institute, via Google Fonts) for
  headings and body — chosen for low-vision legibility. Replaced the original
  Montserrat + Poppins. Accessibility baked in: `:focus-visible` rings,
  `prefers-reduced-motion`, AA-contrast greys (`--color-muted` /
  `--color-muted-dark`), and a navy+orange (CVD-safe) palette.
- Licenses: code is **BSD-3-Clause** (`LICENSE`); site content is **CC-BY-4.0**
  (`LICENSE-CONTENT.md`).

## Key context

- **Founder:** Paula Lackie (Carleton) @plackie
- **UCLA leads:** Tim Dennis @jt14den, Leigh Phan
- **Content:** Deborah Wiltshire (GESIS, Cologne) @DeborahWiltshire
- **Builders:** Gianna @giaari15, Shawn Wang @ShouzhiWang
- Planning doc: `~/projects/datasquad-international/datasquad-international-website-plan.md`
- Reference Astro site: `~/websites/OSPO_WEBSITE`
