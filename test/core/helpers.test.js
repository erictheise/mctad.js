require('../../mctad');
var assert = require('chai').assert;

describe('isInteger', function() {
  it('can return true given an integer', function() {
    assert.isTrue(mctad.isInteger(-99));
    assert.isTrue(mctad.isInteger(0));
    assert.isTrue(mctad.isInteger(99));
  });
  it('can return true given an integer string', function() {
    assert.isTrue(mctad.isInteger('99'));
  });
  it('can return false given a decimal number', function() {
    assert.isFalse(mctad.isInteger(1.23));
  });
  it('can return false given an alpha string', function() {
    assert.isFalse(mctad.isInteger('integer'));
  });
});
