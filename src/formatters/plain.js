const formatPlainValue = (value) => {
  if (Array.isArray(value)) {
    return value.map((val) => formatPlainValue(val));
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

const generatePlainMessages = (data, path) => Object.entries(data)
  .flatMap(([key, { children = [], status, value }]) => {
    if (children.length === 0) {
      const formattedValue = formatPlainValue(value);
      const propertyPath = [...path, key].join('.');
      switch (status) {
        case 'removed': {
          return `Property '${propertyPath}' was removed`;
        }
        case 'added': {
          return `Property '${propertyPath}' was added with value: ${formattedValue}`;
        }
        case 'changed': {
          return `Property '${propertyPath}' was updated. From ${formattedValue[0]} to ${formattedValue[1]}`;
        }
        case 'unchanged': {
          break;
        }
        default: return `Unexpected status - ${status}`;
      }
    }
    return children.flatMap((child) => generatePlainMessages(child, [...path, key]));
  });

const plain = (obj) => generatePlainMessages(obj, []).join('\n');

export default plain;
