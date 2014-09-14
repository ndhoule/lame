import lame from '../../src/index';

describe('syntax', function() {
  describe('quasiquotes', function() {
    it('should rewrite quasiquotes on atoms', function() {
      expect(lame.eval('`+')).to.equal('+');
    });

    it('should rewrite quasiquotes on forms', function() {
      expect(lame.eval('`(+ 1 2)')).to.deep.equal(['+', 1, 2]);
    });
  });

  describe('unquote', function() {
    it('should enable evaluation of unquoted forms within a quasiquoted form', function() {
      expect(lame.eval('`~(+ 1 2)')).to.equal(3);
    });

    it('should enable evaluation of unquoted forms within a quasiquoted form', function() {
      expect(lame.eval('`(+ 1 2 ~(+ 1 2))')).to.deep.equal(['+', 1, 2, 3]);
    });
  });

  describe('unquote-splicing', function() {
    it('should throw an error when attempting to unquote splice immediately after a quasiquote', function() {
      expect(() => lame.eval('`~@(list 1 2 3)')).to.throw(SyntaxError);
    });

    it('should enable evaluation of unquote-spliced forms within a quasiquoted form', function() {
      expect(lame.eval('`(+ ~@(list 1 2 3))')).to.deep.equal(['+', 1, 2, 3]);
    });
  });
});

