require('../../mctad');
var assert = require('chai').assert;

describe('uniform', function() {
  it('can return undefined when a or b are not valid parameters', function() {
    assert.isUndefined(mctad.uniform(3.0, 2.0), 'b should be > a');
  });

  it('can generate the distribution statistics for a = 2.0, b = 6.0', function() {
    assert.isObject(mctad.uniform(2.0, 6.0));
    assert.equal(mctad.uniform(2.0, 6.0).mean, 4.0);
    assert.equal(mctad.uniform(2.0, 6.0).median, 4.0);
    assert.equal(mctad.uniform(2.0, 6.0).mode, undefined);
    assert.closeTo(mctad.uniform(2.0, 6.0).variance, 1.33333, mctad.ε);
    assert.equal(mctad.uniform(2.0, 6.0).skewness, 0.0);
    assert.closeTo(mctad.uniform(2.0, 6.0).entropy, 1.38629, mctad.ε);
    assert.deepEqual(mctad.uniform(2.0, 6.0).domain, { min: 2, max: 6 });
  });

  it('can generate the probability density function for a = 2.0, b = 6.0', function() {
    assert.equal(mctad.uniform(2.0, 6.0).pdf(1.9), 0.0);
    assert.equal(mctad.uniform(2.0, 6.0).pdf(6.2), 0.0);
    assert.equal(mctad.uniform(2.0, 6.0).pdf(2.0), 0.25);
    assert.equal(mctad.uniform(2.0, 6.0).pdf(4.0), 0.25);
    assert.equal(mctad.uniform(2.0, 6.0).pdf(6.0), 0.25);
  });

  it('can generate the cumulative probability distribution for a = 2.0, b = 6.0', function() {
    assert.equal(mctad.uniform(2.0, 6.0).cdf(1.9), 0.0);
    assert.equal(mctad.uniform(2.0, 6.0).cdf(6.2), 1.0);
    assert.closeTo(mctad.uniform(2.0, 6.0).cdf(3.0), 0.25, mctad.ε);
    assert.closeTo(mctad.uniform(2.0, 6.0).cdf(4.0), 0.5, mctad.ε);
    assert.closeTo(mctad.uniform(2.0, 6.0).cdf(5.0), 0.75, mctad.ε);
    assert.closeTo(mctad.uniform(2.0, 6.0).cdf(6.0), 1.0, mctad.ε);
  });

  it('can generate the distribution statistics for a = -5.0, b = 5.0', function() {
    assert.isObject(mctad.uniform(-5.0, 5.0));
    assert.equal(mctad.uniform(-5.0, 5.0).mean, 0.0);
    assert.equal(mctad.uniform(-5.0, 5.0).median, 0.0);
    assert.equal(mctad.uniform(-5.0, 5.0).mode, undefined);
    assert.closeTo(mctad.uniform(-5.0, 5.0).variance, 8.33333, mctad.ε);
    assert.equal(mctad.uniform(-5.0, 5.0).skewness, 0.0);
    assert.closeTo(mctad.uniform(-5.0, 5.0).entropy, 2.30259, mctad.ε);
    assert.deepEqual(mctad.uniform(-5.0, 5.0).domain, { min: -5, max: 5 });
  });

  it('can generate the probability density function for a = -5.0, b = 5.0', function() {
    assert.equal(mctad.uniform(-5.0, 5.0).pdf(-5.1), 0.0);
    assert.equal(mctad.uniform(-5.0, 5.0).pdf(5.2), 0.0);
    assert.equal(mctad.uniform(-5.0, 5.0).pdf(-3.0), 0.1);
    assert.equal(mctad.uniform(-5.0, 5.0).pdf(0.6), 0.1);
    assert.equal(mctad.uniform(-5.0, 5.0).pdf(4.0), 0.1);
  });

  it('can generate the cumulative probability distribution for a = -5.0, b = 5.0', function() {
    assert.equal(mctad.uniform(-5.0, 5.0).cdf(-5.1), 0.0);
    assert.equal(mctad.uniform(-5.0, 5.0).cdf(5.2), 1.0);
    assert.closeTo(mctad.uniform(-5.0, 5.0).cdf(-3.0), 0.2, mctad.ε);
    assert.closeTo(mctad.uniform(-5.0, 5.0).cdf(0.6), 0.56, mctad.ε);
    assert.closeTo(mctad.uniform(-5.0, 5.0).cdf(4.0), 0.9, mctad.ε);
    assert.closeTo(mctad.uniform(-5.0, 5.0).cdf(5.0), 1.0, mctad.ε);
  });

});
