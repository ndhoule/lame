import Lexer from './lexer';
import evaluate from './evaluate';
import expand from './expand';
import parse from './parse';

// In Lame, all values are wrapped in object wrappers that correspond to their type. In order to
// interpret them correctly in JS, we need to unwrap them into JS primitives.
var toJS = function(value) {
  return Array.isArray(value) ? value.map(toJS) : value.valueOf();
};

var lame = {
  eval(code) {
    return toJS(evaluate(expand(parse(Lexer.tokenize(code)))));
  }
};

export default lame;
