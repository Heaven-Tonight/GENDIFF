import path from 'path';
import buildDifference from './helpers/diff.js';
import readFile from './helpers/read.js';
import parse from './helpers/parse.js';
import formatters from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const [data1, data2] = [readFile(filepath1), readFile(filepath2)];
  const [ext1, ext2] = [path.extname(filepath1), path.extname(filepath2)];
  const [parsed1, parsed2] = [parse(data1, ext1), parse(data2, ext2)];
  console.log('file1', parsed1);
  console.log('file2', parsed2);
  const diff = buildDifference(parsed1, parsed2);
  const formatted = formatters[format](diff);
  return formatted;
};

export default genDiff;
