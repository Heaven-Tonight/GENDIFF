import _ from 'lodash';

const stringify = (data) => {
  const replacer = ' ';
  const spacesCount = 4;
  if (!_.isObject(data)) {
    return data.toString();
  }
  const iter = (object, depth) => {
    const specialSymbols = ['+', '-', ' '];
    const bracketIndent = replacer.repeat(spacesCount * depth);
    const keys = Object.keys(object);
    const strings = keys.map((key) => {
      const value = object[key];
      const addIntend = specialSymbols.includes(key.slice(0, 1)) ? 2 : 0;
      const replacerString = replacer.repeat(spacesCount * depth - addIntend);
      if (!_.isObject(value)) {
        return `${replacerString}${key}: ${value}`;
      }
      return `${replacerString}${key}: {\n${iter(value, depth + 1)}\n${bracketIndent}}`;
    });
    return strings.join('\n');
  };
  const string = iter(data, 1);
  return `{\n${string}\n}`;
};

export default stringify;
