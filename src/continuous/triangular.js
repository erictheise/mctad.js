// # Triangular Distribution
//
// http://en.wikipedia.org/wiki/Triangular_distribution

mctad.triangular = function (a, b, c) {
  // Check that `a < c < b`.
  if (a >= b || a >= c || c >= b) { return undefined; }

  var pmf, x, dfs = {
    mean: (a + b + c)/3,
    median: (function () {
      if (c > (a + b)/2) {
        return a + Math.sqrt((b - a) * (c - a))/Math.sqrt(2);
      } else {
        return b - Math.sqrt((b - a) * (b - c))/Math.sqrt(2);
      }
    })(),
    mode: c,
    variance: (Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2) - (a * b) - (a * c) - (b * c))/18,
    skewness: (Math.sqrt(2) * (a + b - 2 * c) * (2 * a - b - c) * (a - 2 * b + c))/(5 * Math.pow((Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2) - a * b - a * c - b * c), 1.5)),
    domain: { min: a, max: b },
    // `mctad.triangular(1, 4, 2).generate(100)` will generate an Array of 100
    // random variables, distributed triangularly between 1 and 4, with peak 2.
    generate: function (n) {
      var randomVariables = [];
      for (var k = 0; k < n; k++ ) {
        var U = mctad.getRandomArbitrary(0, 1);
        if (U <= mctad.triangular.cdf(c)) {
          randomVariables.push(a + Math.sqrt(U * (b - a) * (c - a)));
        } else {
          randomVariables.push(b - Math.sqrt((1.0 - U) * (b - a) * (b - c)));
        }
      }
      return randomVariables;
    }
  };

  pmf = function () {
    if (a <= x && x <= c) {
      return (2 * (x - a))/((b - a ) * (c - a));
    } else {
      if (c < x && x <= b) {
        return (2 * (b - x))/((b - a ) * (b - c));
      } else {
        return 0;
      }
    }
  };
  cdf = function () {
    if (x < a) {
      return 0;
    } else {
      if (a <= x && x <= c) {
        return (Math.pow((x - a), 2))/((b - a ) * (c - a));
      } else {
        if (c < x && x <= b) {
          return 1 - ((Math.pow((b - x), 2))/((b - a ) * (b - c)));
        } else {
          return 1;
        }
      }
    }
  };
  dfs[x] = {
    pmf: pmf,
    cdf: cdf
  };

  return dfs;
};
