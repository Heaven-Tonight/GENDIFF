import _ from 'lodash';

const stringify = (data) => {
  const replacer = ' ';
  const spacesCount = 4;
  const specialSymbols = ['+', '-', ' '];
  if (!_.isObject(data)) {
    return data.toString();
  }
  const iter = (object, depth) => {
    const bracketIndent = replacer.repeat(spacesCount * depth);
    const keys = Object.keys(object);
    const strings = keys.map((key) => {
      const value = object[key];
      const firstKeySymbol = key[0];
      const additionalIndent = specialSymbols.includes(firstKeySymbol) ? 2 : 0;
      const replacerString = replacer.repeat(spacesCount * depth - additionalIndent);
      if (!_.isObject(value)) {
        return `${replacerString}${key}: ${value}`;
      }
      return `${replacerString}${key}: {\n${iter(value, depth + 1)}\n${bracketIndent}}`;
    });
    const string = strings.join('\n');
    return string;
  };
  const string = iter(data, 1);
  return `{\n${string}\n}`;
};

const generateStylishMessages = (data) => Object.entries(data)
  .reduce((acc, [key, { children = [], status, value }]) => {
    if (children.length === 0) {
      switch (status) {
        case 'removed': {
          return { ...acc, [`- ${key}`]: value };
        }
        case 'added': {
          return { ...acc, [`+ ${key}`]: value };
        }
        case 'changed': {
          return {
            ...acc,
            [`- ${key}`]: value[0],
            [`+ ${key}`]: value[1],
          };
        }
        case 'unchanged': {
          return { ...acc, [`  ${key}`]: value };
        }
        default: return `Unexpected status - ${status}`;
      }
    }
    const [childrenData] = children;
    return { ...acc, [key]: generateStylishMessages(childrenData) };
  }, {});

const stylish = (data) => stringify(generateStylishMessages(data));

export default stylish;
