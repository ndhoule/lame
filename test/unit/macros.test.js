import lame from '../../src/index';

describe('syntax', function() {
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

  describe('quasiquotes (`)', function() {
    it('should rewrite quasiquotes on atoms', function() {
      expect(lame.eval('`+')).to.equal('+');
    });

    it('should rewrite quasiquotes on forms', function() {
      expect(lame.eval('`(+ 1 2)')).to.deep.equal(['+', 1, 2]);
    });
  });

  describe('unquote (~)', function() {
    it('should enable evaluation of unquoted forms within a quasiquoted form', function() {
      expect(lame.eval('`~(+ 1 2)')).to.equal(3);
    });

    it('should enable evaluation of unquoted forms within a quasiquoted form', function() {
      expect(lame.eval('`(+ 1 2 ~(+ 1 2))')).to.deep.equal(['+', 1, 2, 3]);
    });
  });

  describe('unquote-splicing (~@)', function() {
    it('should throw an error when attempting to unquote splice immediately after a quasiquote', function() {
      expect(() => lame.eval('`~@(list 1 2 3)')).to.throw(SyntaxError);
    });

    it('should enable evaluation of unquote-spliced forms within a quasiquoted form', function() {
      expect(lame.eval('`(+ ~@(list 1 2 3))')).to.deep.equal(['+', 1, 2, 3]);
    });
  });
});

