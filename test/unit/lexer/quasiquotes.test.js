import Lexer from '../../../src/lexer';

describe('lexer » quasiquote', function() {
  it('should lex the backtick (`) as a token', function() {
    var code = '`(+ 1 2)';
    var expected = ['`', '(', '+', '1', '2', ')'];

    expect(Lexer.tokenize(code)).to.deep.equal(expected);
  });
});

describe('lexer » unquote', function() {
  it('should lex the tilde (~) as a token', function() {
    var code = '`(+ 1 ~(+ 1 2))';
    var expected = ['`', '(', '+', '1', '~', '(', '+', '1', '2', ')', ')'];

    expect(Lexer.tokenize(code)).to.deep.equal(expected);
  });
});

xdescribe('lexer » unquote-splicing', function() {
  it('should lex the tilde-at (~@) as a token', function() {
    var code = '`(+ 1 ~@(list 1 2))';
    var expected = ['`', '(', '+', '1', '~@', '(', 'list', '1', '2',')', ')'];

    expect(Lexer.tokenize(code)).to.deep.equal(expected);
  });
});
