require('../../../mctad');
var assert = require('chai').assert;

describe('meanResultantLength', function() {
  it('an empty list has no meanResultantLength', function() {
    assert.equal(mctad.meanResultantLength([]), null);
  });

  it('can get the meanResultantLength of one number', function() {
    assert.closeTo(mctad.meanResultantLength([1]), 1, mctad.ε);
  });

  // Mardia & Jupp example 2.1
  it('can get the meanResultantLength of a biased roulette wheel (example 1.1)', function() {
      assert.closeTo(mctad.meanResultantLength([
        '43°', '45°', '52°', '61°', '75°', '88°', '88°', '279°', '357°'
      ]), 0.711, 0.001);
  });
});
