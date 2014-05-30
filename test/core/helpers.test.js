require('../../mctad');
var assert = require('chai').assert;

describe('isInteger', function () {
  it('can return true given an integer', function () {
    assert.isTrue(mctad.isInteger(-99));
    assert.isTrue(mctad.isInteger(0));
    assert.isTrue(mctad.isInteger(99));
  });
  it('can return true given an integer string', function () {
    assert.isTrue(mctad.isInteger('99'));
  });
  it('can return false given a decimal number', function () {
    assert.isFalse(mctad.isInteger(1.23));
  });
  it('can return false given an alpha string', function () {
    assert.isFalse(mctad.isInteger('integer'));
  });
});

describe('allPositive', function () {
  it('can return true given an array of all positive numbers', function () {
    assert.isTrue(mctad.allPositive([2, 3, 5.7, 0, 1]));
  });
  it('can return false given an array containing a negative number', function () {
    assert.isFalse(mctad.allPositive([2, -3, 5.7, 0, 1]));
  });
});

describe('sortNumeric', function () {
  it('can leave a sorted array alone', function () {
    assert.deepEqual(mctad.sortNumeric([1, 2, 3, 4, 11]), [1, 2, 3, 4, 11], 'array should be unchanged');
  });
  it('can properly sort an unordered array', function () {
    assert.deepEqual(mctad.sortNumeric([1, 11, 2, 3, 4]), [1, 2, 3, 4, 11], 'array should be sorted');
    assert.deepEqual(mctad.sortNumeric([1, 11, 111, -1, -11, -111, 0]), [-111, -11, -1, 0, 1, 11, 111], 'array should be sorted');
  });
});
