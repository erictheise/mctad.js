// # Geometric Distribution
//
// This implementation uses the second definition of the [Geometric Distribution](http://en.wikipedia.org/wiki/Geometric_distribution)

mctad.geometric = {
  distribution: function (p) {
    // Check that `p` is a valid probability (0 < p ≤ 1).
    if (p <= 0 || p > 1.0) { return undefined; }

    var x = 0, pmf, cdf = 0, dfs = {
      mean: (1 - p)/p,
      mode: 0.0,
      variance: (1.0 - p)/Math.pow(p, 2),
      skewness: (2 - p)/Math.sqrt(1 - p),
      domain: { min: 0, max: Infinity }
    };
    do {
      pmf = p * Math.pow(1.0 - p, x);
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
