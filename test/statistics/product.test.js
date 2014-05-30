require('../../mctad');
var assert = require('chai').assert;

describe('product', function() {
  it('can return undefined when given something other than an array', function() {
    assert.isUndefined(mctad.product(), 'empty argument to product');
    assert.isUndefined(mctad.product(2), 'Number to product instead of an Array');
    assert.isUndefined(mctad.product('string'), 'String to product');
  });
  it('can return undefined when given an empty array', function() {
    assert.isUndefined(mctad.product([]), 'the array should contain at least one data observation');
  });
  it('can return the product when given an array of one number', function() {
    assert.equal(mctad.product([2]), 2, 'this product should equal 2');
  });

  // Data from http://en.wikipedia.org/wiki/Mean#Geometric_mean_.28GM.29, retrieved 30 May 2014
  it('can return the product when given an array of more than one number', function() {
    assert.equal(mctad.product([4, 36, 45, 50, 75]), 24300000, 'this product should equal 24,300,000');
  });
});
