require('../../mctad');
var assert = require('chai').assert;

describe('pascal', function() {
  it('can return undefined when given invalid parameters', function() {
    assert.isUndefined(mctad.pascal(0, 0.5), 'r must be strictly greater than zero');
    assert.isUndefined(mctad.pascal(5.5, 0.5), 'r must be an integer');
    assert.isUndefined(mctad.pascal(5, 0.0), 'p must be strictly greater than zero');
    assert.isUndefined(mctad.pascal(5, 1.0), 'p must be strictly less than one');
  });

  // Data taken from the example at http://en.wikipedia.org/wiki/Negative_binomial_distribution#Selling_candy
  // retrieved 19 June 2014
  it('can generate stats, probability mass and cumulative distribution functions for λ = 3.0', function() {
    assert.isObject(mctad.pascal(5, 0.4));
    assert.closeTo(mctad.pascal(5, 0.4).mean, 3.33333, mctad.ε);
    assert.isUndefined(mctad.pascal(5, 0.4).median);
    assert.equal(mctad.pascal(5, 0.4).mode, [2]);
    assert.closeTo(mctad.pascal(5, 0.4).variance, 5.55555, mctad.ε);
    assert.closeTo(mctad.pascal(5, 0.4).skewness, 0.98995, mctad.ε);
    assert.isUndefined(mctad.pascal(5, 0.4).entropy);
    assert.deepEqual(mctad.pascal(5, 0.4).domain, { min: 0, max: 17 });
    assert.closeTo(mctad.pascal(5, 0.4).range.min, 0, mctad.ε);
    assert.closeTo(mctad.pascal(5, 0.4).range.max, 0.2, mctad.ε);
    assert.closeTo(mctad.pascal(5, 0.4)[0].pmf, 0.07776, mctad.ε);
    assert.closeTo(mctad.pascal(5, 0.4)[0].cdf, 0.07776, mctad.ε);
    assert.closeTo(mctad.pascal(5, 0.4)[3].pmf, 0.17418, mctad.ε);
    assert.closeTo(mctad.pascal(5, 0.4)[3].cdf, 0.59409, mctad.ε);
    assert.closeTo(mctad.pascal(5, 0.4)[7].pmf, 0.04204, mctad.ε);
    assert.closeTo(mctad.pascal(5, 0.4)[7].cdf, 0.94269, mctad.ε);
    assert.closeTo(mctad.pascal(5, 0.4)[10].pmf, 0.00816, mctad.ε);
    assert.closeTo(mctad.pascal(5, 0.4)[10].cdf, 0.99065, mctad.ε);
  });

});
