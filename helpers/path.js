import path from 'path';

const getFixturePath = (file) => {
  const ext = path.extname(file);
  const basename = path.basename(file, ext);
  return path.join(process.cwd(), '__fixtures__', `${ext.slice(1)}`, `file${basename.slice(-1)}${ext}`);
};

export default getFixturePath;
