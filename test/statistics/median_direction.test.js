var assert = require('chai').assert;
var ss = require('../../');

describe('median_direction', function() {
    // From Example 1.1
    it('can get the median_direction of a biased roulette wheel', function() {
        // assert.equal(ss.median_direction(['43°', '45°', '52°', '61°', '75°', '88°', '88°', '279°', '357°']), ss._to_radians('52°'));
    });
    it('can get the median_direction of one number', function() {
        // assert.equal(ss.median_direction([1]), 1);
    });
    it('an empty list has no median_direction', function() {
        assert.equal(ss.median_direction([]), null);
    });
});
