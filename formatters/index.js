import stylish from "./stylish.js";
import plain from "./plain.js";

export default {
  stylish: (diff) => stylish(diff),
  plain: (diff) => plain(diff),
};
