import lame from '../../../src/index';

describe('core » s-functions » first', function() {
  it('should return the first value of a list', function() {
    var code = '(first \'(1 2 3))';
    var results = lame.eval(code);
    var expected = 1;

    expect(results).to.equal(expected);
  });

  it('should return `nil` when called on an empty list', function() {
    var code = '(first \'())';
    var results = lame.eval(code);

    expect(results).to.be.null;
  });

  it('should be aliased as `car`', function() {
    var code = '(car \'(1 2 3))';
    var results = lame.eval(code);
    var expected = 1;

    expect(results).to.equal(expected);
  });
});
