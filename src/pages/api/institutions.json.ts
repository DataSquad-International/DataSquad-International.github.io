import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { getAllPosts } from '../../lib/posts';

export async function GET(context: APIContext) {
  const site = (context.site ?? new URL('https://datasquad.info')).href.replace(/\/$/, '');
  const [institutions, posts] = await Promise.all([
    getCollection('institutions'),
    getAllPosts(),
  ]);

  const countByInstitution = new Map<string, number>();
  for (const p of posts) {
    if (p.institution) {
      countByInstitution.set(p.institution, (countByInstitution.get(p.institution) ?? 0) + 1);
    }
  }

  const payload = {
    generated: new Date().toISOString(),
    self: `${site}/api/institutions.json`,
    count: institutions.length,
    institutions: institutions
      .filter((i) => i.data.active)
      .map((i) => ({
        id: i.id,
        name: i.data.name,
        url: i.data.url,
        ror_id: i.data.ror_id ?? null,
        local_program_url: i.data.local_program_url ?? null,
        blog_feed_url: i.data.blog_feed_url ?? null,
        post_count: countByInstitution.get(i.id) ?? 0,
      })),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
