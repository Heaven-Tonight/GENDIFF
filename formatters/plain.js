import buildChildrenList from '../graphs/list.js';
import buildPath from '../graphs/path.js';

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

const plain = (obj) => {
  const childrenList = buildChildrenList(obj);

  const iter = (data) => {
    const keys = Object.keys(data);

    return keys.flatMap((key) => {
      const { children = [], status } = data[key];
      const path = buildPath(childrenList, key);
      if (children.length === 0) {
        const { value } = data[key];
        const formattedValue = formatValue(value);
        switch (status) {
          case 'removed': {
            return `Property '${path}' was removed`;
          }
          case 'added': {
            return `Property '${path}' was added with value: ${formattedValue}`;
          }
          case 'changed': {
            return `Property '${path}' was updated. From ${formattedValue[0]} to ${formattedValue[1]}`;
          }
          case 'unchanged': {
            break;
          }
          default: return `Unexpected status - ${status}`;
        }
      }
      return children.flatMap((item) => iter(item));
    });
  };
  return iter(obj).join('\n');
};

export default plain;
