/**
 * Predicate function that determines if a value is a string.
 *
 * @function isString
 * @param {*} val The value to test.
 * @return {boolean} Returns true if `val` is a string, and false otherwise.
 */
export var isString = function(val) {
  return typeof val === 'string' || Object.prototype.toString.call(val) === '[object String]';
};

/**
 * Predicate function that determines if a value is a function.
 *
 * @function isFunction
 * @param {*} val The value to test.
 * @return {boolean} Returns true if `val` is a function, and false otherwise.
 */
export var isFunction = val => typeof val === 'function';
