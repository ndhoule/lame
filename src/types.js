/**
 * Base class. All other types inherit from this class.
 */

var lAtom = Object.create(null);

lAtom.valueOf = function() {
  return this._value;
};

export var LAtom = function(value) {
  return Object.create(lAtom, { '_value': { value: value } });
};

LAtom.isAtom = value => Object.getPrototypeOf(value) === lAtom;

LAtom.equal = (a, b) => {
  return Object.getPrototypeOf(a) === Object.getPrototypeOf(b) && a.valueOf() === b.valueOf();
};

Object.freeze(lAtom);
Object.freeze(LAtom);


/**
 * LSymbol
 */

var lSymbol = Object.create(lAtom);

export var LSymbol = function(value) {
  return Object.create(lSymbol, { '_value': { value: value } });
};

// This should return true for all values
LSymbol.isSymbol = value => Object.getPrototypeOf(value) === lSymbol;

Object.freeze(lSymbol);
Object.freeze(LSymbol);

/**
 * LNumber
 */

var lNumber = Object.create(lAtom);

export var LNumber = function(value) {
  return Object.create(lNumber, { '_value': { value: Number(value) } });
};

LNumber.isNumber = value => Object.getPrototypeOf(value) === lNumber;

Object.freeze(lNumber);
Object.freeze(LNumber);


/**
 * LString
 */

var lString = Object.create(lAtom);

export var LString = function(value) {
  return Object.create(lString, { '_value': { value: String(value) } });
};

LString.isString = value => Object.getPrototypeOf(value) === lString;

Object.freeze(lString);
Object.freeze(LString);


/**
 * LBoolean
 */

var lBoolean = Object.create(lAtom);

export var LBoolean = function(value) {
  return Object.create(lBoolean, { '_value': { value: value === 'false' ? false : Boolean(value) } });
};

LBoolean.isBoolean = value => Object.getPrototypeOf(value) === lBoolean;

Object.freeze(lBoolean);
Object.freeze(LBoolean);
