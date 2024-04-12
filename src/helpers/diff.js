import _ from 'lodash';

const compareObjects = (file1, file2) => {
  const keys = Object.keys({ ...file1, ...file2 });
  const sortedKeys = _.orderBy(keys);

  return sortedKeys.reduce((acc, key) => {
    const value1 = file1[key];
    const value2 = file2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return { ...acc, [key]: { children: [compareObjects(value1, value2)], status: 'unchanged' } };
    }
    if (value2 === undefined) {
      return { ...acc, [key]: { value: value1, status: 'removed' } };
    }
    if (value1 === undefined) {
      return { ...acc, [key]: { value: value2, status: 'added' } };
    }
    if (value1 === value2) {
      return { ...acc, [key]: { value: value1, status: 'unchanged' } };
    }
    return { ...acc, [key]: { value: [value1, value2], status: 'changed' } };
  }, {});
};

export default compareObjects;
