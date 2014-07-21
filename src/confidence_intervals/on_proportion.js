/*
# Confidence Interval on the Proportion

The [Confidence Interval on the Proportion}(https://en.wikipedia.org/wiki/Confidence_interval) uses the sample mean and sample standard deviation as estimates of the population parameters. When the number of observations `n` is small (≤ 30), the Student's t Distribution is used; when large, the Normal Distribution is used. `mctad.confidenceIntervalOnTheMean()` returns an Array of lower, upper values for the `(1 - α/2)`interval or a Number for the lower or upper `(1 - α)` boundary.

### Assumptions

Given a random sample of `n` observations, `x_bar` is the sample mean, `σ_bar` is the sample standard deviation, and 0.0 < `α` < 1.0. By default, the confidence interval is two-tailed; this may be changed by specifying `type` as either 'l' for lower, or 'u' for upper. Any other value for `type` generates a two-tailed confidence interval.

### Use

`mctad.confidenceIntervalOnTheProportion(x_bar, s, n, α, 'u')`

### Inline Comments
*/

mctad.confidenceIntervalOnTheProportion = function (x_bar, s, n, α, type) {
  if (typeof x_bar !== 'number' || typeof s !== 'number' || !mctad.isInteger(n) || α <= 0.0 || α >= 1.0) { return undefined; }

  var σ_bar = s / Math.sqrt(n);

  if (n > 30) {
    if (typeof type !== 'undefined' && type.toLowerCase() === 'u') {
      return x_bar + mctad.z(1 - α) * σ_bar;
    } else {
      if (typeof type !== 'undefined' && type.toLowerCase() === 'l') {
        return x_bar - mctad.z(1 - α) * σ_bar;
      } else {
        return [
          x_bar - mctad.z(1 - α / 2) * σ_bar,
          x_bar + mctad.z(1 - α / 2) * σ_bar
        ];
      }
    }
  } else {
    if (typeof type !== 'undefined' && type.toLowerCase() === 'u') {
      return x_bar + mctad.t_distribution_table[n - 1][1 - α] * σ_bar;
    } else {
      if (typeof type !== 'undefined' && type.toLowerCase() === 'l') {
        return x_bar - mctad.t_distribution_table[n - 1][1 - α] * σ_bar;
      } else {
        return [
          x_bar - mctad.t_distribution_table[n - 1][1 - α / 2] * σ_bar,
          x_bar + mctad.t_distribution_table[n - 1][1 - α / 2] * σ_bar
        ];
      }
    }
  }

};
