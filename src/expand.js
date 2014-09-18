import { concat, cons } from './core';
import { LAtom, LSymbol } from './types';
import { _quasiquote, _unquote, _unquoteSplice } from './symbols';

var isPair = function(x) {
  return Array.isArray(x) && x.length !== 0;
};

var expandQuasiquote = function(x) {
  if (!isPair(x)) {
    return [LSymbol('quote'), x];
  }

  if (LAtom.equal(x[0], _unquoteSplice)) {
    throw new SyntaxError('Cannot unquote-splice immediately after a quasiquote character');
  }

  if (LAtom.equal(x[0], _unquote)) {
    return x[1];
  }
  else if (isPair(x[0]) && LAtom.equal(x[0][0], _unquoteSplice)) {
    return [concat, x[0][1], expandQuasiquote(x.slice(1))];
  }
  else {
    return [cons, expandQuasiquote(x[0]), expandQuasiquote(x.slice(1))];
  }
};

var expand = function(x) {
  if (!Array.isArray(x)) {
    return x;
  }

  if (x.length === 0) {
    return x;
  }

  if (LAtom.equal(x[0], _quasiquote)) {
    return expandQuasiquote(x[1]);
  }

  return x.map(expand);
};

export default expand;
