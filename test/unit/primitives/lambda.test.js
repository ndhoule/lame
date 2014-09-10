import lame from '../../../src/index';

describe('primitives » lambda', function() {
  it('should compile a lamba expression', function() {
    var results = lame.eval('(lambda (x) (* x x))');

    expect(results).to.be.a('function');
  });

  it('should invoke a lambda expression', function() {
    var results = lame.eval('((lambda (x) (* x x)) 16)');

    expect(results).to.equal(256);
  });
});
