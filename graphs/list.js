const buildChildrenList = (obj, parent = null) => Object.keys(obj)
  .reduce((acc, key) => {
    const { children } = obj[key];
    if (children === undefined) {
      return {
        ...acc,
        [key]: [parent, []],
      };
    }
    const list = children.flatMap((item) => Object.keys(item));
    return {
      ...acc,
      [key]: [parent, list],
      ...children.reduce((accum, value) => ({ ...accum, ...buildChildrenList(value, key) }), {}),
    };
  }, {});

export default buildChildrenList;
