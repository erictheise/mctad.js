require('../../mctad');
var assert = require('chai').assert;

describe('bernoulli', function() {
  it('can return undefined when p is not a valid probability', function() {
    assert.isUndefined(mctad.bernoulli(-0.01), 'p should be greater than 0.0');
    assert.isUndefined(mctad.bernoulli(1.5), 'p should be less than 1.0');
  });
  it('can generate probability mass and cumulative distribution functions for p = 0.3', function() {
    assert.isObject(mctad.bernoulli(0.3));
    assert.closeTo(mctad.bernoulli(0.3)[0].pmf, 0.7, mctad.ε);
    assert.closeTo(mctad.bernoulli(0.3)[0].cdf, 0.7, mctad.ε);
    assert.closeTo(mctad.bernoulli(0.3)[1].pmf, 0.3, mctad.ε);
    assert.closeTo(mctad.bernoulli(0.3)[1].cdf, 1.0, mctad.ε);
  });
});
