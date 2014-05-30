require('../../mctad');
var assert = require('chai').assert;

describe('sum', function() {
  it('can return undefined when given something other than an array', function() {
    assert.isUndefined(mctad.sum(), 'empty argument to sum');
    assert.isUndefined(mctad.sum(2), 'Number to sum instead of an Array');
    assert.isUndefined(mctad.sum('string'), 'String to sum');
  });
  it('can return undefined when given an empty array', function() {
    assert.isUndefined(mctad.sum([]), 'the array should contain at least one data observation');
  });
  it('can return the sum when given an array of one number', function() {
    assert.equal(mctad.sum([2]), 2, 'this sum should equal 2');
  });
  it('can return the sum when given an array of more than one number', function() {
    assert.equal(mctad.sum([1, 2, -4]), -1, 'this sum should equal -1');
  });
});
