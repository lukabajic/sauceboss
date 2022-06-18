exports.isArrayWithItems = (arr) => Array.isArray(arr) && arr.length > 0;

exports.isEmpty = (obj) =>
  obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
