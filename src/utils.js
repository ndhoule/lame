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

/**
 * Converts Lame data structure(s) to a JavaScript-readable structure. Basically, just recursively
 * unboxes values from their wrapper objects.
 *
 * @param {*} value A single or array of Lame data structures.
 * @return {*} Returns a single or list of JavaScript values.
 */
export var toJS = (value) => Array.isArray(value) ? value.map(toJS) : value.valueOf();

/**
 * Converts Lame data structure(s) to a JavaScript-readable structure.
 *
 * @param value
 * @return {undefined} Returns undefined, logs information to the scren.
 */
export var log = (value) => console.log(toJS(value));
