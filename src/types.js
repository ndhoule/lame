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

LAtom.isAtom = value => Object.getPrototypeOf(value) === lAtom;

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

// This should return true for all values
LSymbol.isSymbol = value => Object.getPrototypeOf(value) === lSymbol;

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

LNumber.isNumber = value => Object.getPrototypeOf(value) === lNumber;

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

LString.isString = value => Object.getPrototypeOf(value) === lString;

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

LBoolean.isBoolean = value => Object.getPrototypeOf(value) === lBoolean;

Object.freeze(LBoolean);
