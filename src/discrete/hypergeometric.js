/*
# Hypergeometric Distribution

The [Hypergeometric Distribution](http://en.wikipedia.org/wiki/Hypergeometric_distribution).
*/

mctad.hypergeometric = function (N, K, n) {
  // Check that `p` is a valid probability (0 < p < 1).
  if (!mctad.isInteger(N) || !mctad.isInteger(K) || !mctad.isInteger(n) || N < 0 || K > N || n > N) { return undefined; }

  var k = 0, pmf, cdf = 0, dfs = {
    mean: n * K / N,
    median: undefined,
    mode: Math.floor(((n + 1) * (K + 1)) / (N + 2)),
    variance: n * (K / N) * ((N - K) / N) * ((N - n) / (N - 1)),
    skewness: ((N - 2 * K) * Math.pow(N - 1, 0.5) * (N - 2 * n)) / (Math.pow(n * K * (N - K) * (N - n), 0.5) * (N - 2)),
    domain: { min: 0, max: Infinity },
    range: { min: 0.0, max: 0.0 }
  };
  do {
    pmf = (this.combination(K, k) * this.combination(N - K, n - k)) / this.combination(N, n);
    cdf += pmf;
    dfs[k] = { pmf: pmf, cdf: cdf };
    if (pmf > dfs.range.max) { dfs.range.max = 0.1 * Math.ceil(10 * pmf); }
    k++;
  }
  while (dfs[k - 1].cdf < 1.0 - mctad.ε);
  dfs.domain.max = k - 1;

  // Mix in the convenience methods for p(x) and F(x).
  mctad.extend(dfs, mctad.discreteMixins);

  return dfs;
};
