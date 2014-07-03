/*
# von Mises Distribution

The [von Mises](https://en.wikipedia.org/wiki/Von_Mises_distribution) or Circular Normal Distribution is a continuous
probability distribution on the circle.

### Assumptions

`μ` and `κ` are real numbers, `κ` is greater than 0.

### Use

`mctad.von_mises(μ, κ)`

### Inline Comments
*/

mctad.von_mises = function (μ, κ) {
  // Check that `κ > 0`.
  if (κ <= 0) { return undefined; }

  var dfs = {
    mean: μ,
    median: μ,
    mode: μ,
    variance: σ2,
    skewness: undefined,
    entropy: 0.5 * Math.log(2 * mctad.π * Math.E * σ2),
    domain: { min: -Infinity, max: Infinity },
    range: { min: 0, max: Infinity },

    generate: function (n) {
//      var U = [], V = [], W, Y, randomVariables = [];
//      for (var k = 0; k < n / 2; k++ ) {
//        do {
//          U = [mctad.getRandomArbitrary(0, 1), mctad.getRandomArbitrary(0, 1)];
//          V = [2 * U[0] - 1, 2 * U[1] - 1];
//          W = Math.pow(V[0], 2) + Math.pow(V[1], 2);
//        } while (W > 1);
//        Y = Math.sqrt((-2 * Math.log(W) / W));
//        randomVariables.push(μ + Math.sqrt(σ2) * (V[0] * Y), μ + Math.sqrt(σ2) * (V[1] * Y));
//      }
//      if (randomVariables.length === n + 1) { randomVariables.pop(); }
//      return randomVariables;
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

  dfs.domain.min = μ - Math.ceil(3 * dfs.variance);
  dfs.domain.max = μ + Math.ceil(3 * dfs.variance);
  dfs.range.max = 0.1 * Math.ceil(10 * dfs.pdf(μ));

  return dfs;
};
