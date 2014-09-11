import Lexer from '../../../src/lexer';

describe('lexer » parentheses', function() {
  it('should handle empty parentheses', function() {
    expect(Lexer.tokenize('()')).to.deep.equal(['(', ')']);
    expect(Lexer.tokenize('(())')).to.deep.equal(['(', '(', ')', ')']);
    expect(Lexer.tokenize('( ( ) )')).to.deep.equal(['(', '(', ')', ')']);
  });

  it('should handle unbalanced parentheses', function() {
    expect(Lexer.tokenize('(')).to.deep.equal(['(']);
    expect(Lexer.tokenize('())')).to.deep.equal(['(', ')', ')']);
    expect(Lexer.tokenize('((')).to.deep.equal(['(', '(']);
    expect(Lexer.tokenize(')(')).to.deep.equal([')', '(']);
  });

  it('should handle parentheses with contents', function() {
    var code = '(list 1 2 3)';
    var expected = ['(', 'list', '1', '2', '3', ')'];

    expect(Lexer.tokenize(code)).to.deep.equal(expected);
  });

  it('should handle parentheses with nested parentheses', function() {
    var code = '(list 1 2 (quot (3)))';
    var expected = ['(', 'list', '1', '2', '(', 'quot', '(',  '3', ')', ')', ')'];

    expect(Lexer.tokenize(code)).to.deep.equal(expected);
  });
});
