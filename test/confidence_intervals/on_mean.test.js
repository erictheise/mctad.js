require('../../mctad');
var assert = require('chai').assert;

describe('confidenceIntervalOnTheMean', function() {
//  it('can return undefined when given inappropriate arguments', function() {
//    assert.isUndefined(mctad.confidenceIntervalOnTheMean(), 'empty data to confidenceIntervalOnTheMean');
//    assert.isUndefined(mctad.confidenceIntervalOnTheMean(2), 'scalar data to confidenceIntervalOnTheMean');
//    assert.isUndefined(mctad.confidenceIntervalOnTheMean([]), 'empty Array to confidenceIntervalOnTheMean');
//    assert.isUndefined(mctad.confidenceIntervalOnTheMean('string'), 'String to confidenceIntervalOnTheMean');
//    assert.isUndefined(mctad.confidenceIntervalOnTheMean([0, 1], 1.2), '0 < α < 1');
//  });

  // Data from Yang, Chen, and Yang, "Study on the Life Distribution of Microdrills", J. Engineering Manufacture,
  // 2002:301-305 as cited in Navidi, W., "Statistics for Engineers and Scientists", McGraw-Hill.
  it('can return correct large-sample confidence intervals on the mean', function() {
    assert.closeTo(mctad.confidenceIntervalOnTheMean(12.68, 6.83, 50, 0.05)[0], 10.786821, 0.01, '95% two-tailed confidence interval');
    assert.closeTo(mctad.confidenceIntervalOnTheMean(12.68, 6.83, 50, 0.05)[1], 14.573179, 0.01, '95% two-tailed confidence interval');
    assert.closeTo(mctad.confidenceIntervalOnTheMean(12.68, 6.83, 50, 0.20)[0], 11.44, 0.01, '80% two-tailed confidence interval');
    assert.closeTo(mctad.confidenceIntervalOnTheMean(12.68, 6.83, 50, 0.20)[1], 13.92, 0.01, '80% two-tailed confidence interval');
    assert.closeTo(mctad.confidenceIntervalOnTheMean(12.68, 6.83, 50, 0.05, 'l'), 11.09, 0.01, '95% lower confidence bound');
    assert.closeTo(mctad.confidenceIntervalOnTheMean(12.68, 6.83, 50, 0.01, 'u'), 14.93, 0.01, '99% upper confidence bound');
  });

//  it('can return correct small-sample confidence intervals on the mean', function() {
//    assert.equal(mctad.confidenceIntervalOnTheMean([1]), 1, 'this confidenceIntervalOnTheMean should equal 1');
//  });

});
