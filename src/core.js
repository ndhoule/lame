export var add = (...exprs) => exprs.reduce((acc, val) => acc + val);

export var divide = (...exprs) => exprs.reduce((acc, val) => acc / val);

export var multiply = (...exprs) => exprs.reduce((acc, val) => acc * val);

export var subtract = (...exprs) => exprs.reduce((acc, val) => acc - val);

export var lt = (a, b) => a < b;

export var lte = (a, b) => a <= b;

export var gt = (a, b) => a > b;

export var gte = (a, b) => a >= b;

export var first = (list) => list[0];

export var rest = (list) => list.slice(1);

export var eq = (x, y) => x === y;

export var list = (...elems) => elems;

export var cons = (a, b) => {
  if (!Array.isArray(b)) {
    throw new TypeError('Expected a list');
  }

  return [a, ...b];
};

export var type = (value) => value._type;
