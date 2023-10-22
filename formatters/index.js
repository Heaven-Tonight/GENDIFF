import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default {
  stylish: (diff) => stylish(diff),
  plain: (diff) => plain(diff),
  json: (diff) => json(diff),
};
