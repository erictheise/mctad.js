require('../../mctad');
var assert = require('chai').assert;

describe('discreteUniform', function() {
  it('can return undefined when i or j are not valid parameters', function() {
    assert.isUndefined(mctad.discreteUniform(1.2, 3), 'i should be an integer');
    assert.isUndefined(mctad.discreteUniform(1, 2.3), 'j should be an integer');
    assert.isUndefined(mctad.discreteUniform(3, 2), 'i should be greater than j');
  });
  it('can generate probability and cumulative probability distributions for i = 0, j = 0', function() {
    assert.isObject(mctad.discreteUniform(0, 0));
    assert.equal(mctad.discreteUniform(0, 0)[0].pmf, 1.0);
    assert.equal(mctad.discreteUniform(0, 0)[0].cdf, 1.0);
  });
  it('can generate probability and cumulative probability distributions for i = 2, j = 5', function() {
    assert.isObject(mctad.discreteUniform(2, 5));
    assert.equal(mctad.discreteUniform(2, 5)[2].pmf, 0.25);
    assert.equal(mctad.discreteUniform(2, 5)[2].cdf, 0.25);
    assert.equal(mctad.discreteUniform(2, 5)[3].pmf, 0.25);
    assert.equal(mctad.discreteUniform(2, 5)[3].cdf, 0.5);
    assert.equal(mctad.discreteUniform(2, 5)[4].pmf, 0.25);
    assert.equal(mctad.discreteUniform(2, 5)[4].cdf, 0.75);
    assert.equal(mctad.discreteUniform(2, 5)[5].pmf, 0.25);
    assert.equal(mctad.discreteUniform(2, 5)[5].cdf, 1.0);
  });
  it('can generate probability and cumulative probability distributions for i = -5, j = -2', function() {
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
