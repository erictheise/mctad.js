// # Pascal Distribution
// http://en.wikipedia.org/wiki/Negative_binomial_distribution

mctad.pascal = {
  distribution: function (r, p) {
    // Check that `p` is a valid probability (0 < p < 1), and that `r` is an integer, strictly positive.
    if (p <= 0 || p >= 1.0 || !mctad.isInteger(r) || r <= 0) { return undefined; }

    var k = 0, pmf, cdf = 0, dfs = {
      mean: (r * p)/(1.0 - p),
      mode: (function () {
        if (r > 1) {
          return Math.floor((p * (r - 1))/(1.0 - p));
        } else {
          return 0;
        }
      })(),
      variance: (r * p)/Math.pow((1.0 - p), 2),
      skewness: (1 + p)/Math.sqrt(r * p),
      domain: { min: 0, max: Infinity }
    };
    do {
      pmf = (mctad.combination((k + r - 1), k) * Math.pow((1.0 - p), r)) * Math.pow(p, k);
      cdf += pmf;
      dfs[k] = { pmf: pmf, cdf: cdf };
      k++;
    }
    while (dfs[k - 1].cdf < 1.0 - mctad.ε);
    dfs.domain.max = k - 1;

    // Mix in the convenience methods for P(X) and F(X).
    mctad.extend(dfs, mctad.mixins);

    return dfs;
  }

};
