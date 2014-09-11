import lame from '../../../src/index';

describe('parse » types', function() {
  /**
   * TODO:
   *
   * Types to implement:
   * - List
   * - Function
   *
   * Tests to write:
   * - Tests for LAtom
   * - Tests for (type "str"), (type 3), etc.
   */

  describe('LBoolean', function() {
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

    it('should not interpret the strings "true" or "false" as booleans', function() {
      var result = lame.eval('"false"');
      var expected = '"false"';

      expect(result).to.deep.equal(expected);
    });
  });

  describe('LNumber', function() {
    it('should interpret numeric input as numbers', function() {
      expect(lame.eval('1')).to.equal(1);
    });

    it('should interpret numbers in lists as numbers', function() {
      expect(lame.eval('(list 1 2 3)')).to.deep.equal([1, 2, 3]);
    });

    it('should interpret floating point numbers', function() {
      expect(lame.eval('(list 1.21 2.893 3.0020)')).to.deep.equal([1.21, 2.893, 3.0020]);
    });
  });

  describe('LString', function() {
    it('should interpret characters wrapped in double quotes ("") as string literals', function() {
      var result = lame.eval('"hello"');
      var expected = '"hello"';

      expect(result).to.deep.equal(expected);
    });

    it('should handle the empty string ("")', function() {
      var result = lame.eval('""');
      var expected = '""';

      expect(result).to.deep.equal(expected);
    });

    it('should handle strings that contain whitespace', function() {
      var result = lame.eval('"this has\r\n internal  \n whitespace"');
      var expected = '"this has\r\n internal  \n whitespace"';

      expect(result).to.deep.equal(expected);
    });
  });

  // TODO: Write tests
  xdescribe('LSymbol', function() {});
});
