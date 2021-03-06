import lame from '../../../src/index';

describe('core » s-functions » do', function() {
  it('should evaluate all forms given to it', function() {
    var code = '(do (+ 1 2 3) (+ 4 5 6))';
    var results = lame.eval(code);

    expect(results).to.equal(15);
  });
});
