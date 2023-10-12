const map = {
  '.json': (data) => JSON.parse(data),
  // '.yml': (data) => // здесь д.б. yaml парсер
};

const parse = (data, ext) => map[ext](data);

export default parse;
