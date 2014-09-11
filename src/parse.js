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

  // Expand shorthand quote forms, e.g. '(1 2 3) => (quot (1 2 3))
  if (token === '\'') {
    // Begin an quoted form; we're going to figure out where to insert the closing paren
    token = '(';
    tokens.unshift('quote');

    var insertAt = 2;

    // If we're quoting a list, find where to add a close parenthesis
    if (tokens[1] === '(') {
      // Maintain a stack of all open parens so we can find `tokens[0]`'s matching close paren
      var openParens = 1;

      while (insertAt < tokens.length) {
        if (tokens[insertAt] === '(') {
          openParens += 1;
        } else if (tokens[insertAt] === ')') {
          if (!(openParens -= 1)) {
            // Stack is empty, we've found the matching close paren
            break;
          }
        }

        insertAt += 1;
      }
    }

    // Insert the closing parenthesis
    tokens.splice(insertAt, 0, ')');
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
    throw new SyntaxError('Unexpected )');
  } else {
    return atomize(token);
  }
};

export default parse;
