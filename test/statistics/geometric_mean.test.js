require('../../mctad');
var assert = require('chai').assert;

describe('geometricMean', function() {
  it('can return undefined when given something other than an array', function() {
    assert.isUndefined(mctad.geometricMean(), 'empty argument to geometricMean');
    assert.isUndefined(mctad.geometricMean(2), 'scalar to geometricMean');
    assert.isUndefined(mctad.geometricMean('string'), 'string to geometricMean');
  });
  it('can return undefined when given an empty array', function() {
    assert.isUndefined(mctad.geometricMean([]), 'the array should contain at least one data observation');
  });
  it('can return the number when given an array of one number', function() {
    assert.equal(mctad.geometricMean([1]), 1, 'this geometricMean should equal 1');
  });

  // Data from http://en.wikipedia.org/wiki/Mean#Geometric_mean_.28GM.29, retrieved 30 May 2014
  it('can return the geometricMean when given an array of more than one number', function() {
    assert.closeTo(mctad.geometricMean([4, 36, 45, 50, 75]), 30, mctad.ε, 'this geometricMean should equal 30');
  });
});
