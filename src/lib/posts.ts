import { getCollection, type CollectionEntry } from 'astro:content';
import { XMLParser } from 'fast-xml-parser';

/**
 * A single, normalized post used everywhere on the site: blog pages, feeds,
 * JSON-LD, and the /api endpoints. Native posts live in the repo; external
 * posts are pulled from member-squad feeds at build time (excerpt + link out).
 */
export interface UnifiedPost {
  title: string;
  /** Stable slug. Native posts use their file slug; external use a hash. */
  slug: string;
  /** Where the post canonically lives. Native -> /blog/slug, external -> source. */
  url: string;
  /** Absolute permalink on this site. Native -> own page; external -> source. */
  permalink: string;
  external: boolean;
  /** Institution id (matches institutions/*.yaml), if any. */
  institution?: string;
  /** Human-readable source label, e.g. "DataSquad International" or "Carleton". */
  sourceName: string;
  date: Date;
  description: string;
  author?: string;
  tags: string[];
}

const SITE = 'https://datasquad.info';

function toAbsolute(path: string): string {
  return new URL(path, SITE).href;
}

// ---------------------------------------------------------------------------
// Native posts (repo Markdown)
// ---------------------------------------------------------------------------

function nativeToUnified(entry: CollectionEntry<'blog'>): UnifiedPost {
  const { data, id } = entry;
  const slug = id;
  const path = `/blog/${slug}/`;
  return {
    title: data.title,
    slug,
    url: data.canonicalURL ?? toAbsolute(path),
    permalink: toAbsolute(path),
    external: false,
    institution: data.institution,
    sourceName: 'DataSquad International',
    date: data.pubDate,
    description: data.description,
    author: data.author,
    tags: data.tags ?? [],
  };
}

export async function getNativePosts(): Promise<UnifiedPost[]> {
  const entries = await getCollection('blog', ({ data }) =>
    import.meta.env.PROD ? data.draft !== true : true
  );
  return entries.map(nativeToUnified);
}

// ---------------------------------------------------------------------------
// External posts (member-squad feeds, fetched at build time)
// ---------------------------------------------------------------------------

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
});

function stripHtml(s: string): string {
  return s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function excerpt(s: string, max = 220): string {
  const clean = stripHtml(s);
  if (clean.length <= max) return clean;
  return clean.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

function asArray<T>(x: T | T[] | undefined): T[] {
  if (x === undefined || x === null) return [];
  return Array.isArray(x) ? x : [x];
}

function hashSlug(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  }
  return 'ext-' + (h >>> 0).toString(36);
}

interface FeedMeta {
  institution: string;
  sourceName: string;
}

function parseRssItems(channel: any, meta: FeedMeta): UnifiedPost[] {
  return asArray(channel.item).map((item: any): UnifiedPost => {
    const link = typeof item.link === 'string' ? item.link : item.link?.['@_href'] ?? '';
    const desc =
      item['content:encoded'] ?? item.description ?? item.summary ?? '';
    const cats = asArray(item.category)
      .map((c: any) => (typeof c === 'string' ? c : c?.['#text']))
      .filter(Boolean);
    return {
      title: stripHtml(String(item.title ?? 'Untitled')),
      slug: hashSlug(link || String(item.title)),
      url: link,
      permalink: link,
      external: true,
      institution: meta.institution,
      sourceName: meta.sourceName,
      date: item.pubDate ? new Date(item.pubDate) : new Date(),
      description: excerpt(String(desc)),
      author: item['dc:creator'] ?? item.author,
      tags: cats,
    };
  });
}

function parseAtomEntries(feed: any, meta: FeedMeta): UnifiedPost[] {
  return asArray(feed.entry).map((entry: any): UnifiedPost => {
    const links = asArray(entry.link);
    const alt =
      links.find((l: any) => l?.['@_rel'] === 'alternate') ?? links[0];
    const link = alt?.['@_href'] ?? '';
    const content = entry.content?.['#text'] ?? entry.content ?? entry.summary ?? '';
    const cats = asArray(entry.category)
      .map((c: any) => c?.['@_term'])
      .filter(Boolean);
    const dateStr = entry.published ?? entry.updated;
    return {
      title: stripHtml(String(entry.title?.['#text'] ?? entry.title ?? 'Untitled')),
      slug: hashSlug(link || String(entry.title)),
      url: link,
      permalink: link,
      external: true,
      institution: meta.institution,
      sourceName: meta.sourceName,
      date: dateStr ? new Date(dateStr) : new Date(),
      description: excerpt(String(content)),
      author: entry.author?.name,
      tags: cats,
    };
  });
}

async function fetchFeed(url: string, meta: FeedMeta): Promise<UnifiedPost[]> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, {
      headers: { 'user-agent': 'DataSquadInternational/1.0 (+https://datasquad.info)' },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      console.warn(`[aggregate] ${meta.sourceName}: HTTP ${res.status} from ${url}`);
      return [];
    }
    const body = await res.text();

    // JSON Feed
    if (body.trimStart().startsWith('{')) {
      const json = JSON.parse(body);
      return asArray(json.items).map((it: any): UnifiedPost => ({
        title: String(it.title ?? 'Untitled'),
        slug: hashSlug(it.url ?? it.id ?? String(it.title)),
        url: it.url ?? it.external_url ?? '',
        permalink: it.url ?? it.external_url ?? '',
        external: true,
        institution: meta.institution,
        sourceName: meta.sourceName,
        date: it.date_published ? new Date(it.date_published) : new Date(),
        description: excerpt(String(it.summary ?? it.content_text ?? it.content_html ?? '')),
        author: it.author?.name ?? it.authors?.[0]?.name,
        tags: asArray(it.tags),
      }));
    }

    const obj = parser.parse(body);
    if (obj?.rss?.channel) return parseRssItems(obj.rss.channel, meta);
    if (obj?.feed) return parseAtomEntries(obj.feed, meta);
    if (obj?.['rdf:RDF']) return parseRssItems(obj['rdf:RDF'], meta); // RSS 1.0

    console.warn(`[aggregate] ${meta.sourceName}: unrecognized feed format at ${url}`);
    return [];
  } catch (err) {
    console.warn(`[aggregate] ${meta.sourceName}: failed to fetch ${url} -`, (err as Error).message);
    return [];
  }
}

// Memoize across the build so feeds are fetched once, not per endpoint.
let _externalCache: Promise<UnifiedPost[]> | null = null;

export function getExternalPosts(): Promise<UnifiedPost[]> {
  if (!_externalCache) _externalCache = collectExternalPosts();
  return _externalCache;
}

async function collectExternalPosts(): Promise<UnifiedPost[]> {
  const institutions = await getCollection('institutions');
  const withFeeds = institutions.filter((i) => i.data.active && i.data.blog_feed_url);
  if (withFeeds.length === 0) return [];

  const results = await Promise.all(
    withFeeds.map((i) =>
      fetchFeed(i.data.blog_feed_url!, {
        institution: i.id,
        sourceName: i.data.name,
      })
    )
  );
  return results.flat();
}

// ---------------------------------------------------------------------------
// Unified accessor
// ---------------------------------------------------------------------------

export async function getAllPosts(): Promise<UnifiedPost[]> {
  const [native, external] = await Promise.all([getNativePosts(), getExternalPosts()]);
  const merged = [...native, ...external];
  // Dedup by permalink, newest first.
  const seen = new Set<string>();
  return merged
    .filter((p) => {
      if (seen.has(p.permalink)) return false;
      seen.add(p.permalink);
      return true;
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}
