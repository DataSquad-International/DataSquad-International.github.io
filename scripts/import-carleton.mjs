// One-time import of Carleton DataSquad projects into src/content/projects.
// Source: https://carletondatasquad.bitbucket.io (currentprojectData.js, projectData.js)
// Run from the repo root: node scripts/import-carleton.mjs
import vm from 'node:vm';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = 'https://carletondatasquad.bitbucket.io/';
const OUT = 'src/content/projects';
const IMG = 'public/img/projects';

// Judgment calls, keyed by source title + status. Paula should review these.
const TAGS = {
  'current:Data Visualization': { cat: ['Visualization & reporting'], type: 'research' },
  'current:Data Scraping': { cat: ['Data collection & scraping'], type: 'research' },
  'current:File Management for ITS': { cat: ['Tools & automation', 'Data management & infrastructure'], type: 'campus-operations' },
  'current:Labeling and Sorting Alumni Images': { cat: ['Tools & automation', 'Digitization & heritage'], type: 'campus-operations' },
  'current:Converting Stata to R': { cat: ['Reproducibility & code migration'], type: 'research' },
  'current:Project Workflow': { cat: ['Program operations'], type: 'internal' },
  'past:Data Visualization': { cat: ['Visualization & reporting'], type: 'campus-operations' },
  'past:Duplicate Faculty List into WHD Data': { cat: ['Data cleaning & integration'], type: 'campus-operations' },
  'past:ITS Survey Analysis': { cat: ['Analysis & modeling'], type: 'campus-operations' },
  'past:Visiting Accepted Students Map': { cat: ['Visualization & reporting'], type: 'campus-operations' },
  'past:Tableau Presentation & Support for a Sociology Class': { cat: ['Teaching & training'], type: 'instruction' },
  'past:Data visualization for the Career Center': { cat: ['Visualization & reporting'], type: 'campus-operations' },
  'past:Data Security Service': { cat: ['Data management & infrastructure'], type: 'campus-operations' },
  'past:Make Grading Easier': { cat: ['Tools & automation'], type: 'instruction' },
};

const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const q = (s) => JSON.stringify(s);

// Bitbucket's static host drops connections now and then; retry a few times.
async function get(url, tries = 4) {
  for (let i = 1; ; i++) {
    try {
      return await fetch(url);
    } catch (err) {
      if (i === tries) throw err;
      await new Promise((r) => setTimeout(r, 500 * i));
    }
  }
}

async function load(file) {
  const src = await (await get(BASE + file)).text();
  const ctx = {};
  vm.runInNewContext(src.replace(/^const projects/m, 'var projects'), ctx);
  return ctx.projects;
}

// Source descriptions are HTML fragments with <br />, dash lists and stray tags.
function toMarkdown(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<\/?(ul|ol|p|div|span|b|strong|i|em)[^>]*>/gi, '\n')
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([^<]*)<\/a>/gi, '[$2]($1)')
    .replace(/<[^>]+>/g, '')
    .split('\n')
    .map((l) => l.trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// "Assignee: Rachel Kim '27 and Karla Cruz Sanchez '26" -> names, class years dropped.
function parseAssignment(html) {
  const grab = (label) => {
    const m = html.match(new RegExp(`${label}:\\s*([^<]+)`, 'i'));
    return m ? m[1].trim() : undefined;
  };
  const assignee = grab('Assignee');
  const team = assignee
    ? assignee.replace(/['’]\d{2}/g, '').split(/\s*(?:,|&|\band\b)\s*/).map((n) => n.trim()).filter(Boolean)
    : [];
  return { team, client: grab('Client') };
}

async function download(rel, slug, suffix) {
  if (!rel) return undefined;
  const ext = path.extname(rel).toLowerCase() || '.png';
  const name = `carleton-${slug}${suffix}${ext}`;
  const res = await get(BASE + encodeURI(rel));
  if (!res.ok) { console.warn('missing image', rel, res.status); return undefined; }
  await fs.writeFile(path.join(IMG, name), Buffer.from(await res.arrayBuffer()));
  return `/img/projects/${name}`;
}

const seen = new Set();
for (const [status, file] of [['current', 'currentprojectData.js'], ['past', 'projectData.js']]) {
  for (const p of await load(file)) {
    const tag = TAGS[`${status}:${p.title}`];
    if (!tag) throw new Error(`No tags for ${status}:${p.title}`);
    let slug = `carleton-${slugify(p.title)}`;
    if (seen.has(slug)) slug += `-${status}`;
    seen.add(slug);
    const key = slug.replace(/^carleton-/, '');

    const { team, client } = parseAssignment(p.modalProjectAssignment || '');
    const hero = await download(p.modalImagePath || p.imagePath, key, '');
    const body = toMarkdown(p.modalDescription || '');
    // Prefer the source's own subtitle; else its first sentence (cut at a word).
    const firstSentence = body.replace(/\s+/g, ' ').match(/^.*?[.!?](?=\s|$)/)?.[0] ?? body;
    const clip = (t) => (t.length > 170 ? t.slice(0, 170).replace(/\s+\S*$/, '') + '…' : t);
    const dek = (p.modalSubtitle || '').replace(/\s+/g, ' ').trim() || clip(firstSentence.replace(/^(Task|Purpose|Goal):\s*/i, '').trim());

    const fm = [
      '---',
      `title: ${q(p.title)}`,
      `description: ${q(dek)}`,
      `institutions: ["carleton"]`,
      `status: ${status}`,
      `partner: ${q(p.description.replace('Techonology', 'Technology'))}`,
      `partnerType: ${q(tag.type)}`,
      client && `client: ${q(client)}`,
      team.length && `team: [${team.map(q).join(', ')}]`,
      `category: [${tag.cat.map(q).join(', ')}]`,
      hero && `heroImage: ${q(hero)}`,
      hero && `heroImageAlt: ${q(`Screenshot from the ${p.title} project`)}`,
      `sourceUrl: ${q(BASE + (status === 'current' ? '#projects' : 'pastproj.html'))}`,
      '---',
      '',
      body,
      '',
    ].filter((l) => l !== undefined && l !== false && l !== 0).join('\n');

    await fs.writeFile(path.join(OUT, `${slug}.md`), fm);
    console.log('wrote', slug, '|', team.join(', ') || '(no assignee)');
  }
}
