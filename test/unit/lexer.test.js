import Lexer from '../../lib/lexer';

describe('lexer', function() {
  it('should be a function', function() {
    expect(Lexer.lex).to.be.a('function');
  });

  it('should handle empty strings', function() {
    expect(Lexer.lex('')).to.deep.equal([]);
    expect(Lexer.lex('')).to.deep.equal([]);
  });

  describe('atoms', function() {
    describe('integers', function() {
      it('should handle positive integers', function() {
        expect(Lexer.lex('4')).to.deep.equal(['4']);
        expect(Lexer.lex('4659')).to.deep.equal(['4659']);
      });

      it('should handle negative integers', function() {
        expect(Lexer.lex('-4')).to.deep.equal(['-4']);
        expect(Lexer.lex('-4659')).to.deep.equal(['-4659']);
      });
    });

    describe('floats', function() {
      it('should handle positive floats', function() {
        expect(Lexer.lex('4.4830')).to.deep.equal(['4.4830']);
        expect(Lexer.lex('9910.332')).to.deep.equal(['9910.332']);
      });

      it('should handle negative floats', function() {
        expect(Lexer.lex('-4.4830')).to.deep.equal(['-4.4830']);
        expect(Lexer.lex('-9910.332')).to.deep.equal(['-9910.332']);
      });
    });

    describe('strings', function() {
      it('should handle simple strings', function() {
        expect(Lexer.lex('"a"')).to.deep.equal(['"a"']);
        expect(Lexer.lex('"aardvark"')).to.deep.equal(['"aardvark"']);
      });

      it('should handle strings with internal whitespace', function() {
        expect(Lexer.lex('"you shall not pass"')).to.deep.equal(['"you shall not pass"']);
      });

      it('should handle escaped internal quotes', function() {
        expect(Lexer.lex('"you shall \\"not\\" pass"')).to.deep.equal(['"you shall \\"not\\" pass"']);
      });
    });

    describe('symbols', function() {
      it('should handle symbols', function() {
        expect(Lexer.lex('symbol')).to.deep.equal(['symbol']);
      });
    });
  });

  describe('parentheses', function() {
    it('it should handle empty parentheses', function() {
      expect(Lexer.lex('()')).to.deep.equal(['(', ')']);
      expect(Lexer.lex('(())')).to.deep.equal(['(', '(', ')', ')']);
      expect(Lexer.lex('( ( ) )')).to.deep.equal(['(', '(', ')', ')']);
    });

    it('should handle unbalanced parentheses', function() {
      expect(Lexer.lex('(')).to.deep.equal(['(']);
      expect(Lexer.lex('())')).to.deep.equal(['(', ')', ')']);
      expect(Lexer.lex('((')).to.deep.equal(['(', '(']);
    });

    it('should handle parentheses with contents', function() {
      expect(Lexer.lex('(list 1 2 3)')).to.deep.equal(['(', 'list', '1', '2', '3', ')']);

      var code = '(list 1 2 (quot (3)))';
      var expected = ['(', 'list', '1', '2', '(', 'quot', '(',  '3', ')', ')', ')'];
      expect(Lexer.lex(code)).to.deep.equal(expected);
    });
  });

  xdescribe('whitespace', function() {
    xit('should ignore spaces', function() {
    });

    xit('should ignore newlines', function() {
    });

    xit('should ignore commas', function() {
    });

    xit('should ignore carriage returns', function() {
    });

    xit('should ignore leading whitespace', function() {
    });

    xit('should ignore trailing whitespace', function() {
    });

    xit('should ignore inner whitespace', function() {
    });
  });
});
