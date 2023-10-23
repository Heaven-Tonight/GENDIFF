import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path from 'path';

const getFixturePath = (file) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const ext = path.extname(file);
  const basename = path.basename(file, ext);
  return path.resolve(__dirname, '..', '__fixtures__', `${ext.slice(1)}`, `file${basename.slice(-1)}${ext}`);
};

const readFile = (file) => {
  const filepath = getFixturePath(file);
  return readFileSync(filepath, 'utf-8');
};

export default readFile;
