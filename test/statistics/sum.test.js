require('../../mctad');
var assert = require('chai').assert;

describe('sum', function() {
  it('can return null when given something other than an array', function() {
    assert.isNull(mctad.sum(), 'empty argument to sum');
    assert.isNull(mctad.sum(2), 'scalar to sum');
    assert.isNull(mctad.sum('string'), 'string to sum');
  });
  it('can return null when given an empty array', function() {
    assert.isNull(mctad.sum([]), 'the array should contain at least one data observation');
  });
  it('can return the sum when given an array of three numbers', function() {
    assert.equal(mctad.sum([1, 2, -4]), -1, 'this sum should equal -1');
  });
});
