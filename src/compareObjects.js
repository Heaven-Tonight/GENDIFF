import _ from 'lodash';

const compareObjects = (parsedData1, parsedData2) => {
  const keys = Object.keys({ ...parsedData1, ...parsedData2 });
  const sortedKeys = _.orderBy(keys);
  const result = {};

  sortedKeys.forEach((key) => {
    const value1 = parsedData1[key];
    const value2 = parsedData2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      const nestedValue = compareObjects(value1, value2);
      result[key] = { children: [nestedValue], status: 'nested' };
    } else if (value2 === undefined) {
      result[key] = { value: value1, status: 'removed' };
    } else if (value1 === undefined) {
      result[key] = { value: value2, status: 'added' };
    } else if (value1 === value2) {
      result[key] = { value: value1, status: 'unchanged' };
    } else {
      result[key] = { value: [value1, value2], status: 'changed' };
    }
  });

  return result;
};

export default compareObjects;
