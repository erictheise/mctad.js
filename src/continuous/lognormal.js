/*
# Lognormal Distribution

The [Lognormal Distribution](http://en.wikipedia.org/wiki/Log-normal_distribution).

### Assumptions

`μ` and `σ2` are real numbers, the mean and variance.

### Use

`mctad.lognormal(μ, σ2)`
*/

mctad.lognormal = function (μ, σ2) {
  // Check that `μ > 0` and `σ2 > 0`.
  if (μ <= 0 || σ2 <= 0) { return undefined; }

  var dfs = {
    mean: Math.pow(Math.E, μ + σ2 / 2),
    median: Math.pow(Math.E, μ),
    mode: Math.pow(Math.E, μ - σ2),
    variance: (Math.pow(Math.E, σ2) - 1) * Math.pow(Math.E, 2 * μ + σ2),
    skewness: (Math.pow(Math.E, σ2) + 2) * Math.sqrt(Math.pow(Math.E, σ2) - 1),
    entropy: 0.5 * Math.log(2 * mctad.π * σ2) + μ,
    domain: { min: 0.0, max: Infinity },

    // `mctad.lognormal(-2.0, 0.5).generate(100)` will generate an Array of 100
    // random variables, distributed lognormally with mean -2 and variance 0.5. The implementation
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
      return (1 / (x * Math.sqrt(2 * mctad.π * σ2))) * Math.pow(Math.E, -(Math.pow(Math.log(x) - μ, 2) / (2 * σ2)));
    },

    // The implementation of the erf uses [Abramowitz and Stegun's approximation 7.1.28](http://en.wikipedia.org/wiki/Error_function#Approximation_with_elementary_functions), which in turn comes from C. Hastings, Jr., Approximations for Digital Computers, Princeton University Press, NJ, 1955.
    cdf: function (x) {
      var Z = (x - μ) / Math.sqrt(2 * σ2);

      if (Z >= 0) {
        return 0.5 * (1.0 + (1 - (1 / Math.pow(1 + 0.0705230784 * Z + 0.0422820123 * Math.pow(Z, 2) + 0.0092705272 * Math.pow(Z, 3) + 0.0001520143 * Math.pow(Z, 4) + 0.0002765672 * Math.pow(Z, 5) + 0.0000430638 * Math.pow(Z, 6), 16))));
      } else {
        return 0.5 * (1.0 - (1 - (1 / Math.pow(1 + 0.0705230784 * -Z + 0.0422820123 * Math.pow(-Z, 2) + 0.0092705272 * Math.pow(-Z, 3) + 0.0001520143 * Math.pow(-Z, 4) + 0.0002765672 * Math.pow(-Z, 5) + 0.0000430638 * Math.pow(-Z, 6), 16))));
      }
    }

  };

  // Mix in the convenience methods for f(X) and F(X).
  mctad.extend(dfs, mctad.continuousMixins);

  return dfs;
};
