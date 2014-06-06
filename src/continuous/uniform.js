/*
# Uniform Distribution

The [Continuous Uniform Distribution](http://en.wikipedia.org/wiki/Uniform_distribution_(continuous)) or Rectangular
Distribution is a family of symmetric, continuous probability distributions such that for each member of the family, all
intervals of the same length on the distribution are equally probable.

### Assumptions

`a` and `b` are real numbers, the minimum and maximum values, with a < b; a may be thought of as a location parameter,
(b - a) as a scale parameter.

### Use

`mctad.uniform(a, b)`
*/

mctad.uniform = function (a, b) {
  // Check that `a < b`.
  if (a >= b) { return undefined; }

  var dfs = {
    mean: (a + b) / 2,
    median: (a + b) / 2,
    mode: undefined, // not clear what to return, as any value in [a, b] is modal
    variance: Math.pow(b - a, 2) / 12,
    skewness: 0,
    entropy: Math.log(b - a),
    domain: { min: a, max: b },

    // `mctad.uniform(10, 20).generate(100)` will generate an Array of 100
    // random variables, distributed uniformly between 10 and 20, inclusive.
    generate: function (n) {
      var randomVariables = [];
      for (var k = 0; k < n; k++ ) {
        randomVariables.push(a + (b - a) * mctad.getRandomArbitrary(0, 1));
      }
      return randomVariables;
    },

    pdf: function (x) {
      if (x >= a && x <= b) {
        return 1 / (b - a);
      } else {
        return 0.0;
      }
    },

    cdf: function (x) {
      if (x < a) {
        return 0;
      } else {
        if (x >= a && x <= b) {
          return (x - a) / (b - a);
        } else {
          return 1;
        }
      }
    }

  };

  // Mix in the convenience methods for f(X) and F(X).
  mctad.extend(dfs, mctad.continuousMixins);

  return dfs;
};
