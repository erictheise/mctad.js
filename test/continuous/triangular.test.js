require('../../mctad');
var assert = require('chai').assert;

describe('discrete_uniform.distribution', function() {
  it('can generate probability and cumulative probability distributions for i = 0, j = 0', function() {
    assert.isObject(mctad.discrete_uniform.distribution(0, 0));
    assert.equal(mctad.discrete_uniform.distribution(0, 0)[0].probability_of_x, 1.0);
    assert.equal(mctad.discrete_uniform.distribution(0, 0)[0].cumulative_probability_of_x, 1.0);
  });
  it('can generate probability and cumulative probability distributions for i = 2, j = 5', function() {
    assert.isObject(mctad.discrete_uniform.distribution(2, 5));
    assert.equal(mctad.discrete_uniform.distribution(2, 5)[2].probability_of_x, 0.25);
    assert.equal(mctad.discrete_uniform.distribution(2, 5)[2].cumulative_probability_of_x, 0.25);
    assert.equal(mctad.discrete_uniform.distribution(2, 5)[3].probability_of_x, 0.25);
    assert.equal(mctad.discrete_uniform.distribution(2, 5)[3].cumulative_probability_of_x, 0.5);
    assert.equal(mctad.discrete_uniform.distribution(2, 5)[4].probability_of_x, 0.25);
    assert.equal(mctad.discrete_uniform.distribution(2, 5)[4].cumulative_probability_of_x, 0.75);
    assert.equal(mctad.discrete_uniform.distribution(2, 5)[5].probability_of_x, 0.25);
    assert.equal(mctad.discrete_uniform.distribution(2, 5)[5].cumulative_probability_of_x, 1.0);
  });
  it('can generate probability and cumulative probability distributions for i = -5, j = -2', function() {
    assert.isObject(mctad.discrete_uniform.distribution(-5, -2));
    assert.equal(mctad.discrete_uniform.distribution(-5, -2)[-5].probability_of_x, 0.25);
    assert.equal(mctad.discrete_uniform.distribution(-5, -2)[-5].cumulative_probability_of_x, 0.25);
    assert.equal(mctad.discrete_uniform.distribution(-5, -2)[-4].probability_of_x, 0.25);
    assert.equal(mctad.discrete_uniform.distribution(-5, -2)[-4].cumulative_probability_of_x, 0.5);
    assert.equal(mctad.discrete_uniform.distribution(-5, -2)[-3].probability_of_x, 0.25);
    assert.equal(mctad.discrete_uniform.distribution(-5, -2)[-3].cumulative_probability_of_x, 0.75);
    assert.equal(mctad.discrete_uniform.distribution(-5, -2)[-2].probability_of_x, 0.25);
    assert.equal(mctad.discrete_uniform.distribution(-5, -2)[-2].cumulative_probability_of_x, 1.0);
  });
  it('can return null when i or j are not valid parameters', function() {
    assert.isNull(mctad.discrete_uniform.distribution(1.2, 3), 'i should be an integer');
    assert.isNull(mctad.discrete_uniform.distribution(1, 2.3), 'j should be an integer');
    assert.isNull(mctad.discrete_uniform.distribution(3, 2), 'i should be greater than j');
  });
});
