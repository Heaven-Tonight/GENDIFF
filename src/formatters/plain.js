const formatPlainValue = (value, status) => {
  if (Array.isArray(value)) {
    if (status !== 'changed') {
      return '[complex value]';
    }
    return value.map(formatPlainValue);
  }
  if (value === null) {
    return null;
  }
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const generatePlainMessages = (data, path) => data
  .flatMap(({
    key,
    value,
    status,
    children = [],
  }) => {
    const formattedValue = formatPlainValue(value, status);
    const propertyPath = [...path, key].join('.');

    switch (status) {
      case 'removed':
        return `Property '${propertyPath}' was removed`;
      case 'added':
        return `Property '${propertyPath}' was added with value: ${formattedValue}`;
      case 'changed':
        return `Property '${propertyPath}' was updated. From ${formattedValue[0]} to ${formattedValue[1]}`;
      default:
        return generatePlainMessages(children, [...path, key]);
    }
  });

const plain = (diff) => generatePlainMessages(diff, []).join('\n');

export default plain;
