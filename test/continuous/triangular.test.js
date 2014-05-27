require('../../mctad');
var assert = require('chai').assert;

describe('triangular.distribution', function() {

  it('can return null when a, b, and c are not valid parameters', function() {
    assert.isNull(mctad.triangular.distribution(1, 2, 3), 'b should be >= c');
    assert.isNull(mctad.triangular.distribution(2, 3, 1), 'c should be >= a');
    assert.isNull(mctad.triangular.distribution(3, 1, 2), 'a should be <= b and c');
  });
});
