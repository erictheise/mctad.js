/*
# Geometric Distribution

The [Geometric Distribution](http://en.wikipedia.org/wiki/Geometric_distribution), as implemented here, can be used to
model the number of failures before the first success in a sequence of [Bernoulli trials](bernoulli.html).

### Assumptions

`p` is a valid probability (0 < p ≤ 1).

### Use

`mctad.geometric(p)`

### Inline Comments
*/

mctad.geometric = function (p) {
  // Check that `p` is a valid probability (0 < p ≤ 1).
  if (p <= 0 || p > 1.0) { return undefined; }

  var x = 0, pmf, cdf = 0, dfs = {
    mean: (1 - p)/p,
    median: undefined, // @todo: understand nonuniqueness as laid out at wikipedia page
    mode: [0.0],
    variance: (1.0 - p)/Math.pow(p, 2),
    skewness: (2 - p)/Math.sqrt(1 - p),
    entropy: (-(1.0 - p) * (Math.log(1.0 - p) / Math.LN2) - p * (Math.log(p) / Math.LN2)) / p,
    domain: { min: 0, max: Infinity },
    range: { min: 0.0, max: 0.0 },

    // `mctad.geometric(0.25).generate(100)` will generate an Array of 100
    // random variables, distributed geometrically with a probability .25 of success.
    generate: function (n) {
      var randomVariables = [];
      for (var k = 0; k < n; k++ ) {
        randomVariables.push(Math.floor(Math.log(mctad.getRandomArbitrary(0, 1))/Math.log(1.0 - p)));
      }
      return randomVariables;
    }
  };

  // Iterate over the domain, calculating the probability mass and cumulative distribution functions.
  do {
    pmf = p * Math.pow(1.0 - p, x);
    cdf += pmf;
    dfs[x] = { pmf: pmf, cdf: cdf };
    if (pmf > dfs.range.max) { dfs.range.max = 0.1 * Math.ceil(10 * pmf); }
    x++;
  }
  while (dfs[x - 1].cdf < 1.0 - mctad.ε);
  dfs.domain.max = x - 1;

  // Mix in the convenience methods for p(x) and F(x).
  mctad.extend(dfs, mctad.discreteMixins);

  return dfs;
};
