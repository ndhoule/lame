export default class Lexer {
  isWhitespace(char) {
    return char === ' ' || char === '\n' || char === '\r';
  }

  consumeWhitespace(string, begin) {
    var end = begin;

    while (end < string.length && this.isWhitespace(string[end])) {
      end += 1;
    }

    return end;
  }

  // TODO: Escaped internal quotes
  token(string, begin) {
    begin = this.consumeWhitespace(string, begin);
    var end = begin;
    // TODO: Replace with a stack, and push quotes, escape seqs onto it?
    var withinStringLiteral = false;

    if (string[begin] === ')' || string[begin] === '(') {
      return [begin, begin + 1];
    }

    // Check string length to guard against overflow
    while (end < string.length) {
      var char = string[end];

      if (withinStringLiteral) {
        // Check for terminal quote, and backtrack to be sure the previous character is not an
        // escape sequence
        if (char === '"' && string[end - 1] !== '\\') {
          // End of a string literal
          end += 1;
          break;
        } else {
          // We're within a string literal, advance the cursor and ignore all other rules
        }
      } else {
        if (char === '"') {
          withinStringLiteral = true;
        }

        // Space and we're not in a quote; this is a token boundary
        if (this.isWhitespace(char)) {
          break;
        }

        // Close paren and we're not in a quote; this is a token boundary
        if (char === ')') {
          break;
        }
      }

      // Advance cursor for next call
      end += 1;
    }

    return [begin, end];
  }

  // TODO: Type check for strings
  tokenize(string) {
    var end;
    var begin = 0;
    var t;
    var tokens = [];

    while (begin < string.length) {
      [begin, end] = this.token(string, begin);
      t = string.substring(begin, end);
      t && tokens.push(t);
      begin = end;
    }

    return tokens;
  }
}

Lexer.tokenize = function(string) {
  var lexer = new Lexer();
  return lexer.tokenize(string);
};
