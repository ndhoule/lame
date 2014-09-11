import { LBoolean, LNumber, LString, LSymbol } from './types';

var isStringLiteral = function(string) {
  return string[0] === '"' && string[string.length - 1] === '"';
};

var isNumeric = function(string) {
  return !isNaN(Number(string));
};

// This would be a lot goddamned easier if the lexer did more work
// TODO: Make the lexer do more goddamned work for us
var atomize = function(token) {
  if (token === 'true' || token === 'false') {
    return LBoolean(token);
  } else if (isStringLiteral(token)) {
    return LString(token);
  } else if (isNumeric(token)) {
    return LNumber(token);
  } else {
    return LSymbol(token);
  }
};

// Reads an expression from a list of tokens.
var parse = function(tokens) {
  if (!tokens.length) {
    throw new Error('Unexpected EOF');
  }

  var token = tokens.shift();

  if (token === '(') {
    var l = [];

    while (tokens[0] !== ')') {
      l.push(parse(tokens));
    }

    // Remove trailing ')'
    tokens.shift();

    return l;
  } else if (token === ')') {
    throw new TypeError('Unexpected )');
  } else {
    return atomize(token);
  }
};

export default parse;
