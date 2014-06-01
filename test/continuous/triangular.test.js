require('../../mctad');
var assert = require('chai').assert;

describe('triangular', function() {

  it('can return undefined when a, b, and c are not valid parameters', function() {
    assert.isUndefined(mctad.triangular(1, 2, 3), 'b should be >= c');
    assert.isUndefined(mctad.triangular(2, 3, 1), 'c should be >= a');
    assert.isUndefined(mctad.triangular(3, 1, 2), 'a should be <= b and c');
  });
});
