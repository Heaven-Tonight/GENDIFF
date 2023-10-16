import _ from 'lodash';

const getDiff = (file1, file2) => {
  const keys = Object.keys({ ...file1, ...file2 });
  const sortedKeys = _.orderBy(keys);
  return sortedKeys.reduce((acc, key) => {
    const value1 = file1[key];
    const value2 = file2[key];
    if (_.isObject(value1) && _.isObject(value2)) {
      return { ...acc, [`${key}`]: getDiff(value1, value2) };
    } else {
      if (value2 === undefined) {
        return { ...acc, [`- ${key}`]: value1 };
      }
      if (value1 === undefined) {
        return { ...acc, [`+ ${key}`]: value2 };
      } else {
        if (value1 === value2) {
          return { ...acc, [`  ${key}`]: value1 };
        }
        return { ...acc, [`- ${key}`]: value1, [`+ ${key}`]: value2 };
      }
    }
  }, {});
};

export default getDiff;
