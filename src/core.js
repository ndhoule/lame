import { LFunction, LNil, LString } from './types';

export var add = LFunction((...exprs) => exprs.reduce((acc, val) => acc + val));

export var divide = LFunction((...exprs) => exprs.reduce((acc, val) => acc / val));

export var multiply = LFunction((...exprs) => exprs.reduce((acc, val) => acc * val));

export var subtract = LFunction((...exprs) => exprs.reduce((acc, val) => acc - val));

export var lt = LFunction((a, b) => a < b);

export var lte = LFunction((a, b) => a <= b);

export var gt = LFunction((a, b) => a > b);

export var gte = LFunction((a, b) => a >= b);

export var car = LFunction((list) => list.length !== 0 ? list[0] : LNil());

export var cdr = LFunction((list) => list.slice(1));

export var eq = LFunction((x, y) => x.valueOf() === y.valueOf());

export var list = LFunction((...elems) => elems);

export var cons = LFunction((a, b) => {
  if (!Array.isArray(b)) {
    throw new TypeError('Expected a list');
  }

  return [a, ...b];
});

export var concat = LFunction(function() {
 return Array.prototype.concat.apply([], arguments);
});

export var type = LFunction((value) => LString(value._type));
