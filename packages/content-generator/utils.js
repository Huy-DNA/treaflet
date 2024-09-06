import fs from 'fs';

export function mkdirSync(path) {
  try {
  fs.rmdirSync(path);
  } catch {}
  try {
  fs.mkdirSync(path);
  } catch {}
}
