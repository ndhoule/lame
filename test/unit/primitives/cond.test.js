import lame from '../../../src/index';

describe('core » s-functions » cond', function() {
  it('should return the first clause\'s `expr` for which the `test` evaluates to truthy', function() {
    var code = chai.loadFixture('cond/simple');
    var result = lame.eval(code);
    var expected = '"first"';

    expect(result).to.equal(expected);
  });

  it('should work when given multiple clauses', function() {
    var code1 = chai.loadFixture('cond/complex');
    var results1 = lame.eval(code1);
    var expected1 = '"third"';

    expect(results1).to.equal(expected1);

    var code2 = chai.loadFixture('cond/fallback');
    var results2 = lame.eval(code2);
    var expected2 = '"last"';

    expect(results2).to.equal(expected2);
  });

  it('should return `nil` if none of the clause tests evaluate to a truthy value', function() {
    var code = chai.loadFixture('cond/none');
    var results = lame.eval(code);

    expect(results).to.be.null;
  });
});
