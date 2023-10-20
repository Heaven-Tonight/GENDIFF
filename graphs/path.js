const buildPath = (data, key) => {
  const iter = (key, acc) => {
    const [ parent ] = data[key];
    if (parent === null) {
      return `${key}${acc}`;
    }
    const currentParent = Object.keys(data).find((p) => p === parent);
    return iter(currentParent, `.${key}${acc}`);
  }
  return iter(key, []);
};

export default buildPath;