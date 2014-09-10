/**
 * Special Characters
 */

var LINE_BREAK = 10;
var CARRIAGE_RETURN = 13;
var SPACE = 32;
var DOUBLE_QUOTE = 34;
var SINGLE_QUOTE = 39;
var LEFT_PARENTHESIS = 40;
var RIGHT_PARENTHESIS = 41;
var COMMA = 44;
var ESCAPE = 92;

/**
 * Accepts a character code and determines if it is a whitespace character.
 *
 * @function isWhitespace
 * @param {number} code A character code.
 * @return {boolean} Returns `true` if the character code is whitespace and `false` otherwise.
 */
var isWhitespace = (function() {
  var WHITESPACE = Object.create(null);
  WHITESPACE[LINE_BREAK] = true;
  WHITESPACE[CARRIAGE_RETURN] = true;
  WHITESPACE[SPACE] = true;
  WHITESPACE[COMMA] = true;

  return function(code) {
    return code in WHITESPACE;
  };
}());

/**
 * Accepts a string and a numeric index (cursor), and fast-forwards through a string until a
 * non-whitespace character is found. Returns the index at which that character can be found.
 *
 * @function getFirstNonWhitespaceIndex
 * @param {string} string The string to scan.
 * @param {number} [cursor=0] The position at which to start scanning the string.
 * @return {number} The index where the first non-whitespace character following `cursor` is
 * located, or the last index in string, whichever is first.
 */
var getFirstNonWhitespaceIndex = function(string, cursor = 0) {
  while (cursor < string.length && isWhitespace(string.charCodeAt(cursor))) {
    cursor += 1;
  }

  return cursor;
};

/**
 * Creates a lexer instance.
 *
 * @class Lexer
 * @return {Lexer}
 */
export default class Lexer {
  /**
   * Accepts a string and a `start` index, and returns the first token from the string.
   *
   * @memberof Lexer
   * @function getTokenBoundaries
   * @param {string} string The string to search for a token.
   * @param {number} start The index at which to start searching the `string`.
   * @return {Array} A pair of indices in `[start, end]` format, where `start` is the first index of
   * the token, and `end` is the last index of the token in the `string`.
   */
  getTokenBoundaries(string, start = 0) {
    // Consume any leading whitespace from the input string
    start = getFirstNonWhitespaceIndex(string, start);

    var end = start;
    var char = string.charCodeAt(end);
    var inStringLiteral = false;

    // Check for a single parenthetical and return early if possible
    if (char === LEFT_PARENTHESIS || char === RIGHT_PARENTHESIS) {
      return [start, start + 1];
    }

    while (end < string.length) {
      if (inStringLiteral) {
        // Is a string literal, special rule mode
        if (char === DOUBLE_QUOTE && string.charCodeAt(end - 1) !== ESCAPE) {
          // Is terminal quote (end of string literal) and is not escaped
          end += 1;
          break;
        }
      } else {
        // Not a string literal, normal rules apply
        if (char === DOUBLE_QUOTE) {
          // Begin string literal
          inStringLiteral = true;
        } else if (char === SINGLE_QUOTE) {
          // Begin `quot`ed form
          end += 1;
          break;
        } else if (isWhitespace(char)) {
          // Whitespace indicates a token boundary
          break;
        } else if (char === RIGHT_PARENTHESIS) {
          // Close paren indicates the boundary of a token
          break;
        }
      }

      // Advance cursor and move onto next character
      end += 1;
      char = string.charCodeAt(end);
    }

    return [start, end];
  }

  /**
   * Transforms a string into a list of tokens.
   *
   * @function tokenize
   * @memberof Lexer
   * @param {string} string The string to tokenize.
   * @return {Array} An array of tokens.
   */
  tokenize(string) {
    var end, token;
    var start = 0;
    var tokens = [];

    while (start < string.length) {
      // Get the start and end indices of a token
      [start, end] = this.getTokenBoundaries(string, start);
      // Get the token and add it to the output list
      token = string.substring(start, end);
      // Guard against empty tokens
      // FIXME: Not sure why this happens, but there's probably a better way to avoid it
      token && tokens.push(token);
      // Reset cursor for next token
      start = end;
    }

    return tokens;
  }
}

Lexer.tokenize = function(string) {
  var lexer = new Lexer();
  return lexer.tokenize(string);
};