require('../../mctad');
var assert = require('chai').assert;

// expected cumulative probabilities taken from Appendix 1, Table I of William W. Hines & Douglas C.
// Montgomery, "Probability and Statistics in Engineering and Management Science", Wiley (1980).
describe('poisson', function() {
  it('can return null when λ <= 0', function() {
    assert.isNull(mctad.poisson(0));
    assert.isNull(mctad.poisson(-10));
  });
  it('can generate probability mass and cumulative distribution functions for λ = 3.0', function() {
    assert.isObject(mctad.poisson(3.0));
    assert.closeTo(mctad.poisson(3.0)[3].pmf, 0.2240, mctad.ε);
    assert.closeTo(mctad.poisson(3.0)[3].cdf, 0.647, 0.001);
  });
  it('can generate probability mass and cumulative distribution functions for λ = 4.0', function() {
    assert.isObject(mctad.poisson(4.0));
    assert.closeTo(mctad.poisson(4.0)[2].pmf, 0.1465, mctad.ε);
    assert.closeTo(mctad.poisson(4.0)[2].cdf, 0.238, 0.001);
  });
  it('can generate probability mass and cumulative distribution functions for λ = 5.5', function() {
    assert.isObject(mctad.poisson(5.5));
    assert.closeTo(mctad.poisson(5.5)[7].pmf, 0.1234, mctad.ε);
    assert.closeTo(mctad.poisson(5.5)[7].cdf, 0.809, 0.001);
  });
  it('can generate probability mass and cumulative distribution functions for λ = 9.5', function() {
    assert.isObject(mctad.poisson(9.5));
    assert.closeTo(mctad.poisson(9.5)[17].pmf, 0.0088, mctad.ε);
    assert.closeTo(mctad.poisson(9.5)[17].cdf, 0.991, 0.001);
  });
});
