const buildPath = (data, key) => {
  const iter = (currentKey, path) => {
    const [parent] = data[currentKey];
    if (parent === null) {
      return `${currentKey}${path}`;
    }
    const currentParent = Object.keys(data).find((p) => p === parent);
    return iter(currentParent, `.${currentKey}${path}`);
  };
  return iter(key, []);
};

export default buildPath;
