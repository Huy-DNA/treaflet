import fs from 'fs';
import path from 'path';
import slugify from 'slugify';
import { DateTime } from 'luxon';
import url from 'url';
import { marked } from 'marked';
import { mkdirSync } from './utils.js';

// basic constants
const rootDir = path.dirname(url.fileURLToPath(import.meta.url));
const outDir = path.resolve(rootDir, 'dist/');
const templatesDir = path.resolve(rootDir, 'templates/'); 

// reset
mkdirSync(outDir);

// read from ./posts/
const postsDir = path.resolve(rootDir, 'posts/');

const posts = [];

fs.readdirSync(postsDir).forEach((title) => {
  const postPath = path.resolve(postsDir, title);

  const postMetaPath = path.resolve(postPath, 'meta.json');
  const postMeta = JSON.parse(fs.readFileSync(postMetaPath, { encoding: 'utf8' }));

  const postContentPath = path.resolve(postPath, 'content.md');
  const postContent = marked.parse(fs.readFileSync(postContentPath, { encoding: 'utf8' }))
    .replaceAll(/<code class="language-(.*)">/g, `<label>$1</label>$&`)
    .replaceAll(/\`/g, `\\\``)
    .replaceAll(/\\/g, `\\\\`)

  posts.push({
    title: postMeta.title,
    slug: slugify(postMeta.title, { lower: true, remove: /[^a-zA-Z_0-9 ]/ }),
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

fs.writeFileSync(outPostsDir, postsTemplate.replace("{{{ posts }}}", JSON.stringify(posts.map((post) => ({ ...post, content: undefined }), 2))));

// generate post.vue
const postTemplateDir = path.resolve(templatesDir, 'post.vue');
const postTemplate = fs.readFileSync(postTemplateDir, { encoding: 'utf8' });
posts.forEach((post) => {
  const { slug } = post;
  mkdirSync(path.resolve(outDir, 'posts/'));
  const outPostDir = path.resolve(outDir, 'posts/', `${slug}.vue`);

  const postVueContent = postTemplate
    .replaceAll('{{{ title }}}', JSON.stringify(post.title))
    .replaceAll('{{{ slug }}}', JSON.stringify(post.slug))
    .replaceAll('{{{ createdAt }}}', JSON.stringify(post.createdAt))
    .replaceAll('{{{ summary }}}', JSON.stringify(post.summary))
    .replaceAll('{{{ content }}}', JSON.stringify(post.content))
    .replaceAll('{{{ tags }}}', JSON.stringify(post.tags))
    .replaceAll('{{{ thumbnailUrl }}}', JSON.stringify(post.thumbnailUrl));

  fs.writeFileSync(outPostDir, postVueContent);
});
