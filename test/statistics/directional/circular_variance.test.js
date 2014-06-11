require('../../../mctad');
var assert = require('chai').assert;

describe('circularVariance', function() {
  it('an empty list has no circularVariance', function() {
    assert.equal(mctad.circularVariance([]), null);
  });

  it('can get the circularVariance of one number', function() {
    assert.equal(mctad.circularVariance([1]), 0.0);
  });

  // Mardia & Jupp example 1.1
  it('can get the circularVariance of a biased roulette wheel (example 1.1)', function() {
      assert.closeTo(mctad.circularVariance([
        '43°', '45°', '52°', '61°', '75°', '88°', '88°', '279°', '357°'
      ]), 0.289, mctad.ε);
  });
});
