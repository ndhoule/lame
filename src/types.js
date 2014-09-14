var isA = function(source) {
  return (value) => Object.getPrototypeOf(value) === source;
};

/**
 * Atom. Base class. All other types inherit from this class.
 */

var lAtom = Object.create(null);

lAtom.valueOf = function() {
  return this._value;
};

Object.freeze(lAtom);


export var LAtom = function(value) {
  return Object.create(lAtom, {
    '_type': { value: 'atom' },
    '_value': { value: value }
  });
};

LAtom.isAtom = isA(lAtom);

LAtom.equal = (a, b) => {
  return Object.getPrototypeOf(a) === Object.getPrototypeOf(b) && a.valueOf() === b.valueOf();
};

Object.freeze(LAtom);


/**
 * LSymbol
 */

var lSymbol = Object.create(lAtom);

Object.freeze(lSymbol);


export var LSymbol = function(value) {
  return Object.create(lSymbol, {
    '_type': { value: 'symbol' },
    '_value': { value: value }
  });
};

LSymbol.isSymbol = isA(lSymbol);

Object.freeze(LSymbol);

/**
 * LNumber
 */

var lNumber = Object.create(lAtom);

Object.freeze(lNumber);


export var LNumber = function(value) {
  return Object.create(lNumber, {
    '_type': { value: 'number' },
    '_value': { value: Number(value) }
  });
};

LNumber.isNumber = isA(lNumber);

Object.freeze(LNumber);


/**
 * LString
 */

var lString = Object.create(lAtom);

Object.freeze(lString);


export var LString = function(value) {
  return Object.create(lString, {
    '_type': { value: 'string' },
    '_value': { value: String(value) }
  });
};

LString.isString = isA(lString);

Object.freeze(LString);


/**
 * LBoolean
 */

var lBoolean = Object.create(lAtom);

Object.freeze(lBoolean);


export var LBoolean = function(value) {
  return Object.create(lBoolean, {
    '_type': { value: 'boolean' },
    '_value': { value: value === 'false' ? false : Boolean(value) }
  });
};

LBoolean.isBoolean = isA(lBoolean);

Object.freeze(LBoolean);


/**
 * LNil
 */

var lNil = Object.create(lAtom);

Object.freeze(lNil);

export var LNil = function() {
  return Object.create(lNil, {
    '_type': { value: 'nil' },
    '_value': { value: null }
  });
};

LNil.isNil = isA(lNil);

Object.freeze(LNil);


/**
 * LFunction
 */

var lFunction = Object.create(lAtom);

lFunction.invoke = function() {
  return this._value.apply(null, arguments);
};

Object.freeze(lFunction);

export var LFunction = function(fn) {
  return Object.create(lFunction, {
    // TODO
    //'_arity': { value: xxx },
    '_type': { value: 'function' },
    '_value': { value: fn }
  });
};

LFunction.isFunction = isA(lFunction);

Object.freeze(LFunction);
