import Lexer from '../../../src/lexer';

describe('lexer » whitespace', function() {
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
