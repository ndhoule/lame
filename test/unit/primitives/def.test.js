import lame from '../../../src/index';

describe('primitives » def', function() {
  it('should evaluate a variable into the root context', function() {
    var code = chai.loadFixture('def/root-context');
    var result = lame.eval(code);

    expect(result).to.equal(256);
  });

  xit('should evaluate a variable into its current lexical scope', function() {});
});
