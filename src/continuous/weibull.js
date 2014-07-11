/*
# Weibull Distribution

The [Weibull Distribution](http://en.wikipedia.org/wiki/Weibull_distribution)

### Assumptions

`λ` and `k` are strictly positive real numbers; `λ` may be thought of as a scale parameter, `k` as a shape parameter.

### Use

`mctad.weibull(λ, k)`

### Inline Comments
*/

mctad.weibull = function (λ, k) {
  // Check that `λ > 0` and `k > 0`.
  if (λ < 0 || k < 0) { return undefined; }

  var dfs = {
    mean: λ * mctad.Γ(1 + 1 / k),
    median: λ * Math.pow(Math.log(2), 1 / k),
    mode: function () {
      if (k > 1) {
        return λ * Math.pow((k - 1) / k, 1 / k);
      } else {
        if (k === 1) {
          return 0;
        } else {
          return undefined;
        }
      }
    }(),
    variance: Math.pow(λ, 2) * ( mctad.Γ(1 + 2 / k) - Math.pow(mctad.Γ(1 + 1 / k), 2)),
    skewness: undefined, // @todo circle back for this
    entropy: undefined, // @todo circle back for this
    domain: { min: 0, max: Infinity },
    range: { min: 0, max: Infinity },

    // `mctad.weibull(1.5).generate(100)` will generate an Array of 100
    // random variables, distributed weibullly.
    generate: function (n) {
      var randomVariables = [];
      for (var k = 0; k < n; k++ ) {
        randomVariables.push(-(1 / λ) * Math.log(mctad.getRandomArbitrary(0, 1)));
      }
      return randomVariables;
    },

    pdf: function (x) {
      if (x >= 0) {
        return (k / λ) * Math.pow(x / λ, k - 1) * Math.pow(Math.E, -(Math.pow(x / λ, k)));
      } else {
        return 0.0;
      }
    },

    cdf: function (x) {
      if (x >= 0) {
        return 1 - Math.pow(Math.E, -Math.pow(x / λ, k));
      } else {
        return 0.0;
      }
    }

  };

  // Mix in the convenience methods for f(X) and F(X).
  mctad.extend(dfs, mctad.continuousMixins);

  dfs.domain.max = Math.ceil(4 * dfs.variance);
  dfs.range.max = 0.1 * Math.ceil(10 * dfs.pdf(0.0));

  return dfs;
};
