// # Hypergeometric Distribution

mctad.hypergeometric = {
  distribution: function (N, K, n) {
    // Check that `p` is a valid probability (0 < p < 1).
    if (!mctad.isInteger(N) || !mctad.isInteger(K) || !mctad.isInteger(n) || N < 0 || K > N || n > N) { return undefined; }

    var x = 0, pmf, cdf = 0, dfs = {
      mean: n * K / N,
      median: undefined,
      mode: Math.floor(((n + 1) * (K + 1 ))/(N + 2)),
      variance: n * (K / N) * (N - K)/N * (N - n)/(N - 1),
      skewness: ((N - 2 * K) * Math.pow((N - 1, 0.5) * (N - 2 * n_))/(Math.pow(n * K * (N - K) * (N - n)), 0.5) * (N - 2)),
      domain: { min: 0, max: Infinity }
    };
    do {
      pmf = (this.combination(K, k) * this.combination(N - K, n - k))/this.combination(N, K);
      cdf += pmf;
      dfs[x] = { pmf: pmf, cdf: cdf };
      x++;
    }
    while (dfs[x - 1].cdf < 1.0 - mctad.ε);
    dfs.domain.max = x - 1;

    // Mix in the convenience methods for P(X) and F(X).
    mctad.extend(dfs, mctad.mixins);

    return dfs;
  }
};
