import * as core from './core';
import Context from './context';
import last from 'lodash.last';
import zipObject from 'lodash.zipobject';
import { LAtom, LFunction, LSymbol, LNil } from './types';

var equal = LAtom.equal;

var _cond = LSymbol('cond');
var _def = LSymbol('def');
var _do = LSymbol('do');
var _lambda = LSymbol('lambda');
var _quote = LSymbol('quote');

// Create a global context with primitive globals.
var globalContext = Context({
  '=': core.eq,
  '*': core.multiply,
  '+': core.add,
  '-': core.subtract,
  '/': core.divide,
  '<': core.lt,
  '<=': core.lte,
  '>': core.gt,
  '>=': core.gte,
  'car': core.car,
  'cdr': core.cdr,
  'cons': core.cons,
  'list': core.list,
  'type': core.type,

  // Aliases
  'first': core.car,
  'rest': core.cdr
});

/**
 * Evaluates an expression in a context.
 *
 * @param {Array|number|string} x The expression to evaluate.
 * @param {Context} [context=globalContext] The context in which to evaluate the expression.
 * @return {*} The results of invoking the expression.
 */
var evaluate = function(x, context = globalContext) {
  var __, expr, exprs, params, proc, value, variable;

  if (LSymbol.isSymbol(x)) {
    return context.find(x);
  }

  else if (!Array.isArray(x)) {
    return x;
  }

  else if (equal(x[0], _quote)) {
    return x[1];
  }

  // __proto__ problem
  else if (equal(x[0], _def)) {
    [__, variable, value] = x;
    context.def(variable, evaluate(value));
    // Return the name of the instantiated variable.
    // TODO: Return a symbol instead
    return `#${variable}`;
  }

  else if (equal(x[0], _lambda)) {
    [__, params, expr] = x;
    return LFunction((...args) => evaluate(expr, Context(zipObject(params, args), context)));
  }

  else if (equal(x[0], _cond)) {
    exprs = x.slice(1);
    for (expr of exprs) {
      if (evaluate(expr[0], context).valueOf()) {
        return evaluate(expr[1], context);
      }
    }
    return LNil();
  }

  else if (equal(x[0], _do)) {
    [__, ...exprs] = x;
    return last(exprs.map(expr => evaluate(expr, context)));
  }

  else {
    exprs = x.map(expr => evaluate(expr, context));
    proc = exprs.shift();

    if (!LFunction.isFunction(proc)) {
      throw new SyntaxError(`Expected a function but instead received a ${core.type(proc)}`);
    }

    return proc.invoke(...exprs);
  }
};

export default evaluate;
