/*
# Uniform Distribution (Discrete)

The [Discrete Uniform Distribution](http://en.wikipedia.org/wiki/Discrete_uniform_distribution) is a symmetric
probability distribution where a finite number of values are equally likely to be observed. A common example of its
application is the roll of a fair die, where the equally likely outcomes 1, 2, …, 6 each have probability 1/6.

### Assumptions

`i` and `j` are Integers, the lower and upper bounds of a range of equally likely Integers.

### Use

`mctad.discreteUniform(i, j)`

### Inline Comments
*/

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
    range: { min: 0.0, max: 0.0 },

    // `mctad.discreteUniform(1, 6).generate(10)` will generate an Array of 10
    // random variables, distributed uniformly between 1 and 6, inclusive, as in the roll of a fair die.
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
    if (pmf > dfs.range.max) { dfs.range.max = 0.1 * Math.ceil(10 * pmf); }
  }
  // Mix in the convenience methods for p(x) and F(x).
  mctad.extend(dfs, mctad.discreteMixins);

  return dfs;
};
