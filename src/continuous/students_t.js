/*
# Student's t-Distribution

The [Student's t-Distribution](http://en.wikipedia.org/wiki/Student%27s_t-distribution) 

### Assumptions

`v`, the degrees of freedom, is a strictly positive real number.

### Use

`mctad.t(v)`

### Inline Comments
*/

mctad.t = function (v) {
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
    entropy: undefined, // @todo: circle back and implement this after implementing digamma and beta functions.
    domain: { min: -Infinity, max: Infinity },
    range: { min: 0, max: Infinity },

    pdf: function (x) {
      return (mctad.Γ((v + 1) / 2) / (Math.sqrt(v * mctad.π) * mctad.Γ(v / 2)) * Math.pow((1 + Math.pow(x, 2) / v), -((v + 1) / 2)));
    }

//    cdf: function (x) {
//      var Z = (x - μ) / Math.sqrt(2 * σ2);
//
//      if (Z >= 0) {
//        return 0.5 * (1.0 + mctad.erf(Z));
//      } else {
//        return 0.5 * (1.0 - mctad.erf(-Z));
//      }
//    }

  };

  // Mix in the convenience methods for f(X) and F(X).
  mctad.extend(dfs, mctad.continuousMixins);

  dfs.domain.min = -Math.ceil(3 * dfs.variance);
  dfs.domain.max = Math.ceil(3 * dfs.variance);
  dfs.range.max = 0.1 * Math.ceil(10 * dfs.pdf(0));

  return dfs;
};
