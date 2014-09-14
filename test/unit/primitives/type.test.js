import lame from '../../../src/index';

describe('core » s-functions » type', function() {
  it('should return a value of type `string`', function() {
    var code = '(type (type 1))';
    var result = lame.eval(code);
    var expected = 'string';

    expect(result).to.equal(expected);
  });

  it('should return the type from symbol wrappers', function() {
    var code = '(type \'x)';
    var result = lame.eval(code);
    var expected = 'symbol';

    expect(result).to.equal(expected);
  });

  it('should return the type from number wrappers', function() {
    var code = '(type 1)';
    var result = lame.eval(code);
    var expected = 'number';

    expect(result).to.equal(expected);
  });

  it('should return the type from string wrappers', function() {
    var code = '(type "test")';
    var result = lame.eval(code);
    var expected = 'string';

    expect(result).to.equal(expected);
  });

  it('should return the type from `nil` wrappers', function() {
    var code = '(type nil)';
    var result = lame.eval(code);
    var expected = 'nil';

    expect(result).to.equal(expected);
  });

  it('should return the type from boolean wrappers', function() {
    var code = '(type false)';
    var result = lame.eval(code);
    var expected = 'boolean';

    expect(result).to.equal(expected);
  });

  xit('should return the type from list wrappers', function() {});

  it('should return the type from function wrappers', function() {
    var code = '(type (lambda (x) (* x x)))';
    var result = lame.eval(code);
    var expected = 'function';

    expect(result).to.equal(expected);
  });
});
