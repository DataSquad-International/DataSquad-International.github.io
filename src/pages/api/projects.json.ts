import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import {
  PROJECT_CATEGORIES,
  PARTNER_TYPES,
  PARTNER_TYPE_PHRASE,
  SELECTIONS,
  SELECTION_PHRASE,
} from '../../lib/project-vocab';

export async function GET(context: APIContext) {
  const site = (context.site ?? new URL('https://datasquad.info')).href.replace(/\/$/, '');
  const projects = await getCollection('projects', ({ data }) => !data.draft);

  const payload = {
    generated: new Date().toISOString(),
    self: `${site}/api/projects.json`,
    count: projects.length,
    // The shared vocabulary every squad tags projects with. Adopting squads
    // should use these values so work compares across programs.
    vocabulary: {
      categories: PROJECT_CATEGORIES,
      partner_types: PARTNER_TYPES.map((id) => ({ id, phrase: PARTNER_TYPE_PHRASE[id] })),
      selections: SELECTIONS.map((id) => ({ id, phrase: SELECTION_PHRASE[id] })),
    },
    projects: projects.map((p) => ({
      id: p.id,
      title: p.data.title,
      description: p.data.description,
      institutions: p.data.institutions,
      status: p.data.status,
      selection: p.data.selection,
      years: p.data.years ?? null,
      partner: p.data.partner ?? null,
      partner_type: p.data.partnerType ?? null,
      categories: p.data.category,
      tools: p.data.tools,
      team: p.data.team,
      url: p.data.url ?? `${site}/projects/${p.id}`,
      source_url: p.data.sourceUrl ?? null,
      image: p.data.heroImage ? `${site}${p.data.heroImage}` : null,
    })),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
