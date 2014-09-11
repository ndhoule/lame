import Lexer from '../../../src/lexer';

describe('lexer » symbols', function() {
  it('should handle symbols', function() {
    expect(Lexer.tokenize('symbol')).to.deep.equal(['symbol']);
  });
});
