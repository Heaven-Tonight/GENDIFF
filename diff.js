import path from 'path';
import getDiff from './helpers/diff.js';
import readFile from './helpers/read.js';
import parse from './helpers/parse.js';
import stylish from './stylish.js';

// const formats = {
//   stylish: (diff) => stylish(diff),
// };

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const [data1, data2] = [readFile(filepath1), readFile(filepath2)];
  const [ext1, ext2] = [path.extname(filepath1), path.extname(filepath2)];
  const [parsed1, parsed2] = [parse(data1, ext1), parse(data2, ext2)];
  const diff = getDiff(parsed1, parsed2);
  console.log(diff);
  // const result = formats.format(diff);
  // return result;
};

export default genDiff;
