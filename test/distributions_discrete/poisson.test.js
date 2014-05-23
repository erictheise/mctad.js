require('../../mctad');
var assert = require('chai').assert;

// expected cumulative probabilities taken from Appendix 1, Table I of William W. Hines & Douglas C.
// Montgomery, "Probability and Statistics in Engineering and Management Science", Wiley (1980).
describe('poisson_distribution', function() {
    it('can return generate probability and cumulative probability distributions for λ = 3.0', function() {
        assert.isObject(mctad.poisson_distribution(3.0));
        assert.closeTo(mctad.poisson_distribution(3.0)[3].probability_of_x, 0.2240, mctad.ε);
        assert.closeTo(mctad.poisson_distribution(3.0)[3].cumulative_probability_of_x, 0.647, 0.001);
    });
    it('can generate probability and cumulative probability distributions for λ = 4.0', function() {
        assert.isObject(mctad.poisson_distribution(4.0));
        assert.closeTo(mctad.poisson_distribution(4.0)[2].probability_of_x, 0.1465, mctad.ε);
        assert.closeTo(mctad.poisson_distribution(4.0)[2].cumulative_probability_of_x, 0.238, 0.001);
    });
    it('can generate probability and cumulative probability distributions for λ = 5.5', function() {
        assert.isObject(mctad.poisson_distribution(5.5));
        assert.closeTo(mctad.poisson_distribution(5.5)[7].probability_of_x, 0.1234, mctad.ε);
        assert.closeTo(mctad.poisson_distribution(5.5)[7].cumulative_probability_of_x, 0.809, 0.001);
    });
    it('can generate probability and cumulative probability distributions for λ = 9.5', function() {
        assert.isObject(mctad.poisson_distribution(9.5));
        assert.closeTo(mctad.poisson_distribution(9.5)[17].probability_of_x, 0.0088, mctad.ε);
        assert.closeTo(mctad.poisson_distribution(9.5)[17].cumulative_probability_of_x, 0.991, 0.001);
    });
    it('can return null when λ <= 0', function() {
        assert.isNull(mctad.poisson_distribution(0));
        assert.isNull(mctad.poisson_distribution(-10));
    });
});
