require('../../mctad');
var assert = require('chai').assert;

describe('hypergeometric', function() {
  it('can return undefined when parameters are not valid', function() {
    assert.isUndefined(mctad.hypergeometric(10, 11, 11), 'p should be greater than 0.0');
    assert.isUndefined(mctad.hypergeometric(0.0), 'p should be greater than 0.0');
    assert.isUndefined(mctad.hypergeometric(1.5), 'p should be less than 1.0');
  });
//  it('can generate probability and cumulative probability distributions for p = 0.25', function() {
//    assert.isObject(mctad.hypergeometric(0.25));
//    assert.closeTo(mctad.hypergeometric(0.25)[0].pmf, 0.25, mctad.ε);
//    assert.closeTo(mctad.hypergeometric(0.25)[0].cdf, 0.25, mctad.ε);
//    assert.closeTo(mctad.hypergeometric(0.25)[9].pmf, 0.01877, mctad.ε);
//    assert.closeTo(mctad.hypergeometric(0.25)[9].cdf, 0.94369, mctad.ε);
//  });

});
