import Lexer from '../../src/lexer';

describe('lexer', function() {
  it('should be a function', function() {
    expect(Lexer.tokenize).to.be.a('function');
  });

  it('should handle empty strings', function() {
    expect(Lexer.tokenize('')).to.deep.equal([]);
    expect(Lexer.tokenize('')).to.deep.equal([]);
  });

  describe('atoms', function() {
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

    describe('strings', function() {
      it('should handle simple strings', function() {
        expect(Lexer.tokenize('"a"')).to.deep.equal(['"a"']);
        expect(Lexer.tokenize('"aardvark"')).to.deep.equal(['"aardvark"']);
      });

      it('should handle strings with internal whitespace', function() {
        expect(Lexer.tokenize('"you shall not pass"')).to.deep.equal(['"you shall not pass"']);
      });

      it('should handle escaped internal quotes', function() {
        expect(Lexer.tokenize('"you shall \\"not\\" pass"')).to.deep.equal(['"you shall \\"not\\" pass"']);
      });

      it('should handle parentheses within quotes', function() {
        expect(Lexer.tokenize('"you shall (not) pass"')).to.deep.equal(['"you shall (not) pass"']);
        expect(Lexer.tokenize('"you shall ))not( pass"')).to.deep.equal(['"you shall ))not( pass"']);
        expect(Lexer.tokenize('"you shall (((()) not pass"')).to.deep.equal(['"you shall (((()) not pass"']);
      });
    });

    describe('symbols', function() {
      it('should handle symbols', function() {
        expect(Lexer.tokenize('symbol')).to.deep.equal(['symbol']);
      });
    });
  });

  describe('quoting', function() {
    it('should allow quoting of forms', function() {
      expect(Lexer.tokenize('(cons 1 \'(2))')).to.deep.equal(['(', 'cons', '1', '\'', '(', '2', ')', ')']);
      expect(Lexer.tokenize('(cons 1 \'    ( 2))')).to.deep.equal(['(', 'cons', '1', '\'', '(', '2', ')', ')']);
    });
  });

  describe('parentheses', function() {
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

  describe('whitespace', function() {
    it('should ignore spaces', function() {
      expect(Lexer.tokenize('      ')).to.have.length(0);
    });

    it('should ignore commas', function() {
      var code = chai.loadFixture('lexer/whitespace-commas');
      var expected = ['(', 'list', '1', '2', '3', ')'];

      expect(Lexer.tokenize(code)).to.deep.equal(expected);
    });

    it('should ignore newlines', function() {
      var code = chai.loadFixture('lexer/whitespace-newlines');
      var expected = ['(', 'do', '(', 'eq', '1', '2', ')', '(', 'print', '"omg"', ')', ')'];

      expect(Lexer.tokenize(code)).to.deep.equal(expected);
    });

    it('should ignore dos-style newlines', function() {
      var code = chai.loadFixture('lexer/whitespace-dos-newlines');
      var expected = ['(', 'do', '(', 'eq', '1', '2', ')', '(', 'print', '"omg"', ')', ')'];

      expect(Lexer.tokenize(code)).to.deep.equal(expected);
    });

    it('should ignore leading whitespace', function() {
      expect(Lexer.tokenize('\n()')).to.deep.equal(['(', ')']);
      expect(Lexer.tokenize('\r\n()')).to.deep.equal(['(', ')']);
    });

    it('should ignore trailing whitespace', function() {
      expect(Lexer.tokenize('()\n')).to.deep.equal(['(', ')']);
      expect(Lexer.tokenize('()\r\n')).to.deep.equal(['(', ')']);
      expect(Lexer.tokenize('() \n   ')).to.deep.equal(['(', ')']);
      expect(Lexer.tokenize('() \r\n   ')).to.deep.equal(['(', ')']);
    });

    it('should ignore inner whitespace', function() {
      expect(Lexer.tokenize('(+\n 1 2)\n')).to.deep.equal(['(', '+', '1', '2', ')']);
      expect(Lexer.tokenize('(+\n 1\r2)\n')).to.deep.equal(['(', '+', '1', '2', ')']);
      expect(Lexer.tokenize('(+\r\n 1    \r2  )\n')).to.deep.equal(['(', '+', '1', '2', ')']);
    });
  });
});
