import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;
const specialSymbols = ['+', '-', ' '];

const stringify = (data) => {
  const iter = (object, depth) => {
    const bracketIndent = replacer.repeat(spacesCount * depth);

    return Object.entries(object).map(([key, value]) => {
      const firstKeySymbol = key[0];
      const additionalIndent = specialSymbols.includes(firstKeySymbol) ? 2 : 0;
      const replacerString = replacer.repeat(spacesCount * depth - additionalIndent);

      if (!_.isObject(value)) {
        return `${replacerString}${key}: ${value}`;
      }
      if (Array.isArray(value)) {
        return `${replacerString}${key}: {\n${value.map((child) => iter(child, depth + 1)).join('\n')}\n${bracketIndent}}`;
      }
      return `${replacerString}${key}: {\n${iter(value, depth + 1)}\n${bracketIndent}}`;
    })
      .join('\n');
  };

  return iter(data, 1);
};

const stringifyValueIfArray = (value) => {
  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }
  return value;
};

const generateStylishMessages = (data) => data
  .flatMap(({
    key,
    value,
    status,
    children = [],
  }) => {
    switch (status) {
      case 'removed': {
        return { [`- ${key}`]: stringifyValueIfArray(value) };
      }
      case 'added': {
        return { [`+ ${key}`]: stringifyValueIfArray(value) };
      }
      case 'changed': {
        return {
          [`- ${key}`]: stringifyValueIfArray(value[0]),
          [`+ ${key}`]: stringifyValueIfArray(value[1]),
        };
      }
      case 'unchanged': {
        return { [`  ${key}`]: stringifyValueIfArray(value) };
      }
      default: {
        return { [key]: generateStylishMessages(children) };
      }
    }
  });

const stylish = (diff) => `{\n${generateStylishMessages(diff).map(stringify).join('\n')}\n}`;

export default stylish;
