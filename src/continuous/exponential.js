/*
# Exponential Distribution

The [Exponential Distribution](http://en.wikipedia.org/wiki/Exponential_distribution) is the continuous analog of the
[Geometric Distribution(../discrete/geometric.html); also, it describes the time between events in a Poisson process.

### Assumptions

`λ` is a strictly positive real number, which represents the constant average rate at which events occur, continuously
and independently.

### Use

`mctad.exponential(λ)`

### Inline Comments
*/

mctad.exponential = function (λ) {
  // Check that `λ > 0`.
  if (λ < 0) { return undefined; }

  var dfs = {
    mean: 1 / λ,
    median: (1 / λ) * Math.log(2),
    mode: 0.0,
    variance: Math.pow((1 / λ), 2),
    skewness: 2.0,
    entropy: 1 - Math.log(λ),
    domain: { min: 0, max: Infinity },
    range: { min: 0, max: Infinity },

    // `mctad.exponential(1.5).generate(100)` will generate an Array of 100
    // random variables, distributed exponentially.
    generate: function (n) {
      var randomVariables = [];
      for (var k = 0; k < n; k++ ) {
        randomVariables.push(-(1 / λ) * Math.log(mctad.getRandomArbitrary(0, 1)));
      }
      return randomVariables;
    },

    pdf: function (x) {
      if (x >= 0) {
        return λ * Math.pow(Math.E, -λ * x);
      } else {
        return undefined;
      }
    },

    cdf: function (x) {
      if (x >= 0) {
        return 1 - Math.pow(Math.E, -λ * x);
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
