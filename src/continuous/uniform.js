/*
# Uniform Distribution

The [Continuous Uniform Distribution](http://en.wikipedia.org/wiki/Uniform_distribution_(continuous)) or Rectangular Distribution is a family of symmetric probability distributions such that for each member of the family, all intervals of the same length on the distribution are equally probable.

Another paragraph.

## Use

`mctad.uniform.distribution(a, b)` where `a` and `b` are the minimum and maximum values.
*/


mctad.uniform = function (a, b) {
    // Check that `a < b`.
    if (a >= b) { return undefined; }

    var x, dfs = {
      mean: (a + b)/2,
      median: (a + b)/2,
      variance: Math.pow((b - a), 2)/12,
      skewness: 0,
      // `mctad.uniform.distribution(10, 20).generate(100)` will generate an Array of 100
      // random variables, distributed uniformly between 10 and 20, inclusive.
      generate: function (n) {
        var randomVariables = [];
        for (var k = 0; k < n; k++ ) {
          randomVariables.push(a + (b - a) * mctad.getRandomArbitrary(0, 1));
        }
        return randomVariables;
      },

      pmf: function(x) {
        if (x >= a && x <= b) {
          return 1 / (b - a);
        } else {
          return 0.0;
        }
      },

      cdf: function () {
      if (x < a) {
        return 0;
      } else {
        if (a <= x && x <= c) {
          return (Math.pow((x - a), 2))/((b - a) * (c - a));
        } else {
          if (c < x && x <= b) {
            return 1 - ((Math.pow((b - x), 2))/((b - a) * (b - c)));
          } else {
            return 1;
          }
        }
      }
    }

  };

  return dfs;

};
