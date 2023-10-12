import _ from 'lodash';
import path from 'path';
import readFile from './helpers/read.js';
import parse from './helpers/parse.js';

const genDiff = (filepath1, filepath2) => {
  const [data1, data2] = [readFile(filepath1), readFile(filepath2)];
  const [ext1, ext2] = [path.extname(filepath1), path.extname(filepath2)];
  const [parsed1, parsed2] = [parse(data1, ext1), parse(data2, ext2)];
  const keys = Object.keys({ ...parsed1, ...parsed2 });
  const sortedKeys = _.orderBy(keys);
  const result = [];
  sortedKeys.forEach((key) => {
    const value1 = parsed1[key];
    const value2 = parsed2[key];
    if (!_.has(parsed1, key)) {
      result.push(` + ${key}: ${parsed2[key]}`);
    }
    if (!_.has(parsed2, key)) {
      result.push(` - ${key}: ${parsed1[key]}`);
    }
    if (_.has(parsed2, key) && _.has(parsed1, key)) {
      if (value1 !== value2) {
        result.push(
          ` - ${key}: ${parsed1[key]}`,
          ` + ${key}: ${parsed2[key]}`,
        );
      } else {
        result.push(`   ${key}: ${parsed1[key]}`);
      }
    }
  });
  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
