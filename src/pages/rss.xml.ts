import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllPosts } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getAllPosts();
  return rss({
    title: 'DataSquad International',
    description:
      'Updates from a network of student-staffed data services programs across the US and Europe.',
    site: context.site ?? 'https://datasquad.info',
    items: posts.map((p) => ({
      title: p.title,
      pubDate: p.date,
      description: p.description,
      link: p.url,
      author: p.author,
      categories: p.tags,
      // Mark which squad a syndicated item came from.
      customData: `<source>${p.sourceName}</source>`,
    })),
    customData: '<language>en-us</language>',
  });
}
