// # Uniform Distribution (Discrete)
//
// `mctad.discreteUniform()` accepts two Integers, `i` and `j`, the lower and upper bounds of a range of equally likely integers, and returns an Object containing the `mean`, `median`, `mode`, `variance`, `skewness`, `entropy`,`domain`, `P` (the probability mass function, P(X)), `F` (the cumulative distribution function, F(X)), and `generate()`, a function for generating `n` random variables using the specified distribution.
//
// More at the [Wikipedia article](http://en.wikipedia.org/wiki/Discrete_uniform_distribution).

mctad.discreteUniform = function (i, j) {
  // Check that `i ≤ j`, and that `i` and `j` are integers.
  if (i > j || !mctad.isInteger(i) || !mctad.isInteger(j) ) { return undefined; }

  var x, pmf, cdf = 0, dfs = {
    mean: (i + j)/2,
    median: (i + j)/2,
    mode: undefined,
    variance: (Math.pow((j - i + 1), 2) - 1)/12,
    skewness: 0.0,
    entropy: Math.log(j - i + 1),
    domain: { min: i, max: j },
    // `mctad.discreteUniform(10, 20).generate(100)` will generate an Array of 100
    // random variables, distributed uniformly between 10 and 20, inclusive.
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
    pmf = 1/(j - i + 1);
    cdf += pmf;
    dfs[x] = { pmf: pmf, cdf: cdf };
  }
  // Mix in the convenience methods for P(X) and F(X).
  mctad.extend(dfs, mctad.discreteMixins);

  return dfs;
};
