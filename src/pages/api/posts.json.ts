import type { APIContext } from 'astro';
import { getAllPosts } from '../../lib/posts';

export async function GET(context: APIContext) {
  const site = (context.site ?? new URL('https://datasquad.info')).href.replace(/\/$/, '');
  const posts = await getAllPosts();

  const payload = {
    generated: new Date().toISOString(),
    self: `${site}/api/posts.json`,
    count: posts.length,
    posts: posts.map((p) => ({
      title: p.title,
      url: p.url,
      permalink: p.permalink,
      date: p.date.toISOString(),
      description: p.description,
      author: p.author ?? null,
      source: p.sourceName,
      institution: p.institution ?? null,
      external: p.external,
      tags: p.tags,
    })),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
