/*
# Simple Linear Regression

[Linear Regression](http://en.wikipedia.org/wiki/Linear_Regression) is a technique that fits a straight line (or hyperplane
in higher dimensions) to a set of observations such that the sum of the square of the distances between the line and the
observed values of the dependent variable are minimized.

[Simple Linear Regression](http://en.wikipedia.org/wiki/Simple_linear_regression)

`mctad.simpleLinearRegression()` accepts an Array of Arrays of Numbers, e.g.,

`[
   [1, 2],
   [3, 4],
   [5, 6]
]`

and returns an object of statistical measures related to the simple linear regression it performs, including:

* x_bar: the arithmetic mean of the x values
* y_bar: the arithmetic mean of the y values
* rxy: r<sub>xy</sub>, Pearson's correlation coefficient
* R2: R<sup>2</sup>, the coefficient of determination,
* α: the y-intercept of the simple linear regression line
* β: the slope of the simple linear regression line

*/

mctad.simpleLinearRegression = function (data) {
  if (!Array.isArray(data) || data.length === 0 ) { return undefined; }

  var x = [], y = [], num_acc = 0, x_diff_acc = 0, y_diff_acc = 0, rxy, α, β;
  for (var i = 0; i < data.length; i++) {
    x.push(data[i][0]);
    y.push(data[i][1]);
  }
  x_bar = mctad.arithmeticMean(x);
  y_bar = mctad.arithmeticMean(y);

  for (i = 0; i < data.length; i++) {
    num_acc += (x[i] - x_bar) * (y[i] - y_bar);
    x_diff_acc += Math.pow(x[i] - x_bar, 2);
    y_diff_acc += Math.pow(y[i] - y_bar, 2);
  }
  rxy = num_acc / Math.sqrt(x_diff_acc * y_diff_acc);

  β = rxy * (mctad.sampleStandardDeviation(y) / mctad.sampleStandardDeviation(x));
  α = y_bar - β * x_bar;

  return {
    x_bar: x_bar,
    y_bar: y_bar,
    rxy: rxy,
    R2: Math.pow(rxy, 2),
    α: α,
    β: β
  };

};
