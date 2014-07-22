require('../../mctad');
var assert = require('chai').assert;

describe('confidenceIntervalOnTheDifferenceBetweenTwoProportions', function() {
  it('can return undefined when given inappropriate arguments', function() {
    assert.isUndefined(mctad.confidenceIntervalOnTheDifferenceBetweenTwoProportions('foo', 22, 551, 33, 144, 64, 0.05), 'x_bar is not a Number');
    assert.isUndefined(mctad.confidenceIntervalOnTheDifferenceBetweenTwoProportions(578, 'foo', 551, 33, 144, 64, 0.05), 's_x is not a Number');
    assert.isUndefined(mctad.confidenceIntervalOnTheDifferenceBetweenTwoProportions(578, 22, 'foo', 33, 144, 64, 0.05), 'y_bar is not a Number');
    assert.isUndefined(mctad.confidenceIntervalOnTheDifferenceBetweenTwoProportions(578, 22, 551, 'foo', 144, 64, 0.05), 's_y is not a Number');
    assert.isUndefined(mctad.confidenceIntervalOnTheDifferenceBetweenTwoProportions(578, 22, 551, 33, 144.1, 64, 0.05), 'n_x is not an Integer');
    assert.isUndefined(mctad.confidenceIntervalOnTheDifferenceBetweenTwoProportions(578, 22, 551, 33, 144, 64.2, 0.05), 'n_y is not an Integer');
    assert.isUndefined(mctad.confidenceIntervalOnTheDifferenceBetweenTwoProportions(578, 22, 551, 33, 144, 64, 1.2), '0 < α < 1');
  });

  // Data from Section 5.5 of William Navidi, "Statistics for Engineers and Scientists", McGraw-Hill (2008).
  it('can return correct confidence intervals on the difference between two proportions', function() {
    assert.closeTo(mctad.confidenceIntervalOnTheDifferenceBetweenTwoProportions(18, 16, 60, 90, 0.05)[0], -0.0178, 0.01, '95% two-tailed confidence interval');
    assert.closeTo(mctad.confidenceIntervalOnTheDifferenceBetweenTwoProportions(18, 16, 60, 90, 0.05)[1], 0.2612, 0.01, '95% two-tailed confidence interval');
  });

  // Data from M. Waltz, T. McLain, et al., "Discrete Bracing Analysis for Light-Frame Wood-Truss Compression Webs",
  // J. Structural Engineering, 2000:1086-1093, cited in Example 5.24 of William Navidi, "Statistics for Engineers and
  // Scientists", McGraw-Hill (2008).
  it('can return correct large-sample confidence intervals on the difference between two means', function() {
    assert.closeTo(mctad.confidenceIntervalOnTheDifferenceBetweenTwoProportions(304, 360, 380, 394, 0.05)[0], -0.1622, mctad.ε, '95% two-tailed confidence interval');
    assert.closeTo(mctad.confidenceIntervalOnTheDifferenceBetweenTwoProportions(304, 360, 380, 394, 0.05)[1], -0.0642, mctad.ε, '95% two-tailed confidence interval');
  });

});
