import lame from '../../lib/index';

describe('core » types', function() {
  describe('booleans', function() {
    it('should interpret `true` as a boolean', function() {
      var result = lame.eval('true');
      var result2 = lame.eval('(list 1 2 true)');

      expect(result).to.be.true;
      expect(result2).to.deep.equal([1, 2, true]);
    });

    it('should interpret `false` as a boolean', function() {
      var result = lame.eval('false');
      var result2 = lame.eval('(list 1 2 false)');

      expect(result).to.be.false;
      expect(result2).to.deep.equal([1, 2, false]);
    });

    xit('should not interpret the string "true" or "false" as booleans');
  });

  // TODO: Test floating point numbers
  describe('numbers', function() {
    it('should interpret numeric input as numbers', function() {
      expect(lame.eval('1')).to.equal(1);
    });

    it('should interpret numbers in lists as numbers', function() {
      expect(lame.eval('(list 1 2 3)')).to.deep.equal([1, 2, 3]);
    });
  });

  // TODO Implement strings
  xdescribe('strings', function() {
    xit('should interpret characters wrapped in double quote ("") marks as string literals', function() {
      var result = lame.eval('"hello"');

      expect(result).to.equal('hello');
    });

    xit('should handle the empty string ("")');

    xit('should handle strings that contain whitespace');
  });

  xdescribe('symbols', function() {
  });
});
