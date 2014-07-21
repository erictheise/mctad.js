require('../../mctad');
var assert = require('chai').assert;

describe('z', function() {
  it('can return the expected z scores', function() {
    assert.closeTo(mctad.z(1 - 0.99886), -3.0, 0.05);
    assert.closeTo(mctad.z(1 - 0.99506), -2.58, 0.01);
    assert.closeTo(mctad.z(1 - 0.97500), -1.96, 0.001);
    assert.closeTo(mctad.z(1 - 0.95053), -1.65, 0.001);
    assert.closeTo(mctad.z(1 - 0.84134), -1.0, 0.001);
    assert.closeTo(mctad.z(0.50000), 0.0, 0.001);
    assert.closeTo(mctad.z(0.84134), 1.0, 0.001);
    assert.closeTo(mctad.z(0.95053), 1.65, 0.001);
    assert.closeTo(mctad.z(0.97500), 1.96, 0.001);
    assert.closeTo(mctad.z(0.99506), 2.58, 0.01);
    assert.closeTo(mctad.z(0.99886), 3.0, 0.05);
  });

});
