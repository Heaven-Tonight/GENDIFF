import _ from 'lodash';

const genDiff = (data1, data2) => {
  const keys = Object.keys({ ...data1, ...data2 });
  const sortedKeys = _.orderBy(keys);
  const result = [];
  sortedKeys.forEach((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      result.push(` + ${key}: ${data2[key]}`);
    }
    if (!_.has(data2, key)) {
      result.push(` - ${key}: ${data1[key]}`);
    }
    if (_.has(data2, key) && _.has(data1, key)) {
      if (value1 !== value2) {
        result.push(
          ` - ${key}: ${data1[key]}`,
          ` + ${key}: ${data2[key]}`,
        );
      } else {
        result.push(`   ${key}: ${data1[key]}`);
      }
    }
  });
  const diff = `{\n${result.join('\n')}\n}`;
  console.log(diff);
};

export default genDiff;
