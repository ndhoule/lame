import Lexer from './lexer';
import evaluate from './evaluate';
import parse from './parse';

var lame = {
  eval(code) {
    return evaluate(parse(Lexer.tokenize(code)));
  }
};

export default lame;
