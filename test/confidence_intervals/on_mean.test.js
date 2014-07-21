require('../../mctad');
var assert = require('chai').assert;

describe('confidenceIntervalOnTheMean', function() {
  it('can return undefined when given inappropriate arguments', function() {
    assert.isUndefined(mctad.confidenceIntervalOnTheMean(), 'empty data to confidenceIntervalOnTheMean');
    assert.isUndefined(mctad.confidenceIntervalOnTheMean(2), 'scalar data to confidenceIntervalOnTheMean');
    assert.isUndefined(mctad.confidenceIntervalOnTheMean([]), 'empty Array to confidenceIntervalOnTheMean');
    assert.isUndefined(mctad.confidenceIntervalOnTheMean('string'), 'String to confidenceIntervalOnTheMean');
    assert.isUndefined(mctad.confidenceIntervalOnTheMean([0, 1], 1.2), '0 < α < 1');
  });

//  it('can return undefined when given an empty array', function() {
//    assert.isUndefined(mctad.confidenceIntervalOnTheMean([]), 'the array should contain at least one data observation');
//  });
//
//  it('can return the number when given an array of one number', function() {
//    assert.equal(mctad.confidenceIntervalOnTheMean([1]), 1, 'this confidenceIntervalOnTheMean should equal 1');
//  });
//
//  // Data from http://en.wikipedia.org/wiki/Mean#Arithmetic_confidenceIntervalOnTheMean_.28AM.29, retrieved 30 May 2014
//  it('can return the confidenceIntervalOnTheMean when given an array of more than one number', function() {
//    assert.equal(mctad.confidenceIntervalOnTheMean([4, 36, 45, 50, 75]), 42, 'this confidenceIntervalOnTheMean should equal 42');
//  });

});
