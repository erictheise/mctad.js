require('../../mctad');
var assert = require('chai').assert;

describe('bernoulli', function() {
  it('can return undefined when p is not a valid probability', function() {
    assert.isUndefined(mctad.bernoulli(-0.01), 'p should be greater than 0.0');
    assert.isUndefined(mctad.bernoulli(1.5), 'p should be less than 1.0');
  });

  it('can generate stats, probability mass and cumulative distribution functions for p = 0.3', function() {
    assert.equal(mctad.bernoulli(0.3).mean, 0.3);
    assert.equal(mctad.bernoulli(0.3).median, 0.0);
    assert.deepEqual(mctad.bernoulli(0.3).mode, [0]);
    assert.closeTo(mctad.bernoulli(0.3).variance, 0.21, mctad.ε);
    assert.closeTo(mctad.bernoulli(0.3).skewness, 0.87287, mctad.ε);
    assert.closeTo(mctad.bernoulli(0.3).entropy, 0.61086, mctad.ε);
    assert.deepEqual(mctad.bernoulli(0.3).domain, { min: 0, max: 1 });
    assert.closeTo(mctad.bernoulli(0.3).range.min, 0, mctad.ε);
    assert.closeTo(mctad.bernoulli(0.3).range.max, 0.7, mctad.ε);
    assert.isObject(mctad.bernoulli(0.3));
    assert.closeTo(mctad.bernoulli(0.3)[0].pmf, 0.7, mctad.ε);
    assert.closeTo(mctad.bernoulli(0.3)[0].cdf, 0.7, mctad.ε);
    assert.closeTo(mctad.bernoulli(0.3)[1].pmf, 0.3, mctad.ε);
    assert.closeTo(mctad.bernoulli(0.3)[1].cdf, 1.0, mctad.ε);
  });
});
