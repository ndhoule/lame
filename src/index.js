import Lexer from './lexer';
import evaluate from './evaluate';
import expand from './expand';
import parse from './parse';
import { toJS } from './utils';

var lame = {
  eval(code) {
    return toJS(evaluate(expand(parse(Lexer.tokenize(code)))));
  }
};

export default lame;
