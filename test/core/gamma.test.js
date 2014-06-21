require('../../mctad');
var assert = require('chai').assert;

// Test data from http://en.wikipedia.org/wiki/Particular_values_of_the_gamma_function
describe('Γ, aka gamma,', function() {
  it('can return undefined given a negative integer', function() {
    assert.isUndefined(mctad.Γ(-1));
  });

  it('can calculate Γ(n) = (n - 1)! for positive integer n', function() {
    assert.equal(mctad.Γ(1), 1);
    assert.equal(mctad.Γ(2), 1);
    assert.equal(mctad.Γ(3), 2);
    assert.equal(mctad.Γ(4), 6);
    assert.equal(mctad.Γ(5), 24);
  });

  it('can calculate Γ(n) for positive half-integers', function() {
    assert.closeTo(mctad.Γ(1/2), Math.sqrt(mctad.π), mctad.ε);
    assert.closeTo(mctad.Γ(3/2), 1 / 2 * Math.sqrt(mctad.π), mctad.ε);
    assert.closeTo(mctad.Γ(5/2), 3 / 4 * Math.sqrt(mctad.π), mctad.ε);
    assert.closeTo(mctad.Γ(7/2), 15 / 8 * Math.sqrt(mctad.π), mctad.ε);
  });

});

