import * as core from './core';
import Context from './context';
import last from 'lodash.last';
import zipObject from 'lodash.zipobject';
import { LAtom, LSymbol } from './types';

var equal = LAtom.equal;

var _quote = LSymbol('quote');
var _if = LSymbol('if');
var _def = LSymbol('def');
var _lambda = LSymbol('lambda');
var _do = LSymbol('do');

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
  'list': core.list,
  'type': core.type
});

/**
 * Evaluates an expression in a context.
 *
 * @param {Array|number|string} x The expression to evaluate.
 * @param {Context} [context=globalContext] The context in which to evaluate the expression.
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

  if (LSymbol.isSymbol(x)) {
    return context.find(x)[x];
  }

  // Is an atom
  else if (!Array.isArray(x)) {
    return x;
  }

  else if (equal(x[0], _quote)) {
    return x[1];
  }

  else if (equal(x[0], _if)) {
    [__, pred, then, els] = x;
    // Get valueOf since object (wrappers) are always truthy
    return evaluate(evaluate(pred, context).valueOf() ? then : els, context);
  }

  else if (equal(x[0], _def)) {
    [__, variable, value] = x;
    context.def(variable, evaluate(value));
    return undefined;
  }

  else if (equal(x[0], _lambda)) {
    [__, params, expr] = x;
    return (...args) => evaluate(expr, Context(zipObject(params, args), context));
  }

  else if (equal(x[0], _do)) {
    [__, ...exprs] = x;
    return last(exprs.map(expr => evaluate(expr, context)));
  }

  else {
    exprs = x.map(expr => evaluate(expr, context));
    proc = exprs.shift();
    return proc(...exprs).valueOf();
  }
};

export default evaluate;
