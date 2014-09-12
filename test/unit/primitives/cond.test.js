import lame from '../../../src/index';

describe('primitives » cond', function() {
  it('should return the first clause\'s `expr` for which the `test` evaluates to truthy', function() {
    var simple = lame.eval(chai.loadFixture('cond/simple'));
    var simpleExpected = '"first"';
    var complex = lame.eval(chai.loadFixture('cond/complex'));
    var complexExpected = '"third"';
    var fallback = lame.eval(chai.loadFixture('cond/fallback'));
    var fallbackExpected = '"last"';

    expect(simple).to.equal(simpleExpected);
    expect(complex).to.equal(complexExpected);
    expect(fallback).to.equal(fallbackExpected);
  });

  it('should return `nil` if none of the clause tests evaluate to a truthy value', function() {
    var code = chai.loadFixture('cond/none');
    var results = lame.eval(code);

    expect(results).to.be.null;
  });
});
