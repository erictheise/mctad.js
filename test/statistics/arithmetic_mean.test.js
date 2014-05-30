require('../../mctad');
var assert = require('chai').assert;

describe('arithmeticMean', function() {
  it('can return undefined when given something other than an array', function() {
    assert.isUndefined(mctad.arithmeticMean(), 'empty argument to arithmeticMean');
    assert.isUndefined(mctad.arithmeticMean(2), 'scalar to arithmeticMean');
    assert.isUndefined(mctad.arithmeticMean('string'), 'string to arithmeticMean');
  });
  it('can return undefined when given an empty array', function() {
    assert.isUndefined(mctad.arithmeticMean([]), 'the array should contain at least one data observation');
  });
  it('can return the number when given an array of one number', function() {
    assert.equal(mctad.arithmeticMean([1]), 1, 'this arithmeticMean should equal 1');
  });

  // Data from http://en.wikipedia.org/wiki/Mean#Arithmetic_arithmeticMean_.28AM.29, retrieved 30 May 2014
  it('can return the arithmeticMean when given an array of more than one number', function() {
    assert.equal(mctad.arithmeticMean([4, 36, 45, 50, 75]), 42, 'this arithmeticMean should equal 42');
  });
});
