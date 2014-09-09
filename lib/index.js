import evaluate from './evaluate';
import parse from './parse';
import tokenize from './tokenize';

var lame = {
  eval(code) {
    return evaluate(parse(tokenize(code)));
  }
};

export default lame;
