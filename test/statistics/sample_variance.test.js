require('../../mctad');
var assert = require('chai').assert;

describe('sampleVariance', function() {
  it('can return undefined when given something other than an array', function() {
    assert.isUndefined(mctad.sampleVariance(), 'empty argument to sampleVariance');
    assert.isUndefined(mctad.sampleVariance(2), 'scalar to sampleVariance');
    assert.isUndefined(mctad.sampleVariance('string'), 'string to sampleVariance');
  });
  it('can return undefined when given an empty array', function() {
    assert.isUndefined(mctad.sampleVariance([]), 'the array should contain at least one data observation');
  });
  it('can return the sampleVariance of 0.0 when there is no variance in the data observations', function() {
    assert.equal(mctad.sampleVariance([1, 1, 1]), 0, 'this sampleVariance should equal 0');
  });
});
