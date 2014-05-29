var assert = require('chai').assert;
var ss = require('../../');

describe('mean_direction', function() {
    // From Mardia & Jupp example 1.1
    it('can get the mean_direction of a biased roulette wheel', function() {
        assert.closeTo(ss.mean_direction(['43°', '45°', '52°', '61°', '75°', '88°', '88°', '279°', '357°']), ss._to_radians('51°'), 0.001);
    });
    it('can get the mean_direction of one number', function() {
        assert.equal(ss.mean_direction([1]), 1);
    });
    it('an empty list has no mean_direction', function() {
        assert.equal(ss.mean_direction([]), null);
    });
});
