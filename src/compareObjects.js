import _ from 'lodash';

const compareObjects = (parsedData1, parsedData2) => {
  const keys = Object.keys({ ...parsedData1, ...parsedData2 });
  const sortedKeys = _.orderBy(keys);

  return sortedKeys.map((key) => {
    const value1 = parsedData1[key];
    const value2 = parsedData2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, children: compareObjects(value1, value2), status: 'nested' };
    }
    if (!_.has(parsedData2, key)) {
      return { key, value: value1, status: 'removed' };
    }
    if (!_.has(parsedData1, key)) {
      return { key, value: value2, status: 'added' };
    }
    if (_.isEqual(value1, value2)) {
      return { key, value: value1, status: 'unchanged' };
    }
    return { key, value: [value1, value2], status: 'changed' };
  });
};

export default compareObjects;
