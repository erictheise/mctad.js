// # Uniform Distribution (Discrete)
//
// `mctad.discreteUniform()` accepts two Integers, `i` and `j`, the lower and upper bounds of a range of equally likely integers, and returns an Object containing the `mean`, `median`, `mode`, `variance`, `skewness`, `entropy`,`domain`, `P` (the probability mass function, P(X)), `F` (the cumulative distribution function, F(X)), and `generate()`, a function for generating `n` random variables using the specified distribution.
//
// More at the [Wikipedia article](http://en.wikipedia.org/wiki/Discrete_uniform_distribution).

mctad.discreteUniform = {
  distribution: function (i, j) {
    // Check that `i ≤ j`, and that `i` and `j` are integers.
    if (i > j || !mctad.isInteger(i) || !mctad.isInteger(j) ) { return undefined; }

    var x, pdf, cdf = 0, dfs = {
      mean: (i + j)/2,
      median: (i + j)/2,
      mode: undefined,
      variance: (Math.pow((j - i + 1), 2) - 1)/12,
      skewness: 0.0,
      entropy: Math.log(j - i + 1),
      domain: { min: i, max: j },
      generate: function (n) {
        var randomVariables = [];
        for (var k = 0; k < n; k++ ) {
          randomVariables.push(mctad.getRandomInt(i, j));
        }
        return randomVariables;
      }
    };
    // Iterate over the domain, calculating the probability mass and cumulative distribution functions.
    for (x = i; x <= j; x++) {
      pdf = 1/(j - i + 1);
      cdf += pdf;
      dfs[x] = { pdf: pdf, cdf: cdf };
    }
    // Add convenience methods for P(X) and F(X).
    mctad.extend(dfs, mctad.mixins);

    return dfs;
  }

};
