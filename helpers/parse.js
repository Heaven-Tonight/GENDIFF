import yaml from 'js-yaml';

const map = {
  '.json': (data) => JSON.parse(data),
  '.yml': (data) => yaml.load(data),
  '.yaml': (data) => yaml.load(data),
};

const parse = (data, ext) => map[ext](data);

export default parse;
