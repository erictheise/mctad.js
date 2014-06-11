require('../../../mctad');
var assert = require('chai').assert;

describe('circularStandardDeviation', function() {
  it('an empty list has no circularStandardDeviation', function() {
    assert.equal(mctad.circularStandardDeviation([]), null);
  });

  it('can get the circularStandardDeviation of one number', function() {
    // @todo: resolve the no variation issue
    // assert.equal(mctad.circularStandardDeviation([1]), 0.0);
  });

  // Mardia & Jupp example 1.1
  it('can get the circularStandardDeviation of a biased roulette wheel (example 1.1)', function() {
      assert.closeTo(mctad.circularStandardDeviation([
        '43°', '45°', '52°', '61°', '75°', '88°', '88°', '279°', '357°'
      ]), 1.03837, mctad.ε);
  });
});
