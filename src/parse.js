var atom = function(token) {
  if (token === 'true') {
    return true;
  } else if (token === 'false') {
    return false;
  } else {
    var int = parseFloat(token);
    return isNaN(Number(int)) ? token : int;
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
    return atom(token);
  }
};

export default parse;
