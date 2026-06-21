import type { APIContext } from 'astro';
import { getAllPosts } from '../lib/posts';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function GET(context: APIContext) {
  const site = (context.site ?? new URL('https://datasquad.info')).href.replace(/\/$/, '');
  const posts = await getAllPosts();
  const updated = posts[0]?.date.toISOString() ?? new Date().toISOString();

  const entries = posts
    .map((p) => {
      const author = p.author ?? p.sourceName;
      const tags = p.tags
        .map((t) => `    <category term="${esc(t)}" />`)
        .join('\n');
      return `  <entry>
    <title>${esc(p.title)}</title>
    <link href="${esc(p.url)}" rel="alternate" />
    <id>${esc(p.permalink)}</id>
    <updated>${p.date.toISOString()}</updated>
    <published>${p.date.toISOString()}</published>
    <author><name>${esc(author)}</name></author>
    <source><title>${esc(p.sourceName)}</title></source>
    <summary>${esc(p.description)}</summary>
${tags}
  </entry>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>DataSquad International</title>
  <subtitle>Updates from a growing network of student-staffed data services programs.</subtitle>
  <link href="${site}/atom.xml" rel="self" />
  <link href="${site}/" />
  <id>${site}/</id>
  <updated>${updated}</updated>
${entries}
</feed>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
}
