require('../../mctad');
var assert = require('chai').assert;

describe('discreteUniform', function() {
  it('can return undefined when i or j are not valid parameters', function() {
    assert.isUndefined(mctad.discreteUniform(1.2, 3), 'i should be an integer');
    assert.isUndefined(mctad.discreteUniform(1, 2.3), 'j should be an integer');
    assert.isUndefined(mctad.discreteUniform(3, 2), 'j should be ≥ i');
  });

  it('can generate probability mass and cumulative distribution functions for i = 0, j = 0', function() {
    assert.isObject(mctad.discreteUniform(0, 0));
    assert.equal(mctad.discreteUniform(0, 0)[0].pmf, 1.0);
    assert.equal(mctad.discreteUniform(0, 0)[0].cdf, 1.0);
  });

  it('can generate stats, probability mass and cumulative distribution functions for a fair die, i = 1, j = 6', function() {
    assert.isObject(mctad.discreteUniform(1, 6));
    assert.closeTo(mctad.discreteUniform(1, 6).mean, 3.5, mctad.ε);
    assert.closeTo(mctad.discreteUniform(1, 6).median, 3.5, mctad.ε);
    assert.isUndefined(mctad.discreteUniform(1, 6).mode);
    assert.closeTo(mctad.discreteUniform(1, 6).variance, 2.91667, mctad.ε);
    assert.equal(mctad.discreteUniform(1, 6).skewness, 0.0);
    assert.closeTo(mctad.discreteUniform(1, 6).entropy, 1.79176, mctad.ε);
    assert.deepEqual(mctad.discreteUniform(1, 6).domain, { min: 1, max: 6 });
    assert.deepEqual(mctad.discreteUniform(1, 6).range, { min: 0, max: 0.2 });
    assert.closeTo(mctad.discreteUniform(1, 6)[1].pmf, 1/6, mctad.ε);
    assert.closeTo(mctad.discreteUniform(1, 6)[1].cdf, 1/6, mctad.ε);
    assert.closeTo(mctad.discreteUniform(1, 6)[2].pmf, 1/6, mctad.ε);
    assert.closeTo(mctad.discreteUniform(1, 6)[2].cdf, 2/6, mctad.ε);
    assert.closeTo(mctad.discreteUniform(1, 6)[3].pmf, 1/6, mctad.ε);
    assert.closeTo(mctad.discreteUniform(1, 6)[3].cdf, 3/6, mctad.ε);
    assert.closeTo(mctad.discreteUniform(1, 6)[4].pmf, 1/6, mctad.ε);
    assert.closeTo(mctad.discreteUniform(1, 6)[4].cdf, 4/6, mctad.ε);
    assert.closeTo(mctad.discreteUniform(1, 6)[5].pmf, 1/6, mctad.ε);
    assert.closeTo(mctad.discreteUniform(1, 6)[5].cdf, 5/6, mctad.ε);
    assert.closeTo(mctad.discreteUniform(1, 6)[6].pmf, 1/6, mctad.ε);
    assert.closeTo(mctad.discreteUniform(1, 6)[6].cdf, 6/6, mctad.ε);
  });

  it('can generate probability mass and cumulative distribution functions for i = -5, j = -2', function() {
    assert.isObject(mctad.discreteUniform(-5, -2));
    assert.equal(mctad.discreteUniform(-5, -2)[-5].pmf, 0.25);
    assert.equal(mctad.discreteUniform(-5, -2)[-5].cdf, 0.25);
    assert.equal(mctad.discreteUniform(-5, -2)[-4].pmf, 0.25);
    assert.equal(mctad.discreteUniform(-5, -2)[-4].cdf, 0.5);
    assert.equal(mctad.discreteUniform(-5, -2)[-3].pmf, 0.25);
    assert.equal(mctad.discreteUniform(-5, -2)[-3].cdf, 0.75);
    assert.equal(mctad.discreteUniform(-5, -2)[-2].pmf, 0.25);
    assert.equal(mctad.discreteUniform(-5, -2)[-2].cdf, 1.0);
  });
});
