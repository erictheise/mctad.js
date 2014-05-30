var mctad = require('../../../mctad');
var assert = require('chai').assert;

describe('medianDirection', function() {
    // From Example 1.1
    it('can get the medianDirection of a biased roulette wheel', function() {
        // assert.equal(this.medianDirection(['43°', '45°', '52°', '61°', '75°', '88°', '88°', '279°', '357°']), this.toRadians('52°'));
    });
    it('can get the medianDirection of one number', function() {
        // assert.equal(this.medianDirection([1]), 1);
    });
    it('an empty list has no medianDirection', function() {
        // assert.equal(this.medianDirection([]), null);
    });
});
