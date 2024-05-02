import _ from 'lodash';

const isEqualArrays = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }
  return JSON.stringify(array1) === JSON.stringify(array2);
};

const compareObjects = (parsedData1, parsedData2) => {
  const keys = Object.keys({ ...parsedData1, ...parsedData2 });
  const sortedKeys = _.orderBy(keys);

  return sortedKeys.map((key) => {
    const value1 = parsedData1[key];
    const value2 = parsedData2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      if (_.isArray(value1) && _.isArray(value2)) {
        return isEqualArrays(value1, value2) ? { key, value: value1, status: 'unchanged' }
          : { key, value: [value1, value2], status: 'changed' };
      }
      return { key, children: compareObjects(value1, value2), status: 'nested' };
    }
    if (!_.has(parsedData2, key)) {
      return { key, value: value1, status: 'removed' };
    }
    if (!_.has(parsedData1, key)) {
      return { key, value: value2, status: 'added' };
    }
    if (value1 === value2) {
      return { key, value: value1, status: 'unchanged' };
    }
    return { key, value: [value1, value2], status: 'changed' };
  });
};

export default compareObjects;
