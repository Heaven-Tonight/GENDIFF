import { readFileSync } from 'node:fs';
import getFixturePath from './path.js';

const readFile = (file) => {
  const filepath = getFixturePath(file);
  return readFileSync(filepath, 'utf-8');
};

export default readFile;
