/*
# Poisson Distribution

The [Poisson Distribution](http://en.wikipedia.org/wiki/Poisson_distribution) is a discrete probability
distribution that expresses the probability of a given number of events occurring in a fixed interval of time
and/or space if these events occur with a known average rate and independently of the time since the last event.

The Poisson Distribution is characterized by the strictly positive mean arrival or occurrence rate, `λ`.
*/

mctad.poisson = function (λ) {
  // Check that λ is strictly positive
  if (λ <= 0) { return undefined; }

  // We initialize `x`, the random variable, and `cdf`, an cdfumulator for the cumulative distribution function
  // to 0. `dfs` is the object we'll return with the `pmf` and the
  // `cdf`, as well as the trivially calculated mean & variance. We iterate until the
  // `cdf` is within `epsilon` of 1.0.
  var x = 0, pmf, cdf = 0, dfs = {
    mean: λ,
    median: Math.floor(λ + 1 / 3 - 0.02 / λ),
    mode: [Math.floor(λ), Math.ceil(λ) - 1],
    variance: λ,
    skewness: Math.pow(λ, 0.5),
    entropy: undefined, // @todo: revisit this
    domain: { min: 0, max: Infinity },
    range: { min: 0.0, max: 0.0 },

    // `mctad.poisson(10).generate(100)` will generate an Array of 100
    // random variables, having a Poisson Distribution with an arrival rate of 10 per time unit.
    generate: function (n) {
      var a = Math.pow(Math.E, -λ), randomVariables = [];
      for (var i = 0; i < n; i++) {
        var j = 1, b = 1;
        do {
          b = b * mctad.getRandomArbitrary(0, 1);
          j++;
        }
        while (b > a);
        randomVariables.push(j - 1);
      }
      return randomVariables;
    }
  };

  // Iterate over the domain, calculating the probability mass and cumulative distribution functions.
  do {
    pmf = (Math.pow(Math.E, -λ) * Math.pow(λ, x)) / mctad.factorial(x);
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
