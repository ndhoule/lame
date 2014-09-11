import Lexer from '../../../src/lexer';

describe('lexer', function() {
  it('should be a function', function() {
    expect(Lexer.tokenize).to.be.a('function');
  });

  it('should handle empty strings', function() {
    expect(Lexer.tokenize('')).to.deep.equal([]);
    expect(Lexer.tokenize('')).to.deep.equal([]);
  });
});
