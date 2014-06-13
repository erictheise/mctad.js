// # Linear Regression
//
// [Linear Regression](http://en.wikipedia.org/wiki/Linear_Regression) is a technique that fits a straight line (or hyperplane
// in higher dimensions) to a set of observations such the the sum of the square of the distances between the line and the
// observed values of the dependent variable are minimized.
//
// [Simple Linear Regression](http://en.wikipedia.org/wiki/Simple_linear_regression)
//
// `mctad.linearRegression()` accepts an Array of Numbers .

mctad.linearRegression = function (data) {
  if (!Array.isArray(data) || data.length === 0 ) { return undefined; }

  var x = [], y = [], num_acc = 0, x_diff_acc = 0, y_diff_acc = 0, rxy, α, β;
  for (var i = 0; i < data.length; i++) {
    x.push(data[i][0]);
    y.push(data[i][1]);
  }
  x_bar = mctad.mean(x);
  y_bar = mctad.mean(y);

  for (i = 0; i < data.length; i++) {
    num_acc += (x[i] - x_bar) * (y[i] - y_bar);
    x_diff_acc += Math.pow(x[i] - x_bar, 2);
    y_diff_acc += Math.pow(y[i] - y_bar, 2);
  }
  rxy = num_acc / Math.sqrt(x_diff_acc * y_diff_acc);

  β = rxy * (mctad.sampleStandardDeviation(y) / mctad.sampleStandardDeviation(x));
  α = y_bar - β * x_bar;

  return {
    β: β,
    α: α
  };

};
