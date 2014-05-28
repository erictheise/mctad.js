require('../../mctad');
var assert = require('chai').assert;

describe('mean', function() {
  it('can return null when given something other than an array', function() {
    assert.isNull(mctad.mean(), 'empty argument to mean');
    assert.isNull(mctad.mean(2), 'scalar to mean');
    assert.isNull(mctad.mean('string'), 'string to mean');
  });
  it('can return null when given an empty array', function() {
    assert.isNull(mctad.mean([]), 'the array should contain at least one data observation');
  });
  it('can return the number when given an array of one number', function() {
    assert.equal(mctad.mean([1]), 1, 'this mean should equal 1');
  });
  it('can return the mean when given an array of three numbers', function() {
    assert.equal(mctad.mean([-1, 1, 3]), 1, 'this mean should equal 1');
  });
});

