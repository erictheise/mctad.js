require('../../mctad');
_ = require('underscore');
var assert = require('chai').assert;

describe('binomial.distribution', function() {
  it('can return null when p or n are not valid parameters', function() {
    assert.isNull(mctad.binomial.distribution(0, 0.5), 'n should be strictly positive');
    assert.isNull(mctad.binomial.distribution(1.5, 0.5), 'n should be an integer');
    assert.isNull(mctad.binomial.distribution(2, -0.01), 'p should be greater than 0.0');
    assert.isNull(mctad.binomial.distribution(2, 1.5), 'p should be less than 1.0');
  });
  // Data given in the [Wikipedia example](http://en.wikipedia.org/wiki/Binomial_distribution#Example) retrieved 29 Mar 2014
  // Cumulative probabilities worked by hand to mitigate accumulated rounding errors.
  it('can generate probability and cumulative probability distributions for n = 6, p = 0.3', function() {
    assert.isObject(mctad.binomial.distribution(6, 0.3));
    assert.closeTo(mctad.binomial.distribution(6, 0.3)[0].pdf, 0.1176, mctad.ε);
    assert.closeTo(mctad.binomial.distribution(6, 0.3)[0].cdf, 0.1176, mctad.ε);
    assert.closeTo(mctad.binomial.distribution(6, 0.3)[1].pdf, 0.3025, mctad.ε);
    assert.closeTo(mctad.binomial.distribution(6, 0.3)[1].cdf, 0.4202, mctad.ε);
    assert.closeTo(mctad.binomial.distribution(6, 0.3)[2].pdf, 0.3241, mctad.ε);
    assert.closeTo(mctad.binomial.distribution(6, 0.3)[2].cdf, 0.7443, mctad.ε);
    assert.closeTo(mctad.binomial.distribution(6, 0.3)[3].pdf, 0.1852, mctad.ε);
    assert.closeTo(mctad.binomial.distribution(6, 0.3)[3].cdf, 0.9295, mctad.ε);
    assert.closeTo(mctad.binomial.distribution(6, 0.3)[4].pdf, 0.0595, mctad.ε);
    assert.closeTo(mctad.binomial.distribution(6, 0.3)[4].cdf, 0.9891, mctad.ε);
    assert.closeTo(mctad.binomial.distribution(6, 0.3)[5].pdf, 0.0102, mctad.ε);
    assert.closeTo(mctad.binomial.distribution(6, 0.3)[5].cdf, 0.9993, mctad.ε);
    assert.closeTo(mctad.binomial.distribution(6, 0.3)[6].pdf, 0.0007, mctad.ε);
    assert.closeTo(mctad.binomial.distribution(6, 0.3)[6].cdf, 1.0, mctad.ε);
  });
});
