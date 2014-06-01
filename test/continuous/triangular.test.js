require('../../mctad');
var assert = require('chai').assert;

describe('triangular', function() {

  it('can return undefined when a, b, or c are not valid parameters', function() {
    assert.isUndefined(mctad.triangular(1.0, 2.0, 3.0), 'b should be ≥ c');
    assert.isUndefined(mctad.triangular(2.0, 3.0, 1.0), 'c should be ≥ a');
    assert.isUndefined(mctad.triangular(3.0, 1.0, 2.0), 'a should be ≤ b and c');
  });

  it('can generate the distribution statistics for a = 2.0, b = 6.0, c = 3.0', function() {
    assert.isObject(mctad.triangular(2.0, 6.0, 3.0));
    assert.closeTo(mctad.triangular(2.0, 6.0, 3.0).mean, 11/3, mctad.ε);
    assert.closeTo(mctad.triangular(2.0, 6.0, 3.0).median, 3.55051, mctad.ε);
    assert.closeTo(mctad.triangular(2.0, 6.0, 3.0).mode, 3.0, mctad.ε);
    assert.closeTo(mctad.triangular(2.0, 6.0, 3.0).variance, 0.72222, mctad.ε);
    assert.closeTo(mctad.triangular(2.0, 6.0, 3.0).skewness, 0.42240, mctad.ε);
    assert.closeTo(mctad.triangular(2.0, 6.0, 3.0).entropy, 1.19315, mctad.ε);
    assert.deepEqual(mctad.triangular(2.0, 6.0, 3.0).domain, { min: 2, max: 6 });
  });

  it('can generate the probability density function for a = 2.0, b = 6.0, c = 3.0', function() {
    assert.equal(mctad.triangular(2.0, 6.0, 3.0).pdf(1.9), 0.0);
    assert.equal(mctad.triangular(2.0, 6.0, 3.0).pdf(6.2), 0.0);
    assert.equal(mctad.triangular(2.0, 6.0, 3.0).pdf(2.0), 0.0);
    assert.closeTo(mctad.triangular(2.0, 6.0, 3.0).pdf(2.5), 0.25, mctad.ε);
    assert.closeTo(mctad.triangular(2.0, 6.0, 3.0).pdf(3.0), 0.5, mctad.ε);
    assert.closeTo(mctad.triangular(2.0, 6.0, 3.0).pdf(4.0), 0.33333, mctad.ε);
    assert.closeTo(mctad.triangular(2.0, 6.0, 3.0).pdf(6.0), 0.0, mctad.ε);
  });

  it('can generate the cumulative probability distribution for a = 2.0, b = 6.0, c = 3.0', function() {
    assert.equal(mctad.triangular(2.0, 6.0, 3.0).cdf(1.9), 0.0);
    assert.equal(mctad.triangular(2.0, 6.0, 3.0).cdf(6.2), 1.0);
    assert.closeTo(mctad.triangular(2.0, 6.0, 3.0).cdf(2.0), 0.0, mctad.ε);
    assert.closeTo(mctad.triangular(2.0, 6.0, 3.0).cdf(3.0), 0.25, mctad.ε);
    assert.closeTo(mctad.triangular(2.0, 6.0, 3.0).cdf(4.0), 0.66667, mctad.ε);
    assert.closeTo(mctad.triangular(2.0, 6.0, 3.0).cdf(5.0), 11/12, mctad.ε);
    assert.closeTo(mctad.triangular(2.0, 6.0, 3.0).cdf(6.0), 1.0, mctad.ε);
  });

  it('can generate the distribution statistics for a = -5.0, b = 5.0, c = 3.0', function() {
    assert.isObject(mctad.triangular(-5.0, 5.0, 3.0));
    assert.closeTo(mctad.triangular(-5.0, 5.0, 3.0).mean, 1.0, mctad.ε);
    assert.closeTo(mctad.triangular(-5.0, 5.0, 3.0).median, 1.32456, mctad.ε);
    assert.closeTo(mctad.triangular(-5.0, 5.0, 3.0).mode, 3.0, mctad.ε);
    assert.closeTo(mctad.triangular(-5.0, 5.0, 3.0).variance, 4.66667, mctad.ε);
    assert.closeTo(mctad.triangular(-5.0, 5.0, 3.0).skewness, -0.47614, mctad.ε);
    assert.closeTo(mctad.triangular(-5.0, 5.0, 3.0).entropy, 2.10944, mctad.ε);
    assert.deepEqual(mctad.triangular(-5.0, 5.0, 3.0).domain, { min: -5, max: 5 });
  });

  it('can generate the probability density function for a = -5.0, b = 5.0, c = 3.0', function() {
    assert.equal(mctad.triangular(-5.0, 5.0, 3.0).pdf(-5.1), 0.0);
    assert.equal(mctad.triangular(-5.0, 5.0, 3.0).pdf(5.2), 0.0);
    assert.equal(mctad.triangular(-5.0, 5.0, 3.0).pdf(-5.0), 0.0);
    assert.closeTo(mctad.triangular(-5.0, 5.0, 3.0).pdf(-3.0), 0.05, mctad.ε);
    assert.closeTo(mctad.triangular(-5.0, 5.0, 3.0).pdf(0.6), 0.14, mctad.ε);
    assert.closeTo(mctad.triangular(-5.0, 5.0, 3.0).pdf(4.0), 0.1, mctad.ε);
    assert.closeTo(mctad.triangular(-5.0, 5.0, 3.0).pdf(6.0), 0.0, mctad.ε);
  });

  it('can generate the cumulative probability distribution for a = -5.0, b = 5.0, c = 3.0', function() {
    assert.equal(mctad.triangular(-5.0, 5.0, 3.0).cdf(-5.1), 0.0);
    assert.equal(mctad.triangular(-5.0, 5.0, 3.0).cdf(5.2), 1.0);
    assert.equal(mctad.triangular(-5.0, 5.0, 3.0).cdf(-5.0), 0.0);
    assert.closeTo(mctad.triangular(-5.0, 5.0, 3.0).cdf(-3.0), 0.05, mctad.ε);
    assert.closeTo(mctad.triangular(-5.0, 5.0, 3.0).cdf(0.6), 0.392, mctad.ε);
    assert.closeTo(mctad.triangular(-5.0, 5.0, 3.0).cdf(4.0), 0.95, mctad.ε);
    assert.closeTo(mctad.triangular(-5.0, 5.0, 3.0).cdf(5.0), 1.0, mctad.ε);
  });

});
