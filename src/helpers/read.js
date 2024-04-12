import { readFileSync } from 'node:fs';

export default (filepath) => readFileSync(filepath, 'utf-8');
