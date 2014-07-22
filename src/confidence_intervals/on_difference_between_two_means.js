/*
# CI on the Difference between Two Means

The [Confidence Interval on the Difference between Two Means](https://en.wikipedia.org/wiki/Confidence_interval) uses the sample means and sample standard deviations of the two sampled distributions as estimates of the population parameters. When the number of observations `n_x` or `n_y` are small (≤ 30), the Student's t Distribution is used; when large, Z Scores from the Standard Normal Distribution are used. `mctad.confidenceIntervalOnTheDifferenceBetweenTwoMeans()` returns an Array of lower, upper values for the `(1 - α/2)`interval or a Number for the lower or upper `(1 - α)` boundary.

### Assumptions

Given samples from two distributions, `x_bar` and `y_bar` are the sample means, `s_x` and `s_y` are the sample standard deviations, `n_x` and `n_y` are the number of observations, and 0.0 < `α` < 1.0. By default, the confidence interval is two-tailed; this may be changed by specifying `type` as either 'l' for lower, or 'u' for upper. Any other value for `type` generates a two-tailed confidence interval.

### Use

`mctad.confidenceIntervalOnTheDifferenceBetweenTwoMeans(x_bar, s_x, y_bar, s_y, n_x, n_y, α, 'u')`

### Inline Comments
*/

mctad.confidenceIntervalOnTheDifferenceBetweenTwoMeans = function (x_bar, s_x, y_bar, s_y, n_x, n_y, α, type) {
  if (typeof x_bar !== 'number' || typeof s_x !== 'number' || typeof y_bar !== 'number' || typeof s_y !== 'number' ||
    !mctad.isInteger(n_x) || !mctad.isInteger(n_y) || α <= 0.0 || α >= 1.0) { return undefined; }

  var
    x_bar_minus_y_bar = x_bar - y_bar,
    σ_x_bar_minus_y_bar = Math.sqrt(Math.pow(s_x, 2) / n_x + Math.pow(s_y, 2) / n_y),
    v;

  // If the sample size is large, use Z Scores from the Standard Normal Distribution.
  if (n_x > 30 && n_y > 30) {
    // Return the upper confidence bound of a one-tailed confidence interval.
    if (typeof type !== 'undefined' && type.toLowerCase() === 'u') {
      return x_bar_minus_y_bar + mctad.z(1 - α) * σ_x_bar_minus_y_bar;
    } else {
      // Return the lower confidence bound of a one-tailed confidence interval.
      if (typeof type !== 'undefined' && type.toLowerCase() === 'l') {
        return x_bar_minus_y_bar - mctad.z(1 - α) * σ_x_bar_minus_y_bar;
      } else {
        // Return both bounds of a two-tailed confidence interval.
        return [
          x_bar_minus_y_bar - mctad.z(1 - α / 2) * σ_x_bar_minus_y_bar,
          x_bar_minus_y_bar + mctad.z(1 - α / 2) * σ_x_bar_minus_y_bar
        ];
      }
    }
  } else {
    // Otherwise, calculate the degrees of freedom and use Student's t distribution.
    v = Math.floor(
      Math.pow(Math.pow(s_x, 2) / n_x + Math.pow(s_y, 2) / n_y, 2) /
        ((Math.pow(Math.pow(s_x, 2) / n_x, 2) / (n_x - 1)) + (Math.pow(Math.pow(s_y, 2) / n_y, 2) / (n_y - 1)))
    );
    // Return the upper confidence bound of a one-tailed confidence interval.
    if (typeof type !== 'undefined' && type.toLowerCase() === 'u') {
      return x_bar_minus_y_bar + mctad.t_distribution_table[v][1 - α] * σ_x_bar_minus_y_bar;
    } else {
      // Return the lower confidence bound of a one-tailed confidence interval.
      if (typeof type !== 'undefined' && type.toLowerCase() === 'l') {
        return x_bar_minus_y_bar - mctad.t_distribution_table[v][1 - α] * σ_x_bar_minus_y_bar;
      } else {
        // Return both bounds of a two-tailed confidence interval.
        return [
          x_bar_minus_y_bar - mctad.t_distribution_table[v][1 - α / 2] * σ_x_bar_minus_y_bar,
          x_bar_minus_y_bar + mctad.t_distribution_table[v][1 - α / 2] * σ_x_bar_minus_y_bar
        ];
      }
    }
  }

};
