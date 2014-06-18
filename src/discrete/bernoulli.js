/*
# Bernoulli Distribution

The [Bernoulli distribution](http://en.wikipedia.org/wiki/Bernoulli_distribution) is the probability discrete
distribution of a random variable which takes value 1 with success probability `p` and value 0 with failure
probability `q` = 1 - `p`. It can be used, for example, to represent the toss of a coin, where "1" is defined to
mean "heads" and "0" is defined to mean "tails" (or vice versa). It is a special case of a Binomial Distribution
where `n` = 1.

### Assumptions

`p` is a valid probability (0 ≤ p ≤ 1).

### Use

`mctad.bernoulli(p)`

### Inline Comments
*/

mctad.bernoulli = function(p) {
  // Check that `p` is a valid probability (0 ≤ p ≤ 1)
  if (p < 0 || p > 1.0) { return undefined; }

  var x, dfs = {
    mean: p,
    median: (function () {
      if (p < 0.5) {
        return 0.0;
      } else {
        if (p === 0.5) {
          return 0.5;
        } else {
          return 1.0;
        }
      }
    })(),
    mode: (function () {
      if ((p < 0.5)) {
        return [0.0];
      } else {
        if (p === 0.5) {
          return [0, 1];
        } else {
          return [1.0];
        }
      }
    })(),
    variance: p * (1.0 - p),
    skewness: ((1.0 - p) * p)/Math.sqrt(p * (1.0 - p)),
    entropy: -(1.0 - p) * Math.log(1.0 - p) - p * Math.log(p),
    domain: { min: 0, max: 1 },
    range: { min: 0.0, max: 0.0 },

    // `mctad.bernoulli(.7).generate()` will perform a single Bernoulli trial, yielding one
    // random variable with a success probability of .7. For a sequence of Bernoulli trials, see
    // the [binomial distribution](binomial.html).
    generate: function () {
      if (mctad.getRandomArbitrary(0, 1) <= p) {
        return 1;
      } else {
        return 0;
      }
    }
  };

  // Assign the probability mass and cumulative distribution functions for the outcomes 0 or 1.
  dfs[0] = { pmf: 1.0 - p, cdf: 1.0 - p };
  dfs[1] = { pmf: p, cdf: 1.0 };
  if (p > 1.0 - p) {
    dfs.range.max = 0.1 * Math.ceil(10 * p);
  } else {
    dfs.range.max = 0.1 * Math.ceil(10 * (1.0 - p));
  }

  // Mix in the convenience methods for p(x) and F(x).
  mctad.extend(dfs, mctad.discreteMixins);

  return dfs;
};
