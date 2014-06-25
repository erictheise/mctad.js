require('../../mctad');
var assert = require('chai').assert;
var lr, anscombe = { ε : 0.01};

describe('simpleLinearRegression', function() {
  it('can return undefined when given something other than an array', function() {
    assert.isUndefined(mctad.simpleLinearRegression(), 'empty argument to simpleLinearRegression');
    assert.isUndefined(mctad.simpleLinearRegression(2), 'scalar to simpleLinearRegression');
    assert.isUndefined(mctad.simpleLinearRegression('string'), 'string to simpleLinearRegression');
  });

  it('can return undefined when given an empty array', function() {
    assert.isUndefined(mctad.simpleLinearRegression([]), 'the array should contain at least one data observation');
  });

  it("can return a simpleLinearRegression of Anscombe's Quartet data in valid format", function() {
    // Perversely using data from [Anscombe's Quartet](http://en.wikipedia.org/wiki/Anscombe%27s_quartet) although
    // the equivalence across datasets is only to two or three decimal places in some cases, thus anscombe.ε
    lr = mctad.simpleLinearRegression([
      [10, 8.04], [8, 6.95], [13, 7.58], [9, 8.81], [11, 8.33], [14, 9.96],
      [6, 7.24], [4, 4.26], [12, 10.84], [7, 4.82], [5, 5.68]
    ]);
    assert.closeTo(lr.x_bar, 9.0, mctad.ε, "the mean of x should be close to 9.0 for all Anscombe's Quartet data");
    assert.closeTo(lr.y_bar, 7.5, anscombe.ε, "the mean of y should be close to 7.5 for all Anscombe's Quartet data");
    assert.closeTo(lr.rxy, 0.816, anscombe.ε, "Pearson's coefficient of the correlation between x & y should be close to 0.816 for all Anscombe's Quartet data");
    assert.closeTo(lr.R2, 0.666, anscombe.ε, "the coefficient of determination between x & y should be close to 0.666 for all Anscombe's Quartet data");
    assert.closeTo(lr.α, 3.0, anscombe.ε, "the intercept should be close to 3.0 for all Anscombe's Quartet data");
    assert.closeTo(lr.β, 0.5, anscombe.ε, "the slope should be close to 0.5 for all Anscombe's Quartet data");

    lr = mctad.simpleLinearRegression([
      [10, 9.14], [8, 8.14], [13, 8.74], [9, 8.77], [11, 9.26], [14, 8.1],
      [6, 6.13], [4, 3.1], [12, 9.13], [7, 7.26], [5, 4.74]
    ]);
    assert.closeTo(lr.x_bar, 9.0, mctad.ε, "the mean of x should be close to 9.0 for all Anscombe's Quartet data");
    assert.closeTo(lr.y_bar, 7.5, anscombe.ε, "the mean of y should be close to 7.5 for all Anscombe's Quartet data");
    assert.closeTo(lr.rxy, 0.816, anscombe.ε, "Pearson's coefficient of the correlation between x & y should be close to 0.816 for all Anscombe's Quartet data");
    assert.closeTo(lr.R2, 0.666, anscombe.ε, "the coefficient of determination between x & y should be close to 0.666 for all Anscombe's Quartet data");
    assert.closeTo(lr.α, 3.0, anscombe.ε, "the intercept should be close to 3.0 for all Anscombe's Quartet data");
    assert.closeTo(lr.β, 0.5, anscombe.ε, "the slope should be close to 0.5 for all Anscombe's Quartet data");

    lr = mctad.simpleLinearRegression([
      [10, 7.46], [8, 6.77], [13, 12.74], [9, 7.11], [11, 7.81], [14, 8.84],
      [6, 6.08], [4, 5.39], [12, 8.15], [7, 6.42], [5, 5.73]
    ]);
    assert.closeTo(lr.x_bar, 9.0, mctad.ε, "the mean of x should be close to 9.0 for all Anscombe's Quartet data");
    assert.closeTo(lr.y_bar, 7.5, anscombe.ε, "the mean of y should be close to 7.5 for all Anscombe's Quartet data");
    assert.closeTo(lr.rxy, 0.816, anscombe.ε, "Pearson's coefficient of the correlation between x & y should be close to 0.816 for all Anscombe's Quartet data");
    assert.closeTo(lr.R2, 0.666, anscombe.ε, "the coefficient of determination between x & y should be close to 0.666 for all Anscombe's Quartet data");
    assert.closeTo(lr.α, 3.0, anscombe.ε, "the intercept should be close to 3.0 for all Anscombe's Quartet data");
    assert.closeTo(lr.β, 0.5, anscombe.ε, "the slope should be close to 0.5 for all Anscombe's Quartet data");

    lr = mctad.simpleLinearRegression([
      [8, 6.58], [8, 5.76], [8, 7.71], [8, 8.84], [8, 8.47], [8, 7.04],
      [8, 5.25], [19, 12.5], [8, 5.56], [8, 7.91], [8, 6.89]
    ]);
    assert.closeTo(lr.x_bar, 9.0, mctad.ε, "the mean of x should be close to 9.0 for all Anscombe's Quartet data");
    assert.closeTo(lr.y_bar, 7.5, anscombe.ε, "the mean of y should be close to 7.5 for all Anscombe's Quartet data");
    assert.closeTo(lr.rxy, 0.816, anscombe.ε, "Pearson's coefficient of the correlation between x & y should be close to 0.816 for all Anscombe's Quartet data");
    assert.closeTo(lr.R2, 0.666, anscombe.ε, "the coefficient of determination between x & y should be close to 0.666 for all Anscombe's Quartet data");
    assert.closeTo(lr.α, 3.0, anscombe.ε, "the intercept should be close to 3.0 for all Anscombe's Quartet data");
    assert.closeTo(lr.β, 0.5, anscombe.ε, "the slope should be close to 0.5 for all Anscombe's Quartet data");

  });
});
