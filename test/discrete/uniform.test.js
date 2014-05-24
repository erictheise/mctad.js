require('../../mctad');
var assert = require('chai').assert;

describe('discrete_uniform_distribution', function() {
  it('can return generate probability and cumulative probability distributions for n = 6, p = 0.3', function() {
    // assert.isObject(mctad.binomial_distribution(6, 0.3));
    // assert.closeTo(mctad.binomial_distribution(6, 0.3)[0].probability_of_x, 0.1176, mctad.ε);

  });
  it('can return null when i or j are not valid parameters', function() {
    assert.isNull(mctad.discrete_uniform_distribution(1.2, 3), 'j should be an integer');
    assert.isNull(mctad.discrete_uniform_distribution(1, 2.3), 'j should be an integer');
    assert.isNull(mctad.discrete_uniform_distribution(3, 2), 'i should be greater than j');
  });
});
