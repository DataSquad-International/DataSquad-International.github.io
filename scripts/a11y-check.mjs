#!/usr/bin/env node
// Accessibility check: builds the site, serves dist/, runs pa11y (WCAG2AA)
// against every generated HTML page, prints a summary, exits 1 on any error.
import { execSync, spawn } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import pa11y from 'pa11y';

const DIST = new URL('../dist/', import.meta.url).pathname;
const PORT = 4322;

function findHtmlRoutes(dir, base = dir) {
  const routes = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      routes.push(...findHtmlRoutes(full, base));
    } else if (entry.endsWith('.html')) {
      const rel = relative(base, full).split(sep).join('/');
      routes.push('/' + rel.replace(/index\.html$/, '').replace(/\.html$/, ''));
    }
  }
  return routes;
}

console.log('Building site...');
execSync('npm run build', { stdio: 'inherit' });

const routes = findHtmlRoutes(DIST).sort();
console.log(`\nFound ${routes.length} page(s) to check.\n`);

const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], {
  stdio: 'ignore',
});

await new Promise((resolve) => setTimeout(resolve, 2500));

let totalIssues = 0;
const failures = [];

try {
  for (const route of routes) {
    const url = `http://localhost:${PORT}${route}`;
    const result = await pa11y(url, { standard: 'WCAG2AA' });
    const issues = result.issues.filter((i) => i.type === 'error');
    if (issues.length) {
      failures.push({ route, issues });
      totalIssues += issues.length;
      console.log(`✗ ${route} — ${issues.length} issue(s)`);
      for (const issue of issues) {
        console.log(`    ${issue.message}\n    ${issue.selector}`);
      }
    } else {
      console.log(`✓ ${route}`);
    }
  }
} finally {
  server.kill();
}

console.log(`\n${totalIssues === 0 ? 'All pages pass WCAG2AA.' : `${totalIssues} issue(s) across ${failures.length} page(s).`}`);
process.exit(totalIssues === 0 ? 0 : 1);
