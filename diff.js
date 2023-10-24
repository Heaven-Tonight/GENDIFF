import path from 'path';
import { fileURLToPath } from 'url';
import buildDifference from './helpers/diff.js';
import readFile from './helpers/read.js';
import parse from './helpers/parse.js';
import formatters from './formatters/index.js';

const getFilePath = (filepath) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(__dirname, filepath);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const [data1, data2] = [readFile(getFilePath(filepath1)), readFile(getFilePath(filepath2))];
  const [ext1, ext2] = [path.extname(filepath1), path.extname(filepath2)];
  const [parsed1, parsed2] = [parse(data1, ext1), parse(data2, ext2)];
  console.log('file1');
  console.log(JSON.stringify(parsed1, null, ' '))
  console.log('file2');
  console.log(JSON.stringify(parsed2, null, ' '))
  const diff = buildDifference(parsed1, parsed2);
  const formatted = formatters[format](diff);
  return formatted;
};

export default genDiff;
