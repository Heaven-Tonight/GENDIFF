import path from 'path';

const getFixturePath = (file) => {
  const __dirname = path.resolve();
  const fileInfo = path.parse(file);
  return path.resolve(__dirname, '__fixtures__', `file${fileInfo.name.slice(-1)}${fileInfo.ext}`);
};

export default getFixturePath;
