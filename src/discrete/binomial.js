/*
# Binomial Distribution

The [Binomial Distribution](http://en.wikipedia.org/wiki/Binomial_distribution) is the discrete probability
distribution of the number of successes in a sequence of `n` independent yes/no experiments, each of which yields
success with probability `p`. Such a success/failure experiment is also called a Bernoulli experiment or
Bernoulli trial; when n = 1, the Binomial Distribution is a [Bernoulli Distribution](bernoulli.html).

### Assumptions

`n` is a strictly positive Integer and `p` is a valid probability (0 ≤ p ≤ 1).

### Use

`mctad.binomial(n, p)`

### Inline Comments
*/

mctad.binomial = function (n, p) {
  // Check that `p` is a valid probability (0 ≤ p ≤ 1), and that `n` is an integer, strictly positive.
  if (p < 0 || p > 1.0 || !mctad.isInteger(n) || n <= 0) { return undefined; }

  var x = 0, pmf, cdf = 0, dfs = {
    mean: n * p,
    median: undefined,
    mode: function () {
      if ((n + 1) * p === 0.0 || !mctad.isInteger((n + 1) * p)) {
        return [Math.floor((n + 1) * p)];
      } else {
        if (mctad.isInteger((n + 1) * p) && (n + 1) * p >= 1 && (n + 1) * p <= n) {
          return [(n + 1) * p - 1, (n + 1) * p];
        } else {
          return n;
        }
      }
    }(),
    variance: (n * p) * (1.0 - p),
    skewness: (1 - 2 * p)/Math.sqrt(n * p * (1.0 - p)),
    entropy: undefined, // @todo: implement from wikipedia once O(1/n) becomes clear
    domain: { min: 0, max: Infinity },
    range: { min: 0.0, max: 0.0 },

    // `mctad.binomial(9, .7).generate(100)` will perform 100 sequences of nine [Bernoulli trials](bernoulli.html)
    // where the random variables have a success probability of .7.
    generate: function (m) {
      var trial = [], randomVariables = [];
      for (var i = 0; i < m; i++ ) {
        trial = mctad.bernoulli(p).generate(n);
        randomVariables.push(mctad.sum(trial));
      }
      return randomVariables;
    }
  };

  // Iterate over the domain, calculating the probability mass and cumulative distribution functions.
  do {
    pmf = (mctad.factorial(n) / (mctad.factorial(x) * mctad.factorial(n - x)) * (Math.pow(p, x) * Math.pow(1.0 - p, (n - x))));
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
