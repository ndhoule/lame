import Lexer from '../../../src/lexer';

describe('lexer » comments', function() {
  var ownlineCode = chai.loadFixture('lexer/comments-ownline');
  var inlineCode = chai.loadFixture('lexer/comments-inline');
  var expected = ['(', 'def', 'square', '(', 'lambda', '(', 'x', ')', '(', '*', 'x', 'x', ')', ')', ')'];

  it('should handle comments', function() {
    expect(() => Lexer.tokenize('; this is a comment.')).to.not.throw();
    expect(() => Lexer.tokenize(';; sometimes with two semicolons!')).to.not.throw();
  });

  it('should not include a comment on a fresh line in lexer output', function() {
    expect(Lexer.tokenize(ownlineCode)).to.deep.equal(expected);
  });

  it('should not include an inline comment in output', function() {
    expect(Lexer.tokenize(inlineCode)).to.deep.equal(expected);
  });

  it('should allow semicolons in string literals', function() {
    var code = '(list 1 2 "dat; bass;")';
    var expected = ['(', 'list', '1', '2', '"dat; bass;"', ')'];

    expect(Lexer.tokenize(code)).to.deep.equal(expected);
  });
});
