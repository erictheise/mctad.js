// # Geometric Distribution

mctad.geometric = {
  distribution: function (p) {
    // Check that `p` is a valid probability (0 < p < 1).
    if (p <= 0 || p >= 1.0) { return null; }

    var x = 0, pmf, cdf = 0, dfs = {
      mean: (1 - p)/p,
      variance: (1.0 - p)/Math.pow(p, 2),
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
