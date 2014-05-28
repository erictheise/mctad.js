// # Discrete Uniform Distribution

mctad.discrete_uniform = {
  distribution: function (i, j) {
    // Check that `i ≤ j`, and that `i` and `j` are integers.
    if (i > j || !mctad.isInteger(i) || !mctad.isInteger(j) ) { return null; }

    var x, pdf, cdf = 0, dfs = {
      mean: (i + j)/2,
      variance: (Math.pow((j - i + 1), 2) - 1)/12,
      domain: { min: i, max: j }
    };
    for (x = i; x <= j; x++) {
      pdf = 1/(j - i + 1);
      cdf += pdf;
      dfs[x] = { pdf: pdf, cdf: cdf };
    }
    mctad.extend(dfs, mctad.mixins);

    return dfs;
  }

};
