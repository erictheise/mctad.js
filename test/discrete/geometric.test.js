require('../../mctad');
var assert = require('chai').assert;

describe('geometric', function() {
  it('can return undefined when p is not a valid probability', function() {
    assert.isUndefined(mctad.geometric(-1.0), 'p should be greater than 0.0');
    assert.isUndefined(mctad.geometric(0.0), 'p should be greater than 0.0');
    assert.isUndefined(mctad.geometric(1.5), 'p should be less than 1.0');
  });

  it('can generate stats, probability mass and cumulative distribution functions for p = 0.25', function() {
    assert.isObject(mctad.geometric(0.25));
    assert.closeTo(mctad.geometric(0.25).mean, 3.0, mctad.ε);
    assert.isUndefined(mctad.geometric(0.25).median);
    assert.equal(mctad.geometric(0.25).mode, 0);
    assert.closeTo(mctad.geometric(0.25).variance, 12.0, mctad.ε);
    assert.closeTo(mctad.geometric(0.25).skewness, 2.02073, mctad.ε);
    assert.closeTo(mctad.geometric(0.25).entropy, 3.24511, mctad.ε);
    assert.deepEqual(mctad.geometric(0.25).domain, { min: 0, max: 32 });
    assert.closeTo(mctad.geometric(0.25).range.min, 0, mctad.ε);
    assert.closeTo(mctad.geometric(0.25).range.max, 0.3, mctad.ε);
    assert.closeTo(mctad.geometric(0.25)[0].pmf, 0.25, mctad.ε);
    assert.closeTo(mctad.geometric(0.25)[0].cdf, 0.25, mctad.ε);
    assert.closeTo(mctad.geometric(0.25)[9].pmf, 0.01877, mctad.ε);
    assert.closeTo(mctad.geometric(0.25)[9].cdf, 0.94369, mctad.ε);
  });

  it('can generate probability mass and cumulative distribution functions for p = 0.5', function() {
    assert.isObject(mctad.geometric(0.5));
    assert.closeTo(mctad.geometric(0.5)[0].pmf, 0.5, mctad.ε);
    assert.closeTo(mctad.geometric(0.5)[0].cdf, 0.5, mctad.ε);
    assert.closeTo(mctad.geometric(0.5)[9].pmf, 0.00098, mctad.ε);
    assert.closeTo(mctad.geometric(0.5)[9].cdf, 0.99902, mctad.ε);
  });
});
