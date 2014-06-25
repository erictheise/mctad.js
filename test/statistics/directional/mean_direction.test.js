require('../../../mctad');
var assert = require('chai').assert;

describe('meanDirection', function() {
  it('an empty list has no meanDirection', function() {
    assert.equal(mctad.meanDirection([]), null);
  });

  it('can get the meanDirection of one number', function() {
    assert.equal(mctad.meanDirection([1]), 1);
  });

  // Mardia & Jupp example 1.1
  it('can get the meanDirection of a biased roulette wheel (example 1.1)', function() {
      assert.closeTo(mctad.meanDirection([
        '43°', '45°', '52°', '61°', '75°', '88°', '88°', '279°', '357°'
      ]), mctad.toRadians('51°'), 0.001);
  });
});
