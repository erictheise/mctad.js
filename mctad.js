mctad = { version: '0.1.0' };
;
// `π`
mctad.π = Math.PI;

// `ε`, epsilon, is a stopping criterion when we want to iterate until we're "close enough".
mctad.ε = 0.0001;
;
// A, hopefully small, collection of helper methods.

mctad.isInteger = function (n) {
  return (/^-?\d+$/.test(n));
};

mctad.extend = function (destination, source) {
  for (var k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }
  return destination;
};

mctad.sortNumeric = function (data) {
  data.sort(function (a, b) { return a - b; });
  return data;
};

mctad.toRadians = function (v) {
  if (typeof v === 'string' || v instanceof String) {
    // If it's a string, explicitly in degrees, e.g, "47.3°", convert it to radians
    if (v.trim().slice(-1) === '°') {
      return (Math.PI/180) * parseFloat(v);
    } else {
      // If it's a string, assume it's already in radians
      return parseFloat(v);
    }
  } else {
    // If it's a number, assume it's already in radians
    return v;
  }
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
// # Arithmetic Mean
//
// `mctad.arithmeticMean()` accepts an Array of Numbers and returns their average as a Number.
// It is aliased by `mctad.mean()`.
//
// See [Arithmetic Mean](http://en.wikipedia.org/wiki/Mean#Arithmetic_mean_.28AM.29).

mctad.arithmeticMean = function (data) {
  if (!Array.isArray(data) || data.length === 0) { return undefined; }

  return this.sum(data)/data.length;

};
;
// # Circular Standard Deviation

mctad.circularStandardDeviation = function (data) {
  // Mardia & Jupp equation (2.3.11)
  // Depends on meanResultantLength
  return Math.sqrt( -2.0 * Math.log(1 - this.meanResultantLength(data)) );
};
;
// # Circular Variance

mctad.circularVariance = function (data) {
  // Mardia & Jupp equation (2.3.3)
  // Depends on meanResultantLength
  return 1 - this.meanResultantLength(data);
};
;
// Directional statistics
//
// This section is based on "Directional Statistics" by Kanti V. Mardia &
// Peter E. Jupp, Wiley (2000)
//






;
// # Mean Direction

mctad.meanDirection = function (data) {
  // The mean_direction of no angles is null
  if (data.length === 0 ) return null;

  // Mardia & Jupp equation (2.2.4)
  var c_bar, s_bar, theta_bar, acc = { c: 0, s : 0 };
  for (i = 0; i < data.length; i++) {
    acc.c += Math.cos(this.toRadians(data[i]));
    acc.s += Math.sin(this.toRadians(data[i]));
  }
  c_bar = (acc.c / data.length);
  s_bar = (acc.s / data.length);
  if (c_bar >= 0 ) {
    theta_bar = Math.atan(s_bar/c_bar);
  } else {
    theta_bar = Math.atan(s_bar/c_bar) + this.π;
  }
  return theta_bar;
};
;
// # Mean Resultant Length

mctad.mean_resultant_length = function (data) {
  // The mean_resultant_length of no angles is null
  if (data.length === 0 ) return null;

  // Mardia & Jupp equation (2.2.4)
  var c_bar, s_bar, r_bar, acc = { c: 0, s : 0 };
  for (i = 0; i < data.length; i++) {
    acc.c += Math.cos(this.toRadians(data[i]));
    acc.s += Math.sin(this.toRadians(data[i]));
  }
  c_bar = (acc.c / data.length);
  s_bar = (acc.s / data.length);
  r_bar = Math.sqrt(Math.pow(c_bar, 2) + Math.pow(s_bar, 2));
  return r_bar;
};
;
// # Median Direction

mctad.medianDirection = function (data) {
  // Mardia & Jupp describe the conditions, but not the calculations!
  //
  // The median_direction is any angle θ such that
  // (i)  half of the data points lie in the in the arc [θ, θ + π) and
  // (ii) the majority are nearer to θ than to θ + π
  //
  // They don't use it after introducing it, so: low priority
};
;
// # Mean
//
// `mctad.mean()` accepts an Array of Numbers and returns their average as a Number.
// It is an alias for `mctad.arithmeticMean()`.
//
// See [Arithmetic Mean](http://en.wikipedia.org/wiki/Mean#Arithmetic_mean_.28AM.29).

mctad.mean = function (data) { return this.arithmeticMean(data); };
;
// # Sample Median

mctad.median = function (data) {
  if (!Array.isArray(data) || data.length === 0) { return null; }

  this.sortNumeric(data);
  if (data.length % 2 === 0) {
    return (data[data.length/2 - 1] + data[data.length/2])/2;
  } else {
    return data[(data.length + 1)/2 - 1];
  }

};
;
// # Sample Mode

mctad.mode = function (data) {
  if (!Array.isArray(data) || data.length === 0) { return null; }

  var modes = [], frequencies = {}, max = 0;
  for (var i = 0; i < data.length; i++) {
    if (frequencies.hasOwnProperty(data[i])) {
      frequencies[data[i]]++;
    } else {
      frequencies[data[i]] = 1;
    }
    if (frequencies[data[i]] > max) { max = frequencies[data[i]]; }
  }

  for(var key in frequencies) {
    if (frequencies.hasOwnProperty(key)) {
      if (frequencies[key] === max) {
        modes.push(parseInt(key));
      }
    }
  }

  this.sortNumeric(modes);
  return modes;
};
;
// # Sample Standard Deviation
//

mctad.sampleStandardDeviation = function (data) {
  if (!Array.isArray(data) || data.length === 0 ) { return null; }

  return Math.sqrt(this.sampleVariance(data));

};
;
// # Sample Variance
// Implemented using [Welford's algorithm](http://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Online_algorithm), cited by Knuth.

mctad.sampleVariance = function (data) {
  if (!Array.isArray(data) || data.length === 0 ) { return null; }

  var mean = 0.0, σ2 = 0.0, Δ, n = 0, M2 = 0.0;
  for (var i = 0; i < data.length; i++) {
    n++;
    Δ = data[i] - mean;
    mean += Δ/n;
    M2 += Δ * (data[i] - mean);
  }
  σ2 = M2/(n - 1);

  return σ2;

};
;
// # Sum
//
// `mctad.sum()` accepts an Array of Numbers and returns their sum as a Number.
// It is used in the calculation of `mctad.mean()`, the [Sample Mean](mean.html).

mctad.sum = function (data) {
  if (!Array.isArray(data) || data.length === 0 ) { return undefined; }

  // `sum` is an accumulator.
  var sum = 0.0;
  for (var i = 0; i < data.length; i++) {
    sum += data[i];
  }
  return sum;

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
    mctad.extend(dfs, mctad.mixins);

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
    mctad.extend(dfs, mctad.mixins);

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
    mctad.extend(dfs, mctad.mixins);

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
    mctad.extend(dfs, mctad.mixins);

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
    mctad.extend(dfs, mctad.mixins);

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
