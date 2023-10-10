import path from 'path';
import { readFileSync } from 'node:fs';

const __dirname = path.resolve();

const map = {
  json: (path) => JSON.parse(path),
  // yml: (path) => // здесь д.б. yaml парсер
};

const getFiletype = (filepath) => filepath.split('.')[1];


const parse = (filepath1, filepath2) => {
  const type1 = getFiletype(filepath1);
  const type2 = getFiletype(filepath2);
  const path1 = path.resolve(__dirname, 'files', `file${1}.${type1}`);
  const path2 = path.resolve(__dirname, 'files', `file${2}.${type2}`);
  const data1 = map[type1](readFileSync(path1));
  const data2 = map[type2](readFileSync(path2));
  console.log(data1, '\n', data2)
};

export default parse;