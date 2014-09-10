import lame from '../../../src/index';

describe('primitives » quote', function() {
  it('should prevent evaluation of a form', function() {
    var code = '(quote (+ 1 2 3))';
    var results = lame.eval(code);

    expect(results).to.deep.equal(['+', 1, 2, 3]);
  });
});
