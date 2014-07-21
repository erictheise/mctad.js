/*
# Student's t-Distribution

The [Student's t-Distribution](http://en.wikipedia.org/wiki/Student%27s_t-distribution) 

### Assumptions

`v`, the degrees of freedom, is a strictly positive real number.

### Use

`mctad.studentsT(v)`

### Inline Comments
*/

mctad.studentsT = function (v) {
  // Check that `v > 0`.
  if (v <= 0) { return undefined; }

  var dfs = {
    mean: function () {
      if (v > 1) {
        return 0;
      } else {
        return undefined;
      }
    }(),
    median: 0,
    mode: 0,
    variance: function () {
      if (v > 2) {
        return v / (v - 2);
      } else {
        if (v > 1) {
          return Infinity;
        } else {
          return undefined;
        }
      }
    }(),
    skewness: function () {
      if ( v > 3) {
        return 0;
      } else {
        return undefined;
      }
    }(),
    entropy: 'to be implemented', // @todo: circle back and implement this after implementing digamma and beta functions.
    domain: { min: -Infinity, max: Infinity },
    range: { min: 0, max: Infinity },

    pdf: function (x) {
      return (mctad.Γ((v + 1) / 2) / (Math.sqrt(v * mctad.π) * mctad.Γ(v / 2)) * Math.pow((1 + Math.pow(x, 2) / v), -((v + 1) / 2)));
    },

    cdf: function (x) {
      var cdf = [];
      for (var key in mctad.t_distribution_table[v]) {
        cdf.push([parseFloat(key), parseFloat(mctad.t_distribution_table[v][key])]);
        cdf.push([parseFloat(1.0 - key), parseFloat(-mctad.t_distribution_table[v][key])]);
      }
      cdf.sort(function (a, b) {
        return a[1] - b[1];
      });

      var i = 0;
      while (cdf[i][1] < x) {
        i++;
      }
      return cdf[i][0];
    }

  };

  // Mix in the convenience methods for f(X) and F(X).
  mctad.extend(dfs, mctad.continuousMixins);

  dfs.domain.min = -Math.ceil(3 * dfs.variance);
  dfs.domain.max = Math.ceil(3 * dfs.variance);
  dfs.range.max = 0.1 * Math.ceil(10 * dfs.pdf(0));

  return dfs;
};


