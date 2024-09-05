import fs from 'fs';
import path from 'path';
import slugify from 'slugify';
import { DateTime } from 'luxon';
import url from 'url';
import { marked } from 'marked';

// basic constants
const rootDir = path.dirname(url.fileURLToPath(import.meta.url));
const outDir = path.resolve(rootDir, 'dist/');
const templatesDir = path.resolve(rootDir, 'templates/'); 

// reset
try {
  fs.rmdirSync(outDir);
} catch {}
try {
  fs.mkdirSync(outDir);
} catch {}

// read from ./posts/
const postsDir = path.resolve(rootDir, 'posts/');

const posts = [];

fs.readdirSync(postsDir).forEach((title) => {
  const postPath = path.resolve(postsDir, title);

  const postMetaPath = path.resolve(postPath, 'meta.json');
  const postMeta = JSON.parse(fs.readFileSync(postMetaPath, { encoding: 'utf8' }));

  const postContentPath = path.resolve(postPath, 'content.md');
  const postContent = marked.parse(fs.readFileSync(postContentPath, { encoding: 'utf8' }))
    .replace(/<code class="language-(.*)">/g, `<label>$1</label>$&`)
    .replace(/\`/g, `\\\``)
    .replace(/\\/g, `\\\\`)
    .replace(/\$/g, `\\\$`);

  posts.push({
    title: postMeta.title,
    slug: slugify(postMeta.title),
    createdAt: DateTime.fromFormat(postMeta.createdAt, 'D').toISO(),
    summary: postMeta.summary,
    content: postContent,
    tags: postMeta.tags.map((name) => ({ name })),
    thumbnailUrl: postMeta.thumbnailUrl || '',
  });
});

// generate posts.ts
const postsTemplateDir = path.resolve(templatesDir, 'posts.ts');
const postsTemplate = fs.readFileSync(postsTemplateDir, { encoding: 'utf8' });
const outPostsDir = path.resolve(outDir, 'posts.ts');

fs.writeFileSync(outPostsDir, postsTemplate.replace("{{ posts }}", JSON.stringify(posts.map((post) => ({ ...post, content: undefined }), 2))));

// generate post.vue
