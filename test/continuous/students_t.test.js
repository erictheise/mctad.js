require('../../mctad');
var assert = require('chai').assert;

describe('t', function() {
  it('can return undefined when v ≤ 0', function() {
    assert.isUndefined(mctad.t(0.0), 'v should be > 0');
    assert.isUndefined(mctad.t(-1.0), 'v should be > 0');
  });

  it('can generate the mean correctly', function() {
    assert.equal(mctad.t(1.1).mean, 0, 'should be 0 for v > 1');
    assert.isUndefined(mctad.t(1.0).mean, 'should be undefined for v ≤ 1');
  });

  it('can generate the variance correctly', function() {
    assert.closeTo(mctad.t(2.1).variance, 21, mctad.ε, 'should be v / (v - 2) for v > 2');
    assert.equal(mctad.t(2.0).variance, Infinity, 'should be ∞ for 1 < v ≤ 2');
    assert.isUndefined(mctad.t(1.0).variance, 'should be undefined for v ≤ 1');
  });

  it('can generate the skewness correctly', function() {
    assert.equal(mctad.t(3.1).skewness, 0, 'should be 0 for v > 3');
    assert.isUndefined(mctad.t(3.0).skewness, 'should be undefined for v ≤ 3');
  });

  it('can generate the distribution statistics', function() {
    assert.isObject(mctad.t(1.0));

//    assert.equal(mctad.t(-2.0, 0.5).median, 0.0);
//    assert.equal(mctad.t(-2.0, 0.5).mode, 0.0);
//    assert.equal(mctad.t(-2.0, 0.5).variance, 0.5);
//    assert.equal(mctad.t(-2.0, 0.5).skewness, 0.0);
//    assert.closeTo(mctad.t(-2.0, 0.5).entropy, 1.07236, mctad.ε);
//    assert.deepEqual(mctad.t(-2.0, 0.5).domain, { min: -4, max: 0 });
  });

//  it('can generate the probability density function for the standard t, μ = 0.0, σ2 = 1.0', function() {
//    assert.closeTo(mctad.t(0.0, 1.0).pdf(0.0), 0.39894, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).pdf(-1.0), 0.24197, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).pdf(1.0), 0.24197, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).pdf(-2.0), 0.05399, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).pdf(2.0), 0.05399, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).pdf(-3.0), 0.00443, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).pdf(3.0), 0.00443, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).pdf(-4.0), 0.00013, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).pdf(4.0), 0.00013, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).pdf(-5.0), 0.0, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).pdf(5.0), 0.0, mctad.ε);
//  });
//
//  it('can generate the cumulative probability distribution for the standard t, μ = 0.0, σ2 = 1.0', function() {
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(-3.99), 1 - 0.99997, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(-3.5), 1 - 0.99977, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(-3.0), 1 - 0.99865, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(-2.5), 1 - 0.99379, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(-2.0), 1 - 0.97725, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(-1.5), 1 - 0.93319, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(-1.0), 1 - 0.84134, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(-0.99), 1 - 0.83891, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(-0.88), 1 - 0.81057, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(-0.77), 1 - 0.77935, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(-0.66), 1 - 0.74537, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(-0.55), 1 - 0.70884, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(-0.44), 1 - 0.67003, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(-0.33), 1 - 0.62930, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(-0.22), 1 - 0.58706, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(-0.11), 1 - 0.54379, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(0.0), 0.5, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(0.11), 0.54379, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(0.22), 0.58706, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(0.33), 0.62930, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(0.44), 0.67003, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(0.55), 0.70884, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(0.66), 0.74537, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(0.77), 0.77935, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(0.88), 0.81057, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(0.99), 0.83891, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(1.0), 0.84134, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(1.5), 0.93319, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(2.0), 0.97725, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(2.5), 0.99379, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(3.0), 0.99865, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(3.5), 0.99977, mctad.ε);
//    assert.closeTo(mctad.t(0.0, 1.0).cdf(3.99), 0.99997, mctad.ε);
//  });
//
//  it('can generate the cumulative probability distribution for an arbitrary t, μ = 800.0, σ2 = 144.0', function() {
//    assert.closeTo(mctad.t(800.0, 144.0).cdf(800.0), 0.5, mctad.ε);
//    assert.closeTo(mctad.t(800.0, 144.0).cdf(772), 1 - 0.99010, mctad.ε);
//  });

});
