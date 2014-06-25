/*
# Triangular Distribution

The [Triangular Distribution](http://en.wikipedia.org/wiki/Triangular_distribution) is a family of continuous
probability distributions characterized by a single mode bracketed by minimum and maximum values.

### Assumptions

`a`, `b`, and `c` are real numbers, the minimum, maximum, and modal values, with a < c < b; a may be thought of as a
location parameter, (b - a) as a scale parameter, c as a shape parameter.

### Use

`mctad.triangular(a, b, c)`

### Inline Comments
*/

mctad.triangular = function (a, b, c) {
  // Check that `a < c < b`.
  if (a >= b || a >= c || c >= b) { return undefined; }

  var dfs = {
    mean: (a + b + c) / 3,
    median: (function () {
      if (c > (a + b) / 2) {
        return a + Math.sqrt((b - a) * (c - a)) / Math.sqrt(2);
      } else {
        return b - Math.sqrt((b - a) * (b - c)) / Math.sqrt(2);
      }
    })(),
    mode: c,
    variance: (Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2) - (a * b) - (a * c) - (b * c)) / 18,
    skewness: (Math.sqrt(2) * (a + b - (2 * c)) * ((2 * a) - b - c) * (a - (2 * b) + c)) / (5 * Math.pow(Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2) - (a * b) - (a * c) - (b * c), 1.5)),
    entropy: 0.5 + Math.log((b - a) / 2),
    domain: { min: a, max: b },
    range: { min: 0, max: Infinity },

    // `mctad.triangular(1, 4, 2).generate(100)` will generate an Array of 100
    // random variables, distributed triangularly between 1 and 4, with a peak/mode of 2.
    generate: function (n) {
      // The approach is to work with the triangular(0, 1, *c\_scaled*) distribution, where 0 < c\_scaled < 1.
      var c_scaled = (c - a) / (b - a), randomVariables = [];
      for (var k = 0; k < n; k++ ) {
        var U = mctad.getRandomArbitrary(0, 1);
        if (U <= c_scaled) {
          randomVariables.push(a + (b - a) * Math.sqrt(c_scaled * U));
        } else {
          randomVariables.push(a + (b - a) * (1.0 - Math.sqrt((1.0 - c_scaled) * (1.0 - U))));
        }
      }
      return randomVariables;
    },

    pdf: function (x) {
      if (a <= x && x <= c) {
        return (2 * (x - a)) / ((b - a ) * (c - a));
      } else {
        if (c < x && x <= b) {
          return (2 * (b - x)) / ((b - a ) * (b - c));
        } else {
          return 0;
        }
      }
    },

    cdf: function (x) {
      if (x < a) {
        return 0;
      } else {
        if (a <= x && x <= c) {
          return (Math.pow((x - a), 2)) / ((b - a ) * (c - a));
        } else {
          if (c < x && x <= b) {
            return 1 - ((Math.pow((b - x), 2)) / ((b - a ) * (b - c)));
          } else {
            return 1;
          }
        }
      }
    }
  };

  // Mix in the convenience methods for f(X) and F(X).
  mctad.extend(dfs, mctad.continuousMixins);

  dfs.range.max = 0.1 * Math.ceil(10 * dfs.pdf(c));

  return dfs;
};
