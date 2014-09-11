import { LBoolean, LNumber, LString, LSymbol } from './types';

var isStringLiteral = (string) => string[0] === '"' && string[string.length - 1] === '"';
var isNumberLiteral = (string) => !isNaN(Number(string));

/**
 * Accepts a string and converts it to its appropriate datatype.
 *
 * @function atomize
 * @param {*} token The token to convert to an atom.
 * @return {LAtom} An atom.
 */
// This would be a lot goddamned easier if the lexer did more work
// TODO: Make the lexer do more goddamned work for us
var atomize = function(token) {
  if (token === 'true' || token === 'false') {
    return LBoolean(token);
  } else if (isStringLiteral(token)) {
    return LString(token);
  } else if (isNumberLiteral(token)) {
    return LNumber(token);
  } else {
    return LSymbol(token);
  }
};

/**
 * Parses an s-expression from a list of one or more tokens.
 *
 * @function parse
 * @param {Array.<string>} tokens A list of tokens to parse.
 * @return {Array.<LAtom>|LAtom} An atom or list of atoms, parsed from the input `tokens`. Atoms can
 * be one of any types listed in `types.js`.
 */
// TODO: Missing opening parens don't throw an unmatched delimiter error
var parse = function(tokens) {
  if (!tokens.length) {
    throw new Error('Unexpected EOF');
  }

  var token = tokens.shift();

  if (token === '') {
    throw new SyntaxError('Unexpected empty token');
  }

  // Expand shorthand quote forms, e.g. '(1 2 3) => (quot (1 2 3))
  if (token === '\'') {
    return [LSymbol('quote'), parse(tokens)];
  }

  if (token === '(') {
    var list = [];

    while (tokens[0] !== ')') {
      list.push(parse(tokens));
    }

    // Remove trailing ')'
    tokens.shift();

    return list;
  } else if (token === ')') {
    throw new SyntaxError(`Unmatched delimiter: ${token}`);
  } else {
    return atomize(token);
  }
};

export default parse;
