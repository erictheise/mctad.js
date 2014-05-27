require('../../mctad');
_ = require('underscore');
var assert = require('chai').assert;

describe('bernoulli.distribution', function() {
  it('can return null when p is not a valid probability', function() {
    assert.isNull(mctad.bernoulli.distribution(-0.01), 'p should be greater than 0.0');
    assert.isNull(mctad.bernoulli.distribution(1.5), 'p should be less than 1.0');
  });
  it('can generate probability and cumulative probability distributions for p = 0.3', function() {
      assert.isObject(mctad.bernoulli.distribution(0.3));
      assert.closeTo(mctad.bernoulli.distribution(0.3)[0].pdf, 0.7, mctad.ε);
      assert.closeTo(mctad.bernoulli.distribution(0.3)[0].cdf, 0.7, mctad.ε);
      assert.closeTo(mctad.bernoulli.distribution(0.3)[1].pdf, 0.3, mctad.ε);
      assert.closeTo(mctad.bernoulli.distribution(0.3)[1].cdf, 1.0, mctad.ε);
  });
});
