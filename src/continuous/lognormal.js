/*
# Lognormal Distribution

The [Lognormal Distribution](http://en.wikipedia.org/wiki/Log-normal_distribution) is a continuous probability
distribution of a random variable whose logarithm is normally distributed.

### Assumptions

`μ` and `σ2` are real numbers, the mean and variance.

### Use

`mctad.lognormal(μ, σ2)`
*/

mctad.lognormal = function (μ, σ2) {
  // Check that `μ > 0` and `σ2 > 0`.
  if (μ < 0 || σ2 <= 0) { return undefined; }

  var dfs = {
    mean: Math.pow(Math.E, μ + σ2 / 2),
    median: Math.pow(Math.E, μ),
    mode: Math.pow(Math.E, μ - σ2),
    variance: (Math.pow(Math.E, σ2) - 1) * Math.pow(Math.E, 2 * μ + σ2),
    skewness: (Math.pow(Math.E, σ2) + 2) * Math.sqrt(Math.pow(Math.E, σ2) - 1),
    entropy: 0.5 * Math.log(2 * mctad.π * σ2) + μ,
    domain: { min: 0.0, max: Infinity },
    range: { min: 0, max: Infinity },

    // `mctad.lognormal(2.0, 0.5).generate(100)` will generate an Array of 100
    // random variables, distributed lognormally with mean 2 and variance 0.5.
    generate: function (n) {
      var randomVariables = [];
      randomVariables = mctad.normal(μ, σ2).generate(n);
      for (var i = 0; i < n; i++ ) {
        randomVariables[i] = Math.pow(Math.E, randomVariables[i]);
      }
      return randomVariables;
    },

    pdf: function (x) {
      if (x > 0) {
        return (1 / (x * Math.sqrt(2 * mctad.π * σ2))) * Math.pow(Math.E, -(Math.pow(Math.log(x) - μ, 2) / (2 * σ2)));
      } else {
        return undefined;
      }
    },

    cdf: function (x) {
      if (x > 0) {
        var Z = (Math.log(x) - μ) / Math.sqrt(2 * σ2);
        return mctad.normal(0, 1).F((Math.log(x) - μ)) / Math.sqrt(σ2);
      } else {
        return undefined;
      }
    }
  };

  // Mix in the convenience methods for f(X) and F(X).
  mctad.extend(dfs, mctad.continuousMixins);

  dfs.domain.max = μ + Math.ceil(2.5 * dfs.variance);
  dfs.range.max = 0.1 * Math.ceil(10 * dfs.pdf(dfs.mode));

  return dfs;
};
