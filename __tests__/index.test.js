import {
  test,
  expect,
  beforeAll,
  describe,
} from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../diff.js';

const getFixturePath = (file) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const ext = path.extname(file);
  const basename = path.basename(file, ext);
  return path.join(__dirname, '..', '__fixtures__', `file${basename.slice(-1)}${ext}`);
};

const getTestFixturePath = (filepath) => path.join(process.cwd(), '__fixtures__', filepath);

const getFilesPaths = (files) => files
  .map(([file1, file2]) => [getFixturePath(file1), getFixturePath(file2)]);

const files = [
  ['filepath1.json', 'filepath2.json'],
  ['filepath1.yml', 'filepath2.yml'],
  ['filepath1.yaml', 'filepath2.yaml'],
];

const filePathsList = getFilesPaths(files);

const formatCases = [
  'stylish',
  'plain',
  'json',
];

const expectedData = [];

beforeAll(() => {
  const stylishData = fs.readFileSync(getTestFixturePath('stylish.txt'), 'utf-8');
  const plainData = fs.readFileSync(getTestFixturePath('plain.txt'), 'utf-8');
  const jsonData = fs.readFileSync(getTestFixturePath('json.txt'), 'utf-8');
  expectedData.push({
    stylish: stylishData.trim(),
    plain: plainData.trim(),
    json: jsonData.trim(),
  });
});

test('gendiff - default formatter', () => {
  const expected = expectedData[0].stylish;
  filePathsList.forEach(([filepath1, filepath2]) => {
    expect(genDiff(filepath1, filepath2)).toEqual(expected);
  });
});

describe.each(formatCases)('gendiff - formatters', (format) => {
  test(`files formatted with ${format}`, () => {
    const expected = expectedData[0][format];
    filePathsList.forEach(([filepath1, filepath2]) => {
      const actual = genDiff(filepath1, filepath2, format);
      expect(actual).toEqual(expected);
    });
  });
});
