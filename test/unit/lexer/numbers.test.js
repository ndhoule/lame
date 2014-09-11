import Lexer from '../../../src/lexer';

describe('lexer » numbers', function() {
  describe('integers', function() {
    it('should handle positive integers', function() {
      expect(Lexer.tokenize('4')).to.deep.equal(['4']);
      expect(Lexer.tokenize('4659')).to.deep.equal(['4659']);
    });

    it('should handle negative integers', function() {
      expect(Lexer.tokenize('-4')).to.deep.equal(['-4']);
      expect(Lexer.tokenize('-4659')).to.deep.equal(['-4659']);
    });
  });

  describe('floats', function() {
    it('should handle positive floats', function() {
      expect(Lexer.tokenize('4.4830')).to.deep.equal(['4.4830']);
      expect(Lexer.tokenize('9910.332')).to.deep.equal(['9910.332']);
    });

    it('should handle negative floats', function() {
      expect(Lexer.tokenize('-4.4830')).to.deep.equal(['-4.4830']);
      expect(Lexer.tokenize('-9910.332')).to.deep.equal(['-9910.332']);
    });
  });
});
