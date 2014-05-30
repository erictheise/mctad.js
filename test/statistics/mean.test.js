require('../../mctad');
var assert = require('chai').assert;

describe('mean', function() {
  it('is merely an alias to arithmeticMean', function() {
    assert.deepEqual(mctad.mean(), mctad.arithmeticMean());
  });
});
