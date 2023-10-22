import stringify from './stringify.js';

const helper = (data) => {
  const items = Object.keys(data);

  return items.reduce((acc, key) => {
    const { children = [], status } = data[key];
    if (children.length === 0) {
      const { value } = data[key];
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
    return { ...acc, [key]: children.map((item) => helper(item))[0] };
  }, {});
};

const stylish = (data) => {
  return stringify(helper(data));
};

export default stylish;
