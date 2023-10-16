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
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const checkFiles = (files) => {
  files.forEach(([file1, file2]) => {
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);
    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });
};

test('json flat files diff', () => {
  checkFiles(jsonFiles);
});

test('yml flat files diff', () => {
  checkFiles(yamlFiles);
});
