import lame from '../../../src/index';

describe('primitives » if', function() {
  it('should evaluate the first form if the predicate function returns a truthy value', function() {
    var code = '(if 1 2 (list 3))';
    var results = lame.eval(code);

    expect(results).to.equal(2);
  });

  it('should evaluate the second form if the predicate function returns a falsy value', function() {
    var code = '(if 0 2 3)';
    var results = lame.eval(code);

    expect(results).to.equal(3);
  });
});
