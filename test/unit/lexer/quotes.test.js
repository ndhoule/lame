import Lexer from '../../../src/lexer';

describe('lexer » comments', function() {
  it('should lex apostrophe as a token', function() {
    expect(Lexer.tokenize('(cons 1 \'(2))')).to.deep.equal(['(', 'cons', '1', '\'', '(', '2', ')', ')']);
    expect(Lexer.tokenize('(cons 1 \'    ( 2))')).to.deep.equal(['(', 'cons', '1', '\'', '(', '2', ')', ')']);
  });
});
