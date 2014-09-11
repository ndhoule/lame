import lame from '../../../src/index';

describe('core » s-functions » quote', function() {
  it('should quote an atom', function() {
    var result = lame.eval('(quote +)');
    var expected = '+';

    expect(result).to.deep.equal(expected);
  });

  it('should prevent evaluation of an s-expression', function() {
    var result = lame.eval(chai.loadFixture('quote/symbol-single'));
    var expected = ['+', 2, 3];

    expect(result).to.deep.equal(expected);
  });

  it('should prevent evaluation of nested s-expressions', function() {
    var result = lame.eval(chai.loadFixture('quote/symbol-nested'));
    var expected = ['list', 2, 3, ['quote', [4, 5]], 6];

    expect(result).to.deep.equal(expected);
  });
});

describe('\' (`quote` shorthand)', function() {
  it('should quote an atom', function() {
    var result = lame.eval('\'+');
    var expected = '+';

    expect(result).to.deep.equal(expected);
  });

  it('should prevent evaluation of an s-expression', function() {
    var result = lame.eval(chai.loadFixture('quote/shorthand-single'));
    var expected = ['+', 2, 3];

    expect(result).to.deep.equal(expected);
  });

  it('should prevent evaluation of nested s-expressions', function() {
    var result = lame.eval(chai.loadFixture('quote/shorthand-nested'));
    var expected = ['list', 2, 3, ['quote', [4, 5]], 6];

    expect(result).to.deep.equal(expected);
  });
});
