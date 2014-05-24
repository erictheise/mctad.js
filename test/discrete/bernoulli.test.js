require('../../mctad');
var assert = require('chai').assert;

describe('bernoulli_distribution', function() {
    it('can return generate probability and cumulative probability distributions for p = 0.3', function() {
        assert.isObject(mctad.bernoulli_distribution(0.3));
        assert.closeTo(mctad.bernoulli_distribution(0.3)[0].probability_of_x, 0.7, mctad.ε);
        assert.closeTo(mctad.bernoulli_distribution(0.3)[0].cumulative_probability_of_x, 0.7, mctad.ε);
        assert.closeTo(mctad.bernoulli_distribution(0.3)[1].probability_of_x, 0.3, mctad.ε);
        assert.closeTo(mctad.bernoulli_distribution(0.3)[1].cumulative_probability_of_x, 1.0, mctad.ε);
    });
    it('can return null when p is not a valid probability', function() {
        assert.isNull(mctad.bernoulli_distribution(-0.01), 'p should be greater than 0.0');
        assert.isNull(mctad.bernoulli_distribution(1.5), 'p should be less than 1.0');
    });
});
