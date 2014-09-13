import lame from '../../../src/index';

describe('core » s-functions » rest', function() {
  it('should return the second value of a tuple', function() {
    var code = '(rest \'(1 2))';
    var results = lame.eval(code);
    var expected = [2];

    expect(results).to.deep.equal(expected);
  });

  it('should return the rest of the elements in a list containing more than two elements', function() {
    var code = '(rest \'(1 2 3 4 5))';
    var results = lame.eval(code);
    var expected = [2, 3, 4, 5];

    expect(results).to.deep.equal(expected);
  });

  it('should return an empty list when called on an empty list', function() {
    var code = '(rest \'())';
    var results = lame.eval(code);
    var expected = [];

    expect(results).to.deep.equal(expected);
  });

  it('should be aliased as `cdr`', function() {
    var code = '(cdr \'(1 2 3))';
    var results = lame.eval(code);
    var expected = [2, 3];

    expect(results).to.deep.equal(expected);
  });
});
