import path from 'path';
import { readFileSync } from 'node:fs';
import genDiff from './index.js';

const __dirname = path.resolve();

const map = {
  json: (filepath) => JSON.parse(filepath),
  // yml: (filepath) => // здесь д.б. yaml парсер
};

const getFiletype = (filepath) => filepath.split('.')[1];

const parse = (filepath1, filepath2) => {
  const type1 = getFiletype(filepath1);
  const type2 = getFiletype(filepath2);
  const path1 = path.resolve(__dirname, 'files', `file${1}.${type1}`);
  const path2 = path.resolve(__dirname, 'files', `file${2}.${type2}`);
  const data1 = map[type1](readFileSync(path1));
  const data2 = map[type2](readFileSync(path2));
  genDiff(data1, data2);
};

export default parse;
