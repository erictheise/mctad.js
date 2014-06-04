/*
# Normal Distribution

The [Normal Distribution](http://en.wikipedia.org/wiki/Normal_distribution) or Gaussian Distribution is a family of symmetric, continuous probability distributions.

### Assumptions

`μ` and `σ2` are real numbers, the mean and variance.

### Use

`mctad.normal(μ, σ2)`
*/

mctad.normal = function (μ, σ2) {
  // Check that `σ2 > 0`.
  if (σ2 <= 0) { return undefined; }

  var dfs = {
    mean: μ,
    median: μ,
    mode: μ,
    variance: σ2,
    skewness: 0,
    entropy: 0.5 * Math.log(2 * mctad.π * Math.E * σ2),
    domain: { min: -Infinity, max: Infinity },

    // `mctad.normal(-2.0, 0.5).generate(100)` will generate an Array of 100
    // random variables, distributed normally with mean -2 and variance 0.5. The implementation
    // uses the [Marsaglia Polar Method](http://en.wikipedia.org/wiki/Marsaglia_polar_method).
    generate: function (n) {
      var U = [], V = [], W, Y, randomVariables = [];
      for (var k = 0; k < n / 2; k++ ) {
        do {
          U = [mctad.getRandomArbitrary(0, 1), mctad.getRandomArbitrary(0, 1)];
          V = [2 * U[0] - 1, 2 * U[1] - 1];
          W = Math.pow(V[0], 2) + Math.pow(V[1], 2);
        } while (W > 1);
      Y = Math.sqrt((-2 * Math.log(W) / W));
      randomVariables.push(μ + Math.sqrt(σ2) * (V[0] * Y), μ + Math.sqrt(σ2) * (V[1] * Y));
      }
      if (randomVariables.length === n + 1) { randomVariables.pop(); }
      return randomVariables;
    },

    pdf: function (x) {
      return (1 / (Math.sqrt(σ2) * Math.sqrt(2 * mctad.π))) * Math.pow(Math.E, -(Math.pow(x - μ, 2) / (2 * σ2)));
    },

    cdf: function (x) {
      var Z = (x - μ) / Math.sqrt(2 * σ2);

      if (Z >= 0) {
        return 0.5 * (1.0 + mctad.erf(Z));
      } else {
        return 0.5 * (1.0 - mctad.erf(-Z));
      }
    }

  };

  // Mix in the convenience methods for f(X) and F(X).
  mctad.extend(dfs, mctad.continuousMixins);

  return dfs;
};
