import type { APIContext } from 'astro';
import { getAllPosts } from '../lib/posts';

export async function GET(context: APIContext) {
  const site = (context.site ?? new URL('https://datasquad.info')).href.replace(/\/$/, '');
  const posts = await getAllPosts();

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'DataSquad International',
    home_page_url: `${site}/`,
    feed_url: `${site}/feed.json`,
    description:
      'Updates from a growing network of student-staffed data services programs.',
    language: 'en-US',
    items: posts.map((p) => ({
      id: p.permalink,
      url: p.url,
      title: p.title,
      summary: p.description,
      content_text: p.description,
      date_published: p.date.toISOString(),
      authors: p.author ? [{ name: p.author }] : undefined,
      tags: p.tags.length ? p.tags : undefined,
      // Non-standard but handy: which squad this came from.
      _datasquad: { source: p.sourceName, external: p.external, institution: p.institution },
    })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: { 'Content-Type': 'application/feed+json; charset=utf-8' },
  });
}
