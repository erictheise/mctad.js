/*
# Confidence Interval on the Proportion

The [Confidence Interval on the Proportion](https://en.wikipedia.org/wiki/Confidence_interval) uses `X`, the number of successes found in a sample, and `n`, the size of the sample, to estimate the population parameters. This implementation uses the [Agresti-Coull Interval](https://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval#Agresti-Coull_Interval) method, which is appropriate for any sample size `n`. `mctad.confidenceIntervalOnTheProportion()` returns an Array of lower, upper values for the `(1 - α/2)`interval or a Number for the lower or upper `(1 - α)` boundary.

### Assumptions

`X` is the number of successes found in a sample, `n` is the size of the sample, and 0.0 < `α` < 1.0. By default, the confidence interval is two-tailed; this may be changed by specifying `type` as either 'l' for lower, or 'u' for upper. Any other value for `type` generates a two-tailed confidence interval.

### Use

`mctad.confidenceIntervalOnTheProportion(X, n, α, 'u')`

### Inline Comments
*/

mctad.confidenceIntervalOnTheProportion = function (X, n, α, type) {
  if (typeof X !== 'number' || !mctad.isInteger(n) || α <= 0.0 || α >= 1.0) { return undefined; }

  var
  // Apply the Agresti-Coull Interval transformation.
    n_tilde = n + 4,
    p_tilde = (X + 2)/ n_tilde,
    σ_p_tilde = Math.sqrt(p_tilde * (1.0 - p_tilde) / n_tilde);

  if (typeof type !== 'undefined' && type.toLowerCase() === 'u') {
    // Return the upper confidence bound of a one-tailed confidence interval.
    return p_tilde + mctad.z(1 - α) * σ_p_tilde;
  } else {
    if (typeof type !== 'undefined' && type.toLowerCase() === 'l') {
      // Return the lower confidence bound of a one-tailed confidence interval.
      return p_tilde - mctad.z(1 - α) * σ_p_tilde;
    } else {
      // Return both bounds of a two-tailed confidence interval.
      return [
        p_tilde - mctad.z(1 - α / 2) * σ_p_tilde,
        p_tilde + mctad.z(1 - α / 2) * σ_p_tilde
      ];
    }
  }

};
