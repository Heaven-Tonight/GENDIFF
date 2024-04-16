import path from 'path';
import { fileURLToPath } from 'url';

import compareObjects from './compareObjects.js';
import readFile from './read.js';
import parse from './parsers.js';
import formatters from './formatters/index.js';

const getFilePath = (filepath) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(__dirname, filepath);
};

const genDiff = (parsedData1, parsedData2, format = 'stylish') => {
  const data1 = readFile(getFilePath(parsedData1));
  const data2 = readFile(getFilePath(parsedData2));

  const ext1 = path.extname(parsedData1);
  const ext2 = path.extname(parsedData2);

  const parsed1 = parse(data1, ext1);
  const parsed2 = parse(data2, ext2);

  const diff = compareObjects(parsed1, parsed2);
  const formattedDiffResult = formatters[format](diff);

  return formattedDiffResult;
};

export default genDiff;
