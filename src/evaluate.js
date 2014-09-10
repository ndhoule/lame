import * as core from './core';
import Context from './context';
import last from 'lodash.last';
import zipObject from 'lodash.zipobject';

var isSymbol = function(exp) {
  return exp instanceof String || Object.prototype.toString.call(exp) === '[object String]';
};

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
  'cons': core.cons,
  'first': core.first,
  'rest': core.rest,
  'list': core.list
});

/**
 * Evaluates an expression in a context.
 *
 * @param {Array|number|string} expr The expression to evaluate.
 * @param {Context} [context = globalContext] The context in which to evaluate the `expr`ession.
 * @return {*} The results of invoking the expression.
 */
var evaluate = function(x, context = globalContext) {
  var __,
    els,
    expr,
    exprs,
    params,
    pred,
    proc,
    then,
    value,
    variable;

  if (isSymbol(x)) {
    return context.find(x)[x];
  }

  // Is an atom
  else if (!Array.isArray(x)) {
    return x;
  }

  else if (x[0] === 'quote') {
    return x[1];
  }

  else if (x[0] === 'if') {
    [__, pred, then, els] = x;
    return evaluate(evaluate(pred, context) ? then : els, context);
  }

  else if (x[0] === 'def') {
    [__, variable, value] = x;
    context.def(variable, evaluate(value));
    return undefined;
  }

  else if (x[0] === 'lambda') {
    [__, params, expr] = x;
    return function() {
      return evaluate(expr, Context(zipObject(params, arguments), context));
    };
  }

  else if (x[0] === 'do') {
    [__, ...exprs] = x;
    return last(exprs.map(expr => evaluate(expr, context)));
  }

  else {
    exprs = x.map(function(expr) { return evaluate(expr, context); });
    proc = exprs.shift();
    return proc(...exprs);
  }
};

export default evaluate;
