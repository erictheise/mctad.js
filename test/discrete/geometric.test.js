require('../../mctad');
var assert = require('chai').assert;

describe('geometric.distribution', function() {
  it('can return undefined when p is not a valid probability', function() {
    assert.isUndefined(mctad.geometric.distribution(-1.0), 'p should be greater than 0.0');
    assert.isUndefined(mctad.geometric.distribution(0.0), 'p should be greater than 0.0');
    assert.isUndefined(mctad.geometric.distribution(1.5), 'p should be less than 1.0');
  });
  it('can generate probability and cumulative probability distributions for p = 0.25', function() {
    assert.isObject(mctad.geometric.distribution(0.25));
    assert.closeTo(mctad.geometric.distribution(0.25)[0].pmf, 0.25, mctad.ε);
    assert.closeTo(mctad.geometric.distribution(0.25)[0].cdf, 0.25, mctad.ε);
    assert.closeTo(mctad.geometric.distribution(0.25)[9].pmf, 0.01877, mctad.ε);
    assert.closeTo(mctad.geometric.distribution(0.25)[9].cdf, 0.94369, mctad.ε);
  });
  it('can generate probability and cumulative probability distributions for p = 0.5', function() {
    assert.isObject(mctad.geometric.distribution(0.5));
    assert.closeTo(mctad.geometric.distribution(0.5)[0].pmf, 0.5, mctad.ε);
    assert.closeTo(mctad.geometric.distribution(0.5)[0].cdf, 0.5, mctad.ε);
    assert.closeTo(mctad.geometric.distribution(0.5)[9].pmf, 0.00098, mctad.ε);
    assert.closeTo(mctad.geometric.distribution(0.5)[9].cdf, 0.99902, mctad.ε);
  });
});
