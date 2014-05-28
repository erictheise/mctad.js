require('../../mctad');
var assert = require('chai').assert;

describe('median', function() {
  it('can return null when given something other than an array', function() {
    assert.isNull(mctad.median(), 'empty argument to median');
    assert.isNull(mctad.median(2), 'scalar to median');
    assert.isNull(mctad.median('string'), 'string to median');
  });
  it('can return null when given an empty array', function() {
    assert.isNull(mctad.median([]), 'the array should contain at least one data observation');
  });
  it('can return the median when given an array containing an even number of data observations', function() {
    assert.equal(mctad.median([3, 5, 7, 9]), 6, 'this median should equal 6');
    assert.equal(mctad.median([9, 5, 7, 3]), 6, 'this median should equal 6');
  });
  it('can return the median when given an array containing an odd number of data observations', function() {
    assert.equal(mctad.median([3, 3, 5, 9, 11]), 5, 'this median should equal 5');
    assert.equal(mctad.median([11, 3, 9, 3, 5]), 5, 'this median should equal 5');
  });
});
