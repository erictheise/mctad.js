/*
# Chi-Squared Distribution

The [Chi-Squared Distribution](http://en.wikipedia.org/wiki/Chi-squared_distribution) or χ² Distribution is the
distribution of a sum of the squares of k independent standard normal random variables. It has one parameter, `k`, a
positive integer that specifies the number of degrees of freedom (i.e. the number of Zi’s)

### Use

`mctad.chiSquared(k)`

### Inline Comments
*/

mctad.chiSquared = function (k) {
  // Check that `x` is strictly positive, and that `k` is an integer, strictly positive.
  if (k <= 0 || !mctad.isInteger(k)) { return undefined; }

  var dfs = {
    mean: k,
    median: k * Math.pow(1 - (2 / (9 * k)), 3),
    mode: Math.max(k - 2, 0),
    variance: 2 * k,
    skewness: Math.sqrt(8 / k),
    entropy: undefined,
    domain: { min: 0, max: Infinity },
    range: { min: 0, max: Infinity },

    generate: function (n) {
      return undefined;
    },

    pdf: function (x) {
      if (x > 0) {
        return (1 / (Math.pow(2, k / 2) * mctad.Γ(k / 2))) * Math.pow(x, (k / 2) - 1) * Math.pow(Math.E, -x / 2);
      } else {
        return 0.0;
      }
    },

    cdf: function (x) {
      var cdf = [];
      for (var key in mctad.chi_squared_distribution_table[k]) {
        cdf.push([1.0 - parseFloat(key), parseFloat(mctad.chi_squared_distribution_table[k][key])]);
      }
      cdf.sort(function (a, b) {
        return a[1] - b[1];
      });

      var i = 0;
      while (cdf[i][1] < x && i < cdf.length ) {
        i++;
      }
      return cdf[i][0];
    }

  };

  // Mix in the convenience methods for f(X) and F(X).
  mctad.extend(dfs, mctad.continuousMixins);

  dfs.domain.max = Math.ceil(2 * dfs.variance);
  dfs.range.max = function () {
    if (k > 2 ) {
      return 0.1 * Math.ceil(10 * dfs.pdf(dfs.mode));
    } else {
      if (k === 2) {
        return 0.5;
      } else {
        return 5.5;
      }
    }

  }();

  return dfs;
};
