import Lexer from '../../../src/lexer';

describe('lexer » strings', function() {
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
