require('../../mctad');
_ = require('underscore');
var assert = require('chai').assert;

// expected cumulative probabilities taken from Appendix 1, Table I of William W. Hines & Douglas C.
// Montgomery, "Probability and Statistics in Engineering and Management Science", Wiley (1980).
describe('poisson.distribution', function() {
  it('can return null when λ <= 0', function() {
    assert.isNull(mctad.poisson.distribution(0));
    assert.isNull(mctad.poisson.distribution(-10));
  });
  it('can generate probability and cumulative probability distributions for λ = 3.0', function() {
      assert.isObject(mctad.poisson.distribution(3.0));
      assert.closeTo(mctad.poisson.distribution(3.0)[3].pdf, 0.2240, mctad.ε);
      assert.closeTo(mctad.poisson.distribution(3.0)[3].cdf, 0.647, 0.001);
  });
  it('can generate probability and cumulative probability distributions for λ = 4.0', function() {
      assert.isObject(mctad.poisson.distribution(4.0));
      assert.closeTo(mctad.poisson.distribution(4.0)[2].pdf, 0.1465, mctad.ε);
      assert.closeTo(mctad.poisson.distribution(4.0)[2].cdf, 0.238, 0.001);
  });
  it('can generate probability and cumulative probability distributions for λ = 5.5', function() {
      assert.isObject(mctad.poisson.distribution(5.5));
      assert.closeTo(mctad.poisson.distribution(5.5)[7].pdf, 0.1234, mctad.ε);
      assert.closeTo(mctad.poisson.distribution(5.5)[7].cdf, 0.809, 0.001);
  });
  it('can generate probability and cumulative probability distributions for λ = 9.5', function() {
      assert.isObject(mctad.poisson.distribution(9.5));
      assert.closeTo(mctad.poisson.distribution(9.5)[17].pdf, 0.0088, mctad.ε);
      assert.closeTo(mctad.poisson.distribution(9.5)[17].cdf, 0.991, 0.001);
  });
});
