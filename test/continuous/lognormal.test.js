require('../../mctad');
var assert = require('chai').assert;

describe('lognormal', function() {
  it('can return undefined when μ ορ σ2 are not valid parameters', function() {
    assert.isUndefined(mctad.lognormal(-1.0, 0.0), 'μ should be ≥ 0');
    assert.isUndefined(mctad.lognormal(0.0, -1.0), 'σ2 should be > 0');
  });

  it('can return undefined when x is not a valid parameter to f(x)', function() {
    assert.isUndefined(mctad.lognormal(0.0, 1.0).f(-1), 'x should be ≥ 0');
  });

  it('can generate the distribution statistics for μ = 1.0, σ2 = 0.25', function() {
    assert.isObject(mctad.lognormal(1.0, 0.25));
    assert.closeTo(mctad.lognormal(1.0, 0.25).mean, 3.08022, mctad.ε);
    assert.closeTo(mctad.lognormal(1.0, 0.25).median, 2.71828, mctad.ε);
    assert.closeTo(mctad.lognormal(1.0, 0.25).mode, 2.11700, mctad.ε);
    assert.closeTo(mctad.lognormal(1.0, 0.25).variance, 2.69476, mctad.ε);
    assert.closeTo(mctad.lognormal(1.0, 0.25).skewness, 1.75019, mctad.ε);
    assert.closeTo(mctad.lognormal(1.0, 0.25).entropy, 1.72579, mctad.ε);
    assert.deepEqual(mctad.lognormal(1.0, 0.25).domain, { min: 0.0, max: 8.0 });
    assert.deepEqual(mctad.lognormal(1.0, 0.25).range, { min: 0.0, max: 0.4 });
    assert.closeTo(mctad.lognormal(1.0, 0.25).cdf(4.0), 0.78012, mctad.ε);
  });

});
