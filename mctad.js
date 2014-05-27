mctad = { version: '0.1.0' };
;
// `π`
mctad.π = Math.PI;

// `ε`, epsilon, is a stopping criterion when we want to iterate until we're "close enough".
mctad.ε = 0.0001;
;
// A, hopefully small, collection of helper methods.

mctad.isInteger = function(n) {
  return (/^-?\d+$/.test(n));
};
;
// A factorial, usually written n!, is the product of all positive integers less than or equal to n.
mctad.factorial = function(n) {
  if (n < 0) { return null; }

  var acc = 1;
  for (var i = 2; i <= n; i++) {
    acc = acc * i;
  }
  return acc;
};
;
mctad.mixins = {
  P: function(x) {
    if (this.hasOwnProperty(x)) {
      return this[x].pdf;
    } else {
      return 0.0;
    }
  },
  F: function(x) {
    if (this.hasOwnProperty(x)) {
      return this[x].cdf;
    } else {
      if (x < this.domain.min) {
        return 0.0;
      } else {
        if (x > this.domain.max) {
          return 1.0;
        }
      }
    }
  }
};
;
// # Bernoulli Distribution
// The [Bernoulli distribution](http://en.wikipedia.org/wiki/Bernoulli_distribution) is the probability discrete
// distribution of a random variable which takes value 1 with success probability `p` and value 0 with failure
// probability `q` = 1 - `p`. It can be used, for example, to represent the toss of a coin, where "1" is defined to
// mean "heads" and "0" is defined to mean "tails" (or vice versa). It is a special case of a Binomial Distribution
// where `n` = 1.

mctad.bernoulli = {
  distribution: function(p) {
    // Check that `p` is a valid probability (0 ≤ p ≤ 1)
    if (p < 0 || p > 1.0) { return null; }

    return mctad.binomial.distribution(1, p);
  }
};
;
// # Binomial Distribution
// The [Binomial Distribution](http://en.wikipedia.org/wiki/Binomial_distribution) is the discrete probability
// distribution of the number of successes in a sequence of n independent yes/no experiments, each of which yields
// success with probability `p`. Such a success/failure experiment is also called a Bernoulli experiment or
// Bernoulli trial; when n = 1, the Binomial Distribution is a Bernoulli Distribution.

mctad.binomial = {
  distribution: function (n, p) {
    // Check that `p` is a valid probability (0 ≤ p ≤ 1), and that `n` is an integer, strictly positive.
    if (p < 0 || p > 1.0 || !mctad.isInteger(n) || n <= 0) { return null; }

    var x = 0, pdf, cdf = 0, dfs = {
      mean: n * p,
      variance: (n * p) * (1.0 - p),
      domain: { min: 0, max: Infinity }
    };
    do {
      pdf = (mctad.factorial(n) / (mctad.factorial(x) * mctad.factorial(n - x)) * (Math.pow(p, x) * Math.pow(1.0 - p, (n - x))));
      cdf += pdf;
      dfs[x] = { pdf: pdf, cdf: cdf };
      x++;
    }
    while (dfs[x - 1].cdf < 1.0 - mctad.ε);

    dfs.domain.max = x - 1;
    _.extend( dfs, mctad.mixins );

    return dfs;
  }

};
;
// # Geometric Distribution

mctad.geometric = {
  distribution: function (p) {
    // Check that `p` is a valid probability (0 < p < 1).
    if (p <= 0 || p >= 1.0) { return null; }

    var x = 0, pdf, cdf = 0, dfs = {
      mean: (1 - p)/p,
      variance: (1.0 - p)/Math.pow(p, 2),
      domain: { min: 0, max: Infinity }
    };
    do {
      pdf = p * Math.pow(1.0 - p, x);
      cdf += pdf;
      dfs[x] = { pdf: pdf, cdf: cdf };
      x++;
    }
    while (dfs[x - 1].cdf < 1.0 - mctad.ε);

    dfs.domain.max = x - 1;
    _.extend( dfs, mctad.mixins );

    return dfs;
  }

};
;
// # Hypergeometric Distribution

