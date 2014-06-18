/*
# Poisson Distribution
The [Poisson Distribution](http://en.wikipedia.org/wiki/Poisson_distribution) is a discrete probability
distribution that expresses the probability of a given number of events occurring in a fixed interval of time
and/or space if these events occur with a known average rate and independently of the time since the last event.

The Poisson Distribution is characterized by the strictly positive mean arrival or occurrence rate, `λ`.
*/

mctad.poisson = function (λ) {
  // Check that λ is strictly positive
  if (λ <= 0) { return null; }

  // We initialize `x`, the random variable, and `cdf`, an cdfumulator for the cumulative distribution function
  // to 0. `dfs` is the object we'll return with the `pmf` and the
  // `cdf`, as well as the trivially calculated mean & variance. We iterate until the
  // `cdf` is within `epsilon` of 1.0.
  var x = 0, pmf, cdf = 0, dfs = {
    mean: λ,
    median: Math.floor(λ + 1/3 - 0.02/λ),
    mode: [Math.floor(λ), Math.ceil(λ) - 1],
    variance: λ,
    skewness: Math.pow(λ, 0.5),
    domain: { min: 0, max: Infinity }
  };
  do {
    pmf = (Math.pow(Math.E, -λ) * Math.pow(λ, x))/mctad.factorial(x);
    cdf += pmf;
    dfs[x] = { pmf: pmf, cdf: cdf };
    x++;
  }
  while (dfs[x - 1].cdf < 1.0 - mctad.ε);
  dfs.domain.max = x - 1;

  // Mix in the convenience methods for P(X) and F(X).
  mctad.extend(dfs, mctad.discreteMixins);

  return dfs;
};
