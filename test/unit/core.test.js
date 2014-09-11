import lame from '../../src/index';

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

    it('should not interpret the string "true" or "false" as booleans', function() {
      var result = lame.eval('"false"');
      var expected = '"false"';

      expect(result).to.deep.equal(expected);
    });
  });

  describe('numbers', function() {
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

  // TODO Implement strings
  describe('strings', function() {
    it('should interpret characters wrapped in double quote ("") marks as string literals', function() {
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

  xdescribe('symbols', function() {
  });
});

describe('core » s-functions', function() {
  // TODO: Test
  xdescribe('lambda', function() {});

  // TODO: Implement
  xdescribe('cond', function() {});

  describe('quote', function() {
    it('should quote an atom', function() {
      var result = lame.eval('(quote +)');
      var expected = '+';

      expect(result).to.deep.equal(expected);
    });

    it('should prevent evaluation of an s-expression', function() {
      var result = lame.eval(chai.loadFixture('quote/symbol-single'));
      var expected = ['+', 2, 3];

      expect(result).to.deep.equal(expected);
    });

    it('should prevent evaluation of nested s-expressions', function() {
      var result = lame.eval(chai.loadFixture('quote/symbol-nested'));
      var expected = ['list', 2, 3, ['quote', [4, 5]], 6];

      expect(result).to.deep.equal(expected);
    });
  });

  describe('\' (`quote` shorthand)', function() {
    it('should quote an atom', function() {
      var result = lame.eval('\'+');
      var expected = '+';

      expect(result).to.deep.equal(expected);
    });

    it('should prevent evaluation of an s-expression', function() {
      var result = lame.eval(chai.loadFixture('quote/shorthand-single'));
      var expected = ['+', 2, 3];

      expect(result).to.deep.equal(expected);
    });

    it('should prevent evaluation of nested s-expressions', function() {
      var result = lame.eval(chai.loadFixture('quote/shorthand-nested'));
      var expected = ['list', 2, 3, ['quote', [4, 5]], 6];

      expect(result).to.deep.equal(expected);
    });
  });
});
