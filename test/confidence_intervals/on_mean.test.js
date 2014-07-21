require('../../mctad');
var assert = require('chai').assert;

describe('confidenceIntervalOnTheMean', function() {
  it('can return undefined when given inappropriate arguments', function() {
    assert.isUndefined(mctad.confidenceIntervalOnTheMean('foo', 6.83, 50, 0.05), 'x_bar is not a Number');
    assert.isUndefined(mctad.confidenceIntervalOnTheMean(12.68, 'foo', 50, 0.05), 's is not a Number');
    assert.isUndefined(mctad.confidenceIntervalOnTheMean(12.68, 6.83, 1.23, 0.05), 'n is not an Integer');
    assert.isUndefined(mctad.confidenceIntervalOnTheMean(12.68, 6.83, 50, 1.2), '0 < α < 1');
  });

  // Data from Z. Yang, Y. Chen, and Y. Yang, "Study on the Life Distribution of Microdrills", J. Engineering Manufacture,
  // 2002:301-305, cited in Example 5.2 of William Navidi, "Statistics for Engineers and Scientists", McGraw-Hill (2008).
  it('can return correct large-sample confidence intervals on the mean', function() {
    assert.closeTo(mctad.confidenceIntervalOnTheMean(12.68, 6.83, 50, 0.05)[0], 10.786821, 0.01, '95% two-tailed confidence interval');
    assert.closeTo(mctad.confidenceIntervalOnTheMean(12.68, 6.83, 50, 0.05)[1], 14.573179, 0.01, '95% two-tailed confidence interval');
    assert.closeTo(mctad.confidenceIntervalOnTheMean(12.68, 6.83, 50, 0.20)[0], 11.44, 0.01, '80% two-tailed confidence interval');
    assert.closeTo(mctad.confidenceIntervalOnTheMean(12.68, 6.83, 50, 0.20)[1], 13.92, 0.01, '80% two-tailed confidence interval');
    assert.closeTo(mctad.confidenceIntervalOnTheMean(12.68, 6.83, 50, 0.05, 'l'), 11.09, 0.01, '95% lower confidence bound');
    assert.closeTo(mctad.confidenceIntervalOnTheMean(12.68, 6.83, 50, 0.01, 'u'), 14.93, 0.01, '99% upper confidence bound');
  });

  // Data from K. Tan, K. Tong, and C. Tang, "Direct Strut-and-Tie Model for Prestressed Deep Beams", J. Structural Engineering,
  // 2001:1076-1084, cited in Example 5.19 of William Navidi, "Statistics for Engineers and Scientists", McGraw-Hill (2008).
  it('can return correct small-sample confidence intervals on the mean', function() {
    assert.closeTo(mctad.confidenceIntervalOnTheMean(668.27, 192.089, 15, 0.01)[0], 520.62, 0.01, '99% two-tailed confidence interval');
    assert.closeTo(mctad.confidenceIntervalOnTheMean(668.27, 192.089, 15, 0.01)[1], 815.92, 0.01, '99% two-tailed confidence interval');
    assert.closeTo(mctad.confidenceIntervalOnTheMean(668.27, 192.089, 15, 0.05, 'l'), 580.92939, mctad.ε, '95% lower confidence bound');
    assert.closeTo(mctad.confidenceIntervalOnTheMean(668.27, 192.089, 15, 0.025, 'u'), 774.65592, mctad.ε, '99% upper confidence bound');
  });

});
