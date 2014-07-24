require('../../mctad');
var assert = require('chai').assert;

describe('confidenceIntervalOnTheDifferenceBetweenTwoMeans', function() {
  it('can return undefined when given inappropriate arguments', function() {
    assert.isUndefined(mctad.confidenceIntervalOnTheDifferenceBetweenTwoMeans('foo', 22, 551, 33, 144, 64, 0.05), 'x_bar is not a Number');
    assert.isUndefined(mctad.confidenceIntervalOnTheDifferenceBetweenTwoMeans(578, 'foo', 551, 33, 144, 64, 0.05), 's_x is not a Number');
    assert.isUndefined(mctad.confidenceIntervalOnTheDifferenceBetweenTwoMeans(578, 22, 'foo', 33, 144, 64, 0.05), 'y_bar is not a Number');
    assert.isUndefined(mctad.confidenceIntervalOnTheDifferenceBetweenTwoMeans(578, 22, 551, 'foo', 144, 64, 0.05), 's_y is not a Number');
    assert.isUndefined(mctad.confidenceIntervalOnTheDifferenceBetweenTwoMeans(578, 22, 551, 33, 144.1, 64, 0.05), 'n_x is not an Integer');
    assert.isUndefined(mctad.confidenceIntervalOnTheDifferenceBetweenTwoMeans(578, 22, 551, 33, 144, 64.2, 0.05), 'n_y is not an Integer');
    assert.isUndefined(mctad.confidenceIntervalOnTheDifferenceBetweenTwoMeans(578, 22, 551, 33, 144, 64, 1.2), '0 < α < 1');
  });

  // Data from Section 5.4 of William Navidi, "Statistics for Engineers and Scientists", McGraw-Hill (2008).
  it('can return correct large-sample confidence intervals on the difference between two means', function() {
    assert.closeTo(mctad.confidenceIntervalOnTheDifferenceBetweenTwoMeans(578, 22, 551, 33, 144, 64, 0.05)[0], 18.15, 0.01, '95% two-tailed confidence interval');
    assert.closeTo(mctad.confidenceIntervalOnTheDifferenceBetweenTwoMeans(578, 22, 551, 33, 144, 64, 0.05)[1], 35.85, 0.01, '95% two-tailed confidence interval');
  });

  // Data from M. Ahmed, M. Sharma, et al., "Sampling Soil Water in Sandy Soils: Comparative Analysis of Some Common
  // Methods", Communications in Soil Science and Plant Analysis, 2001:1677-1686, cited in Example 5.23 of William
  // Navidi, "Statistics for Engineers and Scientists", McGraw-Hill (2008).
  it('can return correct large-sample confidence intervals on the difference between two means', function() {
    assert.closeTo(mctad.confidenceIntervalOnTheDifferenceBetweenTwoMeans(88.5, 49.4, 110.6, 51.5, 50, 50, 0.05)[0], -41.9, 0.1, '95% two-tailed confidence interval');
    assert.closeTo(mctad.confidenceIntervalOnTheDifferenceBetweenTwoMeans(88.5, 49.4, 110.6, 51.5, 50, 50, 0.05)[1], -2.3, 0.1, '95% two-tailed confidence interval');
  });

  // Data from Section 5.6 of William Navidi, "Statistics for Engineers and Scientists", McGraw-Hill (2008).
  it('can return correct small-sample confidence intervals on the difference between two means', function() {
    assert.closeTo(mctad.confidenceIntervalOnTheDifferenceBetweenTwoMeans(83.2, 5.2, 71.3, 3.1, 6, 10, 0.05)[0], 6.37, 0.0001, '95% two-tailed confidence interval');
    assert.closeTo(mctad.confidenceIntervalOnTheDifferenceBetweenTwoMeans(83.2, 5.2, 71.3, 3.1, 6, 10, 0.05)[1], 17.43, 0.0001, '95% two-tailed confidence interval');
  });

  // Data from C. Ernst, N. Brand, et al., "Reduction of Polymerization Shrinkage Stress and Marginal Leakage Using
  // Soft-Start Polymerization", J. Esthetic and Restorative Dentistry, 2003:93-104, cited in Example 5.25 of William
  // Navidi, "Statistics for Engineers and Scientists", McGraw-Hill (2008).
  it('can return correct small-sample confidence intervals on the difference between two means', function() {
    assert.closeTo(mctad.confidenceIntervalOnTheDifferenceBetweenTwoMeans(400.9, 10.6, 367.2, 6.1, 15, 15, 0.02)[0], 25.8, 0.1, '98% two-tailed confidence interval');
    assert.closeTo(mctad.confidenceIntervalOnTheDifferenceBetweenTwoMeans(400.9, 10.6, 367.2, 6.1, 15, 15, 0.02)[1], 41.6, 0.1, '98% two-tailed confidence interval');
  });

});
