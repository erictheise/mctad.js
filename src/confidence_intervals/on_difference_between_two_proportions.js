/*
# CI on the Difference between Two Proportions

The [Confidence Interval on the Difference between Two Proportions](https://en.wikipedia.org/wiki/Confidence_interval) uses `X` and `Y`, the number of successes found in the two samples, and `n_x` and `n_y`, the size of the samples, to estimate the population parameters. This implementation uses the [Agresti-Coull Interval](https://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval#Agresti-Coull_Interval) method, which is appropriate for any sample size. `mctad.confidenceIntervalOnTheDifferenceBetweenTwoProportions()` returns an Array of lower, upper values for the `(1 - α/2)`interval or a Number for the lower or upper `(1 - α)` boundary.

### Assumptions

`X` and `Y` are the number of successes found in the two samples, `n_x` and `n_y` are the size of the samples, and 0.0 < `α` < 1.0. By default, the confidence interval is two-tailed; this may be changed by specifying `type` as either 'l' for lower, or 'u' for upper. Any other value for `type` generates a two-tailed confidence interval.

### Use

`mctad.confidenceIntervalOnTheDifferenceBetweenTwoProportions(X, Y, n_x, n_y, α, 'u')`

### Inline Comments
*/

mctad.confidenceIntervalOnTheDifferenceBetweenTwoProportions = function (X, Y, n_x, n_y, α, type) {
  if (typeof X !== 'number' || typeof Y !== 'number' || !mctad.isInteger(n_x) || !mctad.isInteger(n_y) || α <= 0.0 || α >= 1.0) { return undefined; }

  // Apply the Agresti-Coull Interval transformation.
  var
    n_tilde_x = n_x + 2, n_tilde_y = n_y + 2,
    p_tilde_x = (X + 1) / n_tilde_x, p_tilde_y = (Y + 1) / n_tilde_y,
    p_tilde_x_minus_p_tilde_y = p_tilde_x - p_tilde_y,
    σ_p_tilde_x_p_tilde_y = Math.sqrt(p_tilde_x * (1.0 - p_tilde_x) / n_tilde_x + p_tilde_y * (1.0 - p_tilde_y) / n_tilde_y);

  // Return the upper confidence bound of a one-tailed confidence interval.
  if (typeof type !== 'undefined' && type.toLowerCase() === 'u') {
    return p_tilde_x_minus_p_tilde_y + mctad.z(1 - α) * σ_p_tilde_x_p_tilde_y;
  } else {
    // Return the lower confidence bound of a one-tailed confidence interval.
    if (typeof type !== 'undefined' && type.toLowerCase() === 'l') {
      return p_tilde_x_minus_p_tilde_y - mctad.z(1 - α) * σ_p_tilde_x_p_tilde_y;
    } else {
      // Return both bounds of a two-tailed confidence interval.
      return [
        p_tilde_x_minus_p_tilde_y - mctad.z(1 - α / 2) * σ_p_tilde_x_p_tilde_y,
        p_tilde_x_minus_p_tilde_y + mctad.z(1 - α / 2) * σ_p_tilde_x_p_tilde_y
      ];
    }
  }

};
