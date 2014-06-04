require('../../mctad');
var assert = require('chai').assert;

describe('lognormal', function() {
  it('can return undefined when μ ορ σ2 are not valid parameters', function() {
    assert.isUndefined(mctad.lognormal(-1.0, 0.0), 'μ should be > 0');
    assert.isUndefined(mctad.lognormal(0.0, -1.0), 'σ2 should be > 0');
  });

//  it('can generate the distribution statistics for μ = -2.0, σ2 = 0.5', function() {
//    assert.isObject(mctad.lognormal(-2.0, 0.5));
//    assert.equal(mctad.lognormal(-2.0, 0.5).mean, -2.0);
//    assert.equal(mctad.lognormal(-2.0, 0.5).median, -2.0);
//    assert.equal(mctad.lognormal(-2.0, 0.5).mode, -2.0);
//    assert.equal(mctad.lognormal(-2.0, 0.5).variance, 0.5);
//    assert.equal(mctad.lognormal(-2.0, 0.5).skewness, 0.0);
//    assert.closeTo(mctad.lognormal(-2.0, 0.5).entropy, 1.07236, mctad.ε);
//    assert.deepEqual(mctad.lognormal(-2.0, 0.5).domain, { min: -Infinity, max: Infinity });
//  });
//
//  it('can, though Marsaglia & Bray does it two at a time, generate the correct number of random variables', function() {
//    assert.equal(mctad.lognormal(-2.0, 0.5).generate(3).length, 3);
//    assert.equal(mctad.lognormal(-2.0, 0.5).generate(4).length, 4);
//    assert.equal(mctad.lognormal(-2.0, 0.5).generate(5).length, 5);
//    assert.equal(mctad.lognormal(-2.0, 0.5).generate(6).length, 6);
//  });
//
//  it('can generate the probability density function for the standard lognormal, μ = 0.0, σ2 = 1.0', function() {
//    assert.closeTo(mctad.lognormal(0.0, 1.0).pdf(0.0), 0.39894, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).pdf(-1.0), 0.24197, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).pdf(1.0), 0.24197, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).pdf(-2.0), 0.05399, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).pdf(2.0), 0.05399, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).pdf(-3.0), 0.00443, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).pdf(3.0), 0.00443, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).pdf(-4.0), 0.00013, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).pdf(4.0), 0.00013, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).pdf(-5.0), 0.0, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).pdf(5.0), 0.0, mctad.ε);
//  });
//
//  it('can generate the cumulative probability distribution for the standard lognormal, μ = 0.0, σ2 = 1.0', function() {
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(-3.99), 1 - 0.99997, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(-3.5), 1 - 0.99977, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(-3.0), 1 - 0.99865, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(-2.5), 1 - 0.99379, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(-2.0), 1 - 0.97725, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(-1.5), 1 - 0.93319, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(-1.0), 1 - 0.84134, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(-0.99), 1 - 0.83891, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(-0.88), 1 - 0.81057, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(-0.77), 1 - 0.77935, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(-0.66), 1 - 0.74537, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(-0.55), 1 - 0.70884, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(-0.44), 1 - 0.67003, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(-0.33), 1 - 0.62930, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(-0.22), 1 - 0.58706, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(-0.11), 1 - 0.54379, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(0.0), 0.5, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(0.11), 0.54379, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(0.22), 0.58706, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(0.33), 0.62930, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(0.44), 0.67003, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(0.55), 0.70884, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(0.66), 0.74537, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(0.77), 0.77935, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(0.88), 0.81057, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(0.99), 0.83891, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(1.0), 0.84134, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(1.5), 0.93319, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(2.0), 0.97725, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(2.5), 0.99379, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(3.0), 0.99865, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(3.5), 0.99977, mctad.ε);
//    assert.closeTo(mctad.lognormal(0.0, 1.0).cdf(3.99), 0.99997, mctad.ε);
//  });
//
//  it('can generate the cumulative probability distribution for an arbitrary lognormal, μ = 800.0, σ2 = 144.0', function() {
//    assert.closeTo(mctad.lognormal(800.0, 144.0).cdf(800.0), 0.5, mctad.ε);
//    assert.closeTo(mctad.lognormal(800.0, 144.0).cdf(772), 1 - 0.99010, mctad.ε);
//  });

});
