import lame from '../../../lib/index';

describe('primitives » cons', function() {
  it('should `cons` an element onto the head of another list', function() {
    var code = '(cons 1 (list 2))';
    var results = lame.eval(code);

    expect(results).to.deep.equal([1, 2]);
  });

  it('should `cons` a list onto the head of another list', function() {
    var code = '(cons (list 1 2) (list 3 4))';
    var results = lame.eval(code);

    expect(results).to.deep.equal([[1, 2], 3, 4]);
  });

  it('should throw an error when a non-list is provided as its second argument', function() {
    var code = '(cons 1 2)';
    expect(() => lame.eval(code)).to.throw(TypeError);
  });
});
