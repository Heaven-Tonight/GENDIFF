import { test, expect } from '@jest/globals';
import getFixturePath from '../helpers/path.js';
import genDiff from '../diff.js';

const jsonFiles = [
  ['filepath1.json', 'filepath2.json'],
];

const yamlFiles = [
  ['filepath1.yml', 'filepath2.yml'],
  ['filepath1.yaml', 'filepath2.yaml'],
];

const expected = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;

test('json flat files diff', () => {
  jsonFiles.forEach(([file1, file2]) => {
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);
    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });
});

test('yml flat files diff', () => {
  yamlFiles.forEach(([file1, file2]) => {
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);
    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });
});
