require('../../mctad');
var assert = require('chai').assert;

describe('sampleStandardDeviation', function() {
  it('can return null when given something other than an array', function() {
    assert.isNull(mctad.sampleStandardDeviation(), 'empty argument to sampleStandardDeviation');
    assert.isNull(mctad.sampleStandardDeviation(2), 'scalar to sampleStandardDeviation');
    assert.isNull(mctad.sampleStandardDeviation('string'), 'string to sampleStandardDeviation');
  });
  it('can return null when given an empty array', function() {
    assert.isNull(mctad.sampleStandardDeviation([]), 'the array should contain at least one data observation');
  });
  it('can return the sampleStandardDeviation of 0.0 when there is no variance in the data observations', function() {
    assert.equal(mctad.sampleStandardDeviation([1, 1, 1]), 0, 'this sampleStandardDeviation should equal 0');
  });
  // Data from http://en.wikipedia.org/wiki/Standard_deviation retrieved 28 May 2014
  it('can return the sampleStandardDeviation of 0.0 when there is no variance in the data observations', function() {
    assert.closeTo(mctad.sampleStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9]), 2.13809, mctad.ε, 'this sampleStandardDeviation should equal 0');
  });
});
