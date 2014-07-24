require('../../mctad');
var assert = require('chai').assert;

describe('confidenceIntervalOnTheProportion', function() {
  it('can return undefined when given inappropriate arguments', function() {
    assert.isUndefined(mctad.confidenceIntervalOnTheProportion('foo', 50, 0.05), 'X is not a Number');
    assert.isUndefined(mctad.confidenceIntervalOnTheProportion(12.68, 1.23, 0.05), 'n is not an Integer');
    assert.isUndefined(mctad.confidenceIntervalOnTheProportion(12.68, 50, 1.2), '0 < α < 1');
  });

  // Data from R. Kane, K. Saleh, et al., "The Functional Outcomes of Total Knee Arthroplasty", J. Bone and Joint
  // Surgery, 2005:1719-1724, cited in Exercise 5.2.5 of William Navidi, "Statistics for Engineers and Scientists",
  // McGraw-Hill (2008).
  it('can return correct confidence intervals on the proportion', function() {
    assert.closeTo(mctad.confidenceIntervalOnTheProportion(859, 10501, 0.05)[0], 0.07672, mctad.ε, '95% two-tailed confidence interval');
    assert.closeTo(mctad.confidenceIntervalOnTheProportion(859, 10501, 0.05)[1], 0.08721, mctad.ε, '95% two-tailed confidence interval');
    assert.closeTo(mctad.confidenceIntervalOnTheProportion(859, 10501, 0.01)[0], 0.07506, mctad.ε, '95% two-tailed confidence interval');
    assert.closeTo(mctad.confidenceIntervalOnTheProportion(859, 10501, 0.01)[1], 0.08887, mctad.ε, '95% two-tailed confidence interval');
  });

});
