const formatValue = (value) => {
  if (Array.isArray(value)) {
    return value.map((val) => formatValue(val));
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

const helper = (data, path) => Object.keys(data).flatMap((key) => {
  const { children = [], status } = data[key];
  if (children.length === 0) {
    const { value } = data[key];
    const formattedValue = formatValue(value);
    switch (status) {
      case 'removed': {
        return `Property '${[...path, key]
          .join('.')}' was removed`;
      }
      case 'added': {
        return `Property '${[...path, key]
          .join('.')}' was added with value: ${formattedValue}`;
      }
      case 'changed': {
        return `Property '${[...path, key]
          .join('.')}' was updated. From ${formattedValue[0]} to ${formattedValue[1]}`;
      }
      case 'unchanged': {
        break;
      }
      default: return `Unexpected status - ${status}`;
    }
  }
  return children.flatMap((child) => helper(child, [...path, key]));
});

const plain = (obj) => helper(obj, []).join('\n');

export default plain;
