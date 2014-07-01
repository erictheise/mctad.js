require('../../mctad');
var assert = require('chai').assert;

describe('combination', function() {
  it('can return undefined when parameters are not valid', function() {
    assert.isUndefined(mctad.combination(10, -1));
    assert.isUndefined(mctad.combination(-1, 10));
    assert.isUndefined(mctad.combination(-1, -1));
    assert.isUndefined(mctad.combination(10, 1.23));
    assert.isUndefined(mctad.combination(10.23, 4));
  });

  it('can return 0 when k > n', function() {
    assert.equal(mctad.combination(5, 10), 0);
  });

  // Data from http://en.wikipedia.org/wiki/Combination, retrieved 30 May 2014.
  it('can calculate the number of five-card hands possible from a standard fifty-two card deck', function() {
    assert.equal(mctad.combination(52, 5), 2598960);
  });

});