mctad.hypergeometric = {
  distribution: function (p) {
    // Check that `p` is a valid probability (0 < p < 1).
    if (p <= 0 || p >= 1.0) { return null; }

    var x = 0, pdf, cdf = 0, dfs = {
      mean: (1 - p)/p,
      variance: (1.0 - p)/Math.pow(p, 2),
      domain: { min: 0, max: Infinity }
    };
    do {
      pdf = p * Math.pow(1.0 - p, x);
      cdf += pdf;
      dfs[x] = { pdf: pdf, cdf: cdf };
      x++;
    }
    while (dfs[x - 1].cdf < 1.0 - mctad.ε);

    dfs.domain.max = x - 1;
    _.extend( dfs, mctad.mixins );

    return dfs;
  }
};
;
;
// # Poisson Distribution
// The [Poisson Distribution](http://en.wikipedia.org/wiki/Poisson_distribution) is a discrete probability
// distribution that expresses the probability of a given number of events occurring in a fixed interval of time
// and/or space if these events occur with a known average rate and independently of the time since the last event.
//
// The Poisson Distribution is characterized by the strictly positive mean arrival or occurrence rate, `λ`.

mctad.poisson = {
  distribution: function (λ) {
    // Check that λ is strictly positive
    if (λ <= 0) { return null; }

    // We initialize `x`, the random variable, and `cdf`, an cdfumulator for the cumulative distribution function
    // to 0. `dfs` is the object we'll return with the `pdf` and the
    // `cdf`, as well as the trivially calculated mean & variance. We iterate until the
    // `cdf` is within `epsilon` of 1.0.
    var x = 0, pdf, cdf = 0, dfs = {
      mean: λ,
      variance: λ,
      domain: { min: 0, max: Infinity }
    };
    do {
      pdf = (Math.pow(Math.E, -λ) * Math.pow(λ, x))/mctad.factorial(x);
      cdf += pdf;
      dfs[x] = { pdf: pdf, cdf: cdf };
      x++;
    }
    while (dfs[x - 1].cdf < 1.0 - mctad.ε);

    dfs.domain.max = x - 1;
    _.extend( dfs, mctad.mixins );

    return dfs;
  }
};
;
// # Discrete Uniform Distribution

mctad.discrete_uniform = {
  distribution: function (i, j) {
    // Check that `i ≤ j`, and that `i` and `j` are integers.
    if (i > j || !mctad.isInteger(i) || !mctad.isInteger(j) ) { return null; }

    var x, pdf, cdf = 0, dfs = {
      mean: (i + j)/2,
      variance: (Math.pow((j - i + 1), 2) - 1)/12,
      domain: { min: i, max: j }
    };
    for (x = i; x <= j; x++) {
      pdf = 1/(j - i + 1);
      cdf += pdf;
      dfs[x] = { pdf: pdf, cdf: cdf };
    }
    _.extend( dfs, mctad.mixins );

    return dfs;
  }

};
;
// # Triangular Distribution

mctad.triangular = {
  distribution: function (a, b, c) {
    // Check that `a < c < b`.
    if (a >= b || a >= c || c >= b) { return null; }

    var probability_of_x, x, distribution_functions = {
      mean: (a + b + c)/3,
      variance: (Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2) - (a * b) - (a * c) - (b * c))/18,
      mode: c
    };

    probability_of_x = function () {
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
    cumulative_probability_of_x = function () {
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
    distribution_functions[x] = {
      probability_of_x: probability_of_x,
      cumulative_probability_of_x: cumulative_probability_of_x
    };

    return distribution_functions;
  }

};
;
// # Uniform Distribution

mctad.uniform = {
  distribution: function (a, b) {
    // Check that `a < b`.
    if (a >= b) { return null; }

    var probability_of_x, x, acc = 0, distribution_functions = { mean: (a + b)/2, variance: Math.pow((b - a), 2)/12 };
    for (x = i; x <= j; x++) {
      probability_of_x = 1/(b - a);
      acc += probability_of_x;
      distribution_functions[x] = { probability_of_x: probability_of_x, cumulative_probability_of_x: acc };
    }

    return distribution_functions;
  }

};
