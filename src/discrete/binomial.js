// # Binomial Distribution
// The [Binomial Distribution](http://en.wikipedia.org/wiki/Binomial_distribution) is the discrete probability
// distribution of the number of successes in a sequence of n independent yes/no experiments, each of which yields
// success with probability `p`. Such a success/failure experiment is also called a Bernoulli experiment or
// Bernoulli trial; when n = 1, the Binomial Distribution is a Bernoulli Distribution.

mctad.binomial = {
  distribution: function (n, p) {
    // Check that `p` is a valid probability (0 ≤ p ≤ 1), and that `n` is an integer, strictly positive.
    if (p < 0 || p > 1.0 || !mctad.isInteger(n) || n <= 0) { return null; }

    var x = 0, pdf, cdf = 0, dfs = {
      mean: n * p,
      variance: (n * p) * (1.0 - p),
      skewness: (1 - 2 * p)/Math.sqrt(n * p * (1.0 - p)),
      domain: { min: 0, max: Infinity }
    };
    do {
      pdf = (mctad.factorial(n) / (mctad.factorial(x) * mctad.factorial(n - x)) * (Math.pow(p, x) * Math.pow(1.0 - p, (n - x))));
      cdf += pdf;
      dfs[x] = { pdf: pdf, cdf: cdf };
      x++;
    }
    while (dfs[x - 1].cdf < 1.0 - mctad.ε);

    dfs.domain.max = x - 1;
    mctad.extend(dfs, mctad.mixins);

    return dfs;
  }

};
