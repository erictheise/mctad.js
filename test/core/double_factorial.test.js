require('../../mctad');
var assert = require('chai').assert;

describe('doubleFactorial', function() {
  it('can return undefined given an invalid parameter', function() {
    assert.isUndefined(mctad.doubleFactorial(2), 'even integer');
  });

  it('can calculate 9!!', function() {
    assert.equal(mctad.doubleFactorial(9), 945);
  });

  it('can calculate -1!!', function() {
    assert.closeTo(mctad.doubleFactorial(-1), 1, mctad.ε);
  });

  it('can calculate -3!!', function() {
    assert.closeTo(mctad.doubleFactorial(-3), -1, mctad.ε);
  });

  it('can calculate -5!!', function() {
    assert.closeTo(mctad.doubleFactorial(-5), 1/3, mctad.ε);
  });

});
