import { test, expect } from '@jest/globals';
import getFixturePath from '../helpers/path.js';
import genDiff from '../index.js';

const files = [
  ['filepath1.json', 'filepath2.json'],
];

const expected = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;

test('shows difference between two json files', () => {
  files.forEach(([file1, file2]) => {
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);
    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });
});
