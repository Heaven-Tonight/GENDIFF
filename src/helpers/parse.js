import yaml from 'js-yaml';

const parsers = {
  '.json': (data) => JSON.parse(data),
  '.yml': (data) => yaml.load(data),
  '.yaml': (data) => yaml.load(data),
};

const parse = (data, ext) => parsers[ext](data);

export default parse;
