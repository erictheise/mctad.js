require('../../mctad');
var assert = require('chai').assert;

describe('exponential', function() {
  it('can return undefined when λ is not a valid parameter', function() {
    assert.isUndefined(mctad.exponential(-1), 'λ should be > 0');
  });

  it('can return undefined when x is not a valid parameter to f(x) or F(x)', function() {
    assert.isUndefined(mctad.exponential(0.5).f(-1), 'x should be ≥ 0');
    assert.isUndefined(mctad.exponential(0.5).F(-1), 'x should be ≥ 0');
  });

  it('can generate the distribution statistics for λ = 0.5', function() {
    assert.isObject(mctad.exponential(0.5));
    assert.equal(mctad.exponential(0.5).mean, 2.0);
    assert.closeTo(mctad.exponential(0.5).median, 1.38629, mctad.ε);
    assert.equal(mctad.exponential(0.5).mode, 0);
    assert.closeTo(mctad.exponential(0.5).variance, 4.0, mctad.ε);
    assert.equal(mctad.exponential(0.5).skewness, 2);
    assert.closeTo(mctad.exponential(0.5).entropy, 1.69315, mctad.ε);
    assert.deepEqual(mctad.exponential(0.5).domain, { min: 0, max: 16 });
  });

  it('can generate the probability density function for λ = 0.5', function() {
    assert.closeTo(mctad.exponential(0.5).pdf(0.0), 0.5, mctad.ε);
    assert.closeTo(mctad.exponential(0.5).pdf(1.0), 0.30327, mctad.ε);
    assert.closeTo(mctad.exponential(0.5).pdf(2.0), 0.18394, mctad.ε);
    assert.closeTo(mctad.exponential(0.5).pdf(4.0), 0.06767, mctad.ε);
    assert.closeTo(mctad.exponential(0.5).pdf(8.0), 0.00916, mctad.ε);
    assert.closeTo(mctad.exponential(0.5).pdf(16.0), 0.00017, mctad.ε);
  });

  it('can generate the cumulative probability distribution for λ = 0.5', function() {
    assert.closeTo(mctad.exponential(0.5).cdf(0.0), 0.0, mctad.ε);
    assert.closeTo(mctad.exponential(0.5).cdf(1.0), 0.39347, mctad.ε);
    assert.closeTo(mctad.exponential(0.5).cdf(2.0), 0.63212, mctad.ε);
    assert.closeTo(mctad.exponential(0.5).cdf(4.0), 0.86466, mctad.ε);
    assert.closeTo(mctad.exponential(0.5).cdf(8.0), 0.98168, mctad.ε);
    assert.closeTo(mctad.exponential(0.5).cdf(16.0), 0.99966, mctad.ε);
  });

});
