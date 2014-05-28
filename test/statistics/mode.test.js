require('../../mctad');
var assert = require('chai').assert;

describe('mode', function() {
  it('can return null when given something other than an array', function() {
    assert.isNull(mctad.mode(), 'empty argument to mode');
    assert.isNull(mctad.mode(2), 'scalar to mode');
    assert.isNull(mctad.mode('string'), 'string to mode');
  });
  it('can return null when given an empty array', function() {
    assert.isNull(mctad.mode([]), 'the array should contain at least one data observation');
  });
  // observations from http://en.wikipedia.org/wiki/Mode_(statistics), retrieved 28 May 2014
  it('can return the unique mode from an array containing data observations', function() {
    assert.deepEqual(mctad.mode([1, 3, 6, 6, 6, 6, 7, 7, 12, 12, 17]), [6], 'this mode should equal 6');
  });
  it('can return two modes from an array containing data observations', function() {
    assert.deepEqual(mctad.mode([1, 3, 6, 6, 6, 6, 7, 7, 12, 12, 12, 12, 17]), [6, 12], 'this mode should equal 6, 12');
  });
});
