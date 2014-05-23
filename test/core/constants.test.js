require('../../mctad');
var assert = require('chai').assert;

describe('constants', function() {
  it('can return π', function() {
    assert.closeTo(mctad.π, 3.1415, 0.0001);
  });
  it('can return ε', function() {
    assert.equal(mctad.ε, 0.0001);
  });
});
