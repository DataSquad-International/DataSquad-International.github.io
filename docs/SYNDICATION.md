# Syndication & feeds

How DataSquad International publishes outward, and how the blog pulls content in.

## What the site produces

Every build regenerates these automatically from the merged set of posts
(native posts in `src/content/blog/` plus anything pulled from member-squad
feeds):

| Endpoint | Format | Use |
|---|---|---|
| `/rss.xml` | RSS 2.0 | The feed most tools expect. Point Buffer/Zapier here. |
| `/atom.xml` | Atom 1.0 | Same content, Atom format. |
| `/feed.json` | JSON Feed 1.1 | Easiest to consume from code. |
| `/api/posts.json` | JSON | All posts, normalized, CORS-open. For other sites to read. |
| `/api/institutions.json` | JSON | Member directory + per-squad post counts. |
| `/sitemap-index.xml` | Sitemap | For search engines. |

Each post page also carries Open Graph + Twitter card meta and `BlogPosting`
JSON-LD, so a shared link renders a proper preview card on LinkedIn, Slack, etc.

## Pulling in other squads' blogs

Set `blog_feed_url` on an institution in `src/content/institutions/*.yaml`:

```yaml
name: Carleton College
url: https://www.carleton.edu/
local_program_url: https://datasquad.sites.carleton.edu/
blog_feed_url: https://datasquad.sites.carleton.edu/feed.xml   # <-- add this
```

At build time the aggregator (`src/lib/posts.ts`) fetches that feed (RSS, Atom,
or JSON Feed — all handled), takes the title/date/excerpt, and shows it on
`/blog` as an "From their blog ↗" card that links back to the original. We do
**not** republish full text, so there's no duplicate-content or licensing issue.

If a feed is unreachable at build time, that squad is skipped and the build still
succeeds. **You still need to fill in the real feed URLs** — they're left blank
until someone confirms each squad's feed path.

## Posting out to social media

### LinkedIn (the priority) — recommended route

LinkedIn's posting API requires an *approved* app (their Community Management
program), org-admin OAuth, and tokens that expire ~every 60 days. That's too
heavy and too brittle to live in this repo. The durable path:

1. **A no-code automation watches `/rss.xml`** and posts to the DataSquad
   International LinkedIn page. **Buffer**, **Zapier ("RSS by Zapier" → LinkedIn),
   or **Make** all do this in a few clicks. This is the recommended setup.
2. Because every post ships full Open Graph meta, the LinkedIn card looks right
   automatically — title, description, image.
3. Each post page also has a **Share on LinkedIn** button for manual posting.

### Bluesky / Mastodon (optional, fully automatable)

These have simple APIs and *can* be posted to directly from CI. See
`.github/workflows/syndicate.yml.example` for a starting point. Rename it to
`syndicate.yml` and add the relevant secrets to enable it.

### Direct LinkedIn API (only if you get an approved app)

If you ever obtain an approved LinkedIn app + org-admin token, the same workflow
file has a documented (disabled) LinkedIn step. Store the token as the
`LINKEDIN_ACCESS_TOKEN` secret and the org URN as `LINKEDIN_ORG_URN`. Note the
token needs refreshing roughly every 60 days.
