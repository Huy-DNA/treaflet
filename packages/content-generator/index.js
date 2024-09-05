import fs from 'fs';
import path from 'path';
import slugify from 'slugify';
import { DateTime } from 'luxon';
import url from 'url';

const rootDir = path.dirname(url.fileURLToPath(import.meta.url));

const postsDir = path.resolve(rootDir, 'posts/');

const posts = [];

fs.readdirSync(postsDir).forEach((title) => {
  const postPath = path.resolve(postsDir, title);

  const postMetaPath = path.resolve(postPath, 'meta.json');
  const postMeta = JSON.parse(fs.readFileSync(postMetaPath, { encoding: 'utf8' }));

  const postContentPath = path.resolve(postPath, 'content.md');
  const postContent = fs.readFileSync(postContentPath, { encoding: 'utf8' });

  posts.push({
    title: postMeta.title,
    slug: slugify(postMeta.title),
    createdAt: DateTime.fromFormat(postMeta.createdAt, 'D'),
    summary: postMeta.summary,
    content: postContent,
    tags: postMeta.tags.map((name) => ({ name })),
    thumbnailUrl: postMeta.thumbnailUrl || '',
  });
});
