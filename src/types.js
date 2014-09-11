/**
 * Base class. All other types inherit from this class.
 *
 * @class LAtom
 */

export class LAtom extends null {
  constructor(value) {
    Object.defineProperty(this, '_value', { value: value });
  }

  valueOf() {
    return this._value;
  }
}

LAtom.equal = function(a, b) { return a.constructor === b.constructor && a.valueOf() === b.valueOf(); };

LAtom.isAtom = value => value instanceof LAtom;

Object.freeze(LAtom);


/**
 * @class LSymbol
 */

export class LSymbol extends LAtom {}

// This should return true for all values
LSymbol.isSymbol = value => value instanceof LSymbol;

Object.freeze(LSymbol);

/**
 * @class LNumber
 */

export class LNumber extends LAtom {
  constructor(value) {
    Object.defineProperty(this, '_value', { value: Number(value) });
  }
}

LNumber.isNumber = value => value instanceof LNumber;

Object.freeze(LNumber);


/**
 * @class LString
 */

export class LString extends LAtom {
  constructor(value) {
    Object.defineProperty(this, '_value', { value: String(value) });
  }
}

LString.isString = value => value instanceof LString;

Object.freeze(LString);


/**
 * @class LBoolean
 */

export class LBoolean extends LAtom {
  constructor(value) {
    Object.defineProperty(this, '_value', { value: value === 'false' ? false : Boolean(value) });
  }
}

LBoolean.isBoolean = value => value instanceof LBoolean;

Object.freeze(LBoolean);
