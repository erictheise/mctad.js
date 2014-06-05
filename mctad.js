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

mctad.allPositive = function (data) {
  var positive = true;
  for (var i = 0; i < data.length; i++) {
    if (data[i] < 0) {
      positive = false;
      break;
    }
  }
  return positive;
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

// # getRandomArbitrary(min, max)
// A function for generating a random number between min and mix, inclusive, taken from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
mctad.getRandomArbitrary = function (min, max) {
  return Math.random() * (max - min) + min;
};

// # getRandomInt(min, max)
// A function for generating a random integer between min and max, inclusive, taken from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
mctad.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
// # Combination
//
// http://en.wikipedia.org/wiki/Combination

mctad.combination = function(n, k) {
  if (n < 0 || k < 0 ) { return undefined; }

  if (k > n) { return 0; }

  return this.factorial(n)/(this.factorial(k) * this.factorial(n - k));
};
;
// # Arithmetic Mean
//
// `mctad.arithmeticMean()` accepts an Array of Numbers and returns their average as a Number.
// It is aliased by `mctad.mean()`.
//
// More at the [Wikipedia article](http://en.wikipedia.org/wiki/Mean#Arithmetic_mean_.28AM.29).

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
// # Geometric Mean
//
// `mctad.geometricMean()` accepts an Array of n positive Numbers and returns the nth root of their product as a Number.
//
// More at the [Wikipedia article](http://en.wikipedia.org/wiki/Geometric_mean).

mctad.geometricMean = function (data) {
  if (!Array.isArray(data) || data.length === 0) { return undefined; }

  // The geometric mean is only defined for positive numbers.
  if (this.allPositive(data)) {
    return Math.pow(this.product(data), 1/data.length);
  } else {
    return undefined;
  }

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
// # Median
//
// `mctad.median()` accepts an Array of Numbers and returns the numerical value separating the higher half from the lower half as a Number.
//
// More at the [Wikimedia article](http://en.wikipedia.org/wiki/Median)

mctad.median = function (data) {
  if (!Array.isArray(data) || data.length === 0) { return null; }

  // The data must be ordered from the lowest value to the highest value.
  this.sortNumeric(data);
  // If there are an even number of data observations, average the two data points on either side of the divide. If there are an odd number of observations, the middle observation is taken to be the median.
  if (data.length % 2 === 0) {
    return (data[data.length/2 - 1] + data[data.length/2])/2;
  } else {
    return data[(data.length + 1)/2 - 1];
  }

};
;
// # Mode
//
// `mctad.mode()` accepts an Array of Numbers and returns the numerical value(s) that appear most frequently as an Array of Numbers. If the data observations are unimodal, the mode will be returned as an Array of a single Number, not as a Number.
//
// More at the [Wikimedia article](http://en.wikipedia.org/wiki/Mode_(statistics))

mctad.mode = function (data) {
  if (!Array.isArray(data) || data.length === 0) { return null; }

  var modes = [], frequencies = {}, max = 0;
  // Iterate through the data, creating an object that counts frequencies and keeping track of the
  // maximum value.
  for (var i = 0; i < data.length; i++) {
    if (frequencies.hasOwnProperty(data[i])) {
      frequencies[data[i]]++;
    } else {
      frequencies[data[i]] = 1;
    }
    if (frequencies[data[i]] > max) { max = frequencies[data[i]]; }
  }

  // Pluck the values that have been maximally observed.
  for(var key in frequencies) {
    if (frequencies.hasOwnProperty(key)) {
      if (frequencies[key] === max) {
        modes.push(parseInt(key));
      }
    }
  }

  // Sort the modes before returning.
  this.sortNumeric(modes);
  return modes;
};
;
// # Product
//
// `mctad.product()` accepts an Array of Numbers and returns their product as a Number.
// It is used in the calculation of `mctad.geometricMean()`, the [Geometric Mean](geometric_mean.html).

mctad.product = function (data) {
  if (!Array.isArray(data) || data.length === 0 ) { return undefined; }

  // `product` is a simple accumulator.
  var product = 1.0;
  for (var i = 0; i < data.length; i++) {
    product *= data[i];
  }
  return product;

};
;
// # Sample Standard Deviation
//
// `mctad.sampleStandardDeviation()` accepts an Array of Numbers assumed to be a sample and returns their standard deviation as a Number.
// It is simply the square root of  `mctad.sampleVariance()`.
//
// More at the [Wikipedia article](http://en.wikipedia.org/wiki/Standard_deviation).

mctad.sampleStandardDeviation = function (data) {
  if (!Array.isArray(data) || data.length === 0 ) { return null; }

  return Math.sqrt(this.sampleVariance(data));

};
;
// # Sample Variance
//
// `mctad.sampleVariance()` accepts an Array of Numbers assumed to be a sample and returns their variance as a Number.
//
// Implemented using [Welford's algorithm](http://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Online_algorithm), cited by Knuth.
//
// More at the [Wikipedia article](http://en.wikipedia.org/wiki/Variance#Sample_variance).

mctad.sampleVariance = function (data) {
  if (!Array.isArray(data) || data.length === 0 ) { return null; }

  var mean = 0.0, σ2 = 0.0, Δ, n = 0, M2 = 0.0;
  for (var i = 0; i < data.length; i++) {
    n++;
    Δ = data[i] - mean;
    mean += Δ/n;
    M2 += Δ * (data[i] - mean);
  }
  // Use [Bessel's correction](http://en.wikipedia.org/wiki/Bessel%27s_correction) since this is sample variance.
  σ2 = M2/(n - 1);

  return σ2;

};
;
// # Sum
//
// `mctad.sum()` accepts an Array of Numbers and returns their sum as a Number.
// It is used in the calculation of `mctad.arithmeticMean()`, the [Arithmetic Mean](arithmetic_mean.html).

mctad.sum = function (data) {
  if (!Array.isArray(data) || data.length === 0 ) { return undefined; }

  // `sum` is a simple accumulator.
  var sum = 0.0;
  for (var i = 0; i < data.length; i++) {
    sum += data[i];
  }
  return sum;

};
;
mctad.discreteMixins = {
  P: function(x) {
    if (this.hasOwnProperty(x)) {
      return this[x].pmf;
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
//
// The [Bernoulli distribution](http://en.wikipedia.org/wiki/Bernoulli_distribution) is the probability discrete
// distribution of a random variable which takes value 1 with success probability `p` and value 0 with failure
// probability `q` = 1 - `p`. It can be used, for example, to represent the toss of a coin, where "1" is defined to
// mean "heads" and "0" is defined to mean "tails" (or vice versa). It is a special case of a Binomial Distribution
// where `n` = 1.
//
// More at the [Wikipedia article](http://en.wikipedia.org/wiki/Discrete_uniform_distribution).

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
    // `mctad.bernoulli(.7).generate()` will perform a Bernoulli trial, yielding one
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

  // Mix in the convenience methods for P(X) and F(X).
  mctad.extend(dfs, mctad.discreteMixins);

  return dfs;
};
;
// # Binomial Distribution
//
// The [Binomial Distribution](http://en.wikipedia.org/wiki/Binomial_distribution) is the discrete probability
// distribution of the number of successes in a sequence of n independent yes/no experiments, each of which yields
// success with probability `p`. Such a success/failure experiment is also called a Bernoulli experiment or
// Bernoulli trial; when n = 1, the Binomial Distribution is a Bernoulli Distribution.

mctad.binomial = function (n, p) {
  // Check that `p` is a valid probability (0 ≤ p ≤ 1), and that `n` is an integer, strictly positive.
  if (p < 0 || p > 1.0 || !mctad.isInteger(n) || n <= 0) { return undefined; }

  var x = 0, pmf, cdf = 0, dfs = {
    mean: n * p,
    variance: (n * p) * (1.0 - p),
    skewness: (1 - 2 * p)/Math.sqrt(n * p * (1.0 - p)),
    domain: { min: 0, max: Infinity }
  };
  do {
    pmf = (mctad.factorial(n) / (mctad.factorial(x) * mctad.factorial(n - x)) * (Math.pow(p, x) * Math.pow(1.0 - p, (n - x))));
    cdf += pmf;
    dfs[x] = { pmf: pmf, cdf: cdf };
    x++;
  }
  while (dfs[x - 1].cdf < 1.0 - mctad.ε);
  dfs.domain.max = x - 1;

  // Mix in the convenience methods for P(X) and F(X).
  mctad.extend(dfs, mctad.discreteMixins);

  return dfs;
};
;
// # Geometric Distribution
//
// This implementation uses the second definition of the [Geometric Distribution](http://en.wikipedia.org/wiki/Geometric_distribution)

mctad.geometric = function (p) {
  // Check that `p` is a valid probability (0 < p ≤ 1).
  if (p <= 0 || p > 1.0) { return undefined; }

  var x = 0, pmf, cdf = 0, dfs = {
    mean: (1 - p)/p,
    mode: 0.0,
    variance: (1.0 - p)/Math.pow(p, 2),
    skewness: (2 - p)/Math.sqrt(1 - p),
    domain: { min: 0, max: Infinity },
    // `mctad.geometric(0.25).generate(100)` will generate an Array of 100
    // random variables, distributed geometrically with a probability .25 of success.
    generate: function (n) {
      var randomVariables = [];
      for (var k = 0; k < n; k++ ) {
        randomVariables.push(Math.floor(Math.log(mctad.getRandomArbitrary(0, 1))/Math.log(1.0 - p)));
      }
      return randomVariables;
    }
  };
  do {
    pmf = p * Math.pow(1.0 - p, x);
    cdf += pmf;
    dfs[x] = { pmf: pmf, cdf: cdf };
    x++;
  }
  while (dfs[x - 1].cdf < 1.0 - mctad.ε);
  dfs.domain.max = x - 1;

  // Mix in the convenience methods for P(X) and F(X).
  mctad.extend(dfs, mctad.discreteMixins);

  return dfs;
};
;
// # Hypergeometric Distribution

mctad.hypergeometric = function (N, K, n) {
  // Check that `p` is a valid probability (0 < p < 1).
  if (!mctad.isInteger(N) || !mctad.isInteger(K) || !mctad.isInteger(n) || N < 0 || K > N || n > N) { return undefined; }

  var x = 0, pmf, cdf = 0, dfs = {
    mean: n * K / N,
    median: undefined,
    mode: Math.floor(((n + 1) * (K + 1 ))/(N + 2)),
    variance: n * (K / N) * (N - K)/N * (N - n)/(N - 1),
    skewness: ((N - 2 * K) * Math.pow((N - 1, 0.5) * (N - 2 * n_))/(Math.pow(n * K * (N - K) * (N - n)), 0.5) * (N - 2)),
    domain: { min: 0, max: Infinity }
  };
  do {
    pmf = (this.combination(K, k) * this.combination(N - K, n - k))/this.combination(N, K);
    cdf += pmf;
    dfs[x] = { pmf: pmf, cdf: cdf };
    x++;
  }
  while (dfs[x - 1].cdf < 1.0 - mctad.ε);
  dfs.domain.max = x - 1;

  // Mix in the convenience methods for P(X) and F(X).
  mctad.extend(dfs, mctad.discreteMixins);

  return dfs;
};
;
// # Pascal Distribution
// http://en.wikipedia.org/wiki/Negative_binomial_distribution

mctad.pascal = {
  distribution: function (r, p) {
    // Check that `p` is a valid probability (0 < p < 1), and that `r` is an integer, strictly positive.
    if (p <= 0 || p >= 1.0 || !mctad.isInteger(r) || r <= 0) { return undefined; }

    var k = 0, pmf, cdf = 0, dfs = {
      mean: (r * p)/(1.0 - p),
      mode: (function () {
        if (r > 1) {
          return Math.floor((p * (r - 1))/(1.0 - p));
        } else {
          return 0;
        }
      })(),
      variance: (r * p)/Math.pow((1.0 - p), 2),
      skewness: (1 + p)/Math.sqrt(r * p),
      domain: { min: 0, max: Infinity }
    };
    do {
      pmf = (mctad.combination((k + r - 1), k) * Math.pow((1.0 - p), r)) * Math.pow(p, k);
      cdf += pmf;
      dfs[k] = { pmf: pmf, cdf: cdf };
      k++;
    }
    while (dfs[k - 1].cdf < 1.0 - mctad.ε);
    dfs.domain.max = k - 1;

    // Mix in the convenience methods for P(X) and F(X).
    mctad.extend(dfs, mctad.discreteMixins);

    return dfs;
  }

};
;
// # Poisson Distribution
// The [Poisson Distribution](http://en.wikipedia.org/wiki/Poisson_distribution) is a discrete probability
// distribution that expresses the probability of a given number of events occurring in a fixed interval of time
// and/or space if these events occur with a known average rate and independently of the time since the last event.
//
// The Poisson Distribution is characterized by the strictly positive mean arrival or occurrence rate, `λ`.

mctad.poisson = function (λ) {
  // Check that λ is strictly positive
  if (λ <= 0) { return null; }

  // We initialize `x`, the random variable, and `cdf`, an cdfumulator for the cumulative distribution function
  // to 0. `dfs` is the object we'll return with the `pmf` and the
  // `cdf`, as well as the trivially calculated mean & variance. We iterate until the
  // `cdf` is within `epsilon` of 1.0.
  var x = 0, pmf, cdf = 0, dfs = {
    mean: λ,
    median: Math.floor(λ + 1/3 - 0.02/λ),
    mode: [Math.floor(λ), Math.ceil(λ) - 1],
    variance: λ,
    skewness: Math.pow(λ, 0.5),
    domain: { min: 0, max: Infinity }
  };
  do {
    pmf = (Math.pow(Math.E, -λ) * Math.pow(λ, x))/mctad.factorial(x);
    cdf += pmf;
    dfs[x] = { pmf: pmf, cdf: cdf };
    x++;
  }
  while (dfs[x - 1].cdf < 1.0 - mctad.ε);
  dfs.domain.max = x - 1;

  // Mix in the convenience methods for P(X) and F(X).
  mctad.extend(dfs, mctad.discreteMixins);

  return dfs;
};
;
// # Uniform Distribution (Discrete)
//
// `mctad.discreteUniform()` accepts two Integers, `i` and `j`, the lower and upper bounds of a range of equally likely integers, and returns an Object containing the `mean`, `median`, `mode`, `variance`, `skewness`, `entropy`,`domain`, `P` (the probability mass function, P(X)), `F` (the cumulative distribution function, F(X)), and `generate()`, a function for generating `n` random variables using the specified distribution.
//
// More at the [Wikipedia article](http://en.wikipedia.org/wiki/Discrete_uniform_distribution).

mctad.discreteUniform = function (i, j) {
  // Check that `i ≤ j`, and that `i` and `j` are integers.
  if (i > j || !mctad.isInteger(i) || !mctad.isInteger(j) ) { return undefined; }

  var x, pmf, cdf = 0, dfs = {
    mean: (i + j)/2,
    median: (i + j)/2,
    mode: undefined,
    variance: (Math.pow((j - i + 1), 2) - 1)/12,
    skewness: 0.0,
    entropy: Math.log(j - i + 1),
    domain: { min: i, max: j },
    // `mctad.discreteUniform(10, 20).generate(100)` will generate an Array of 100
    // random variables, distributed uniformly between 10 and 20, inclusive.
    generate: function (n) {
      var randomVariables = [];
      for (var k = 0; k < n; k++ ) {
        randomVariables.push(mctad.getRandomInt(i, j));
      }
      return randomVariables;
    }
  };
  // Iterate over the domain, calculating the probability mass and cumulative distribution functions.
  for (x = i; x <= j; x++) {
    pmf = 1/(j - i + 1);
    cdf += pmf;
    dfs[x] = { pmf: pmf, cdf: cdf };
  }
  // Mix in the convenience methods for P(X) and F(X).
  mctad.extend(dfs, mctad.discreteMixins);

  return dfs;
};
;
mctad.continuousMixins = {
  f: function(x) {
    return this.pdf(x);
  },
  F: function(x) {
    return this.cdf(x);
  }
};
;
mctad.erf = function (x) {
  return 1 - (1 / Math.pow( 1 + 0.0705230784 * x + 0.0422820123 * Math.pow(x, 2) +
    0.0092705272 * Math.pow(x, 3) + 0.0001520143 * Math.pow(x, 4) + 0.0002765672 * Math.pow(x, 5) +
    0.0000430638 * Math.pow(x, 6), 16));
};
;
mctad.exponential = function (λ) {
  // Check that `λ > 0`.
  if (λ < 0) { return undefined; }

  var dfs = {
    mean: 1 / λ,
    median: (1 / λ) * Math.log(2),
    mode: 0.0,
    variance: Math.pow((1 / λ), 2),
    skewness: 2.0,
    entropy: 1 - Math.log(λ),
    domain: { min: 0, max: Infinity },

    // `mctad.exponential(1.5).generate(100)` will generate an Array of 100
    // random variables, distributed exponentially.
    generate: function (n) {
      var randomVariables = [];
      for (var k = 0; k < n; k++ ) {
        randomVariables.push(-(1 / λ) * Math.log(mctad.getRandomArbitrary(0, 1)));
      }
      return randomVariables;
    },

    pdf: function (x) {
      return λ * Math.pow(Math.E, -λ * x);
    },

    cdf: function (x) {
      return 1 - Math.pow(Math.E, -λ * x);
    }

  };

  // Mix in the convenience methods for f(X) and F(X).
  mctad.extend(dfs, mctad.continuousMixins);

  return dfs;
};
;
mctad.lognormal = function (μ, σ2) {
  // Check that `μ > 0` and `σ2 > 0`.
  if (μ <= 0 || σ2 <= 0) { return undefined; }

  var dfs = {
    mean: Math.pow(Math.E, μ + σ2 / 2),
    median: Math.pow(Math.E, μ),
    mode: Math.pow(Math.E, μ - σ2),
    variance: (Math.pow(Math.E, σ2) - 1) * Math.pow(Math.E, 2 * μ + σ2),
    skewness: (Math.pow(Math.E, σ2) + 2) * Math.sqrt(Math.pow(Math.E, σ2) - 1),
    entropy: 0.5 * Math.log(2 * mctad.π * σ2) + μ,
    domain: { min: 0.0, max: Infinity },

    // `mctad.lognormal(2.0, 0.5).generate(100)` will generate an Array of 100
    // random variables, distributed lognormally with mean 2 and variance 0.5.
    generate: function (n) {
      var randomVariables = [];
      randomVariables = mctad.normal(μ, σ2).generate(n);
      for (var i = 0; i < n; i++ ) {
        randomVariables[i] = Math.pow(Math.E, randomVariables[i]);
      }
      return randomVariables;
    },

    pdf: function (x) {
      return (1 / (x * Math.sqrt(2 * mctad.π * σ2))) * Math.pow(Math.E, -(Math.pow(Math.log(x) - μ, 2) / (2 * σ2)));
    },

    cdf: function (x) {
      var Z = (Math.log(x) - μ) / Math.sqrt(2 * σ2);

      if (Z >= 0) {
        return 0.5 * (1.0 + mctad.erf(Z));
      } else {
        return 0.5 * (1.0 - mctad.erf(Z));
      }
    }

  };

  // Mix in the convenience methods for f(X) and F(X).
  mctad.extend(dfs, mctad.continuousMixins);

  return dfs;
};
;
mctad.normal = function (μ, σ2) {
  // Check that `σ2 > 0`.
  if (σ2 <= 0) { return undefined; }

  var dfs = {
    mean: μ,
    median: μ,
    mode: μ,
    variance: σ2,
    skewness: 0,
    entropy: 0.5 * Math.log(2 * mctad.π * Math.E * σ2),
    domain: { min: -Infinity, max: Infinity },

    // `mctad.normal(-2.0, 0.5).generate(100)` will generate an Array of 100
    // random variables, distributed normally with mean -2 and variance 0.5. The implementation
    // uses the [Marsaglia Polar Method](http://en.wikipedia.org/wiki/Marsaglia_polar_method).
    generate: function (n) {
      var U = [], V = [], W, Y, randomVariables = [];
      for (var k = 0; k < n / 2; k++ ) {
        do {
          U = [mctad.getRandomArbitrary(0, 1), mctad.getRandomArbitrary(0, 1)];
          V = [2 * U[0] - 1, 2 * U[1] - 1];
          W = Math.pow(V[0], 2) + Math.pow(V[1], 2);
        } while (W > 1);
      Y = Math.sqrt((-2 * Math.log(W) / W));
      randomVariables.push(μ + Math.sqrt(σ2) * (V[0] * Y), μ + Math.sqrt(σ2) * (V[1] * Y));
      }
      if (randomVariables.length === n + 1) { randomVariables.pop(); }
      return randomVariables;
    },

    pdf: function (x) {
      return (1 / (Math.sqrt(σ2) * Math.sqrt(2 * mctad.π))) * Math.pow(Math.E, -(Math.pow(x - μ, 2) / (2 * σ2)));
    },

    cdf: function (x) {
      var Z = (x - μ) / Math.sqrt(2 * σ2);

      if (Z >= 0) {
        return 0.5 * (1.0 + mctad.erf(Z));
      } else {
        return 0.5 * (1.0 - mctad.erf(-Z));
      }
    }

  };

  // Mix in the convenience methods for f(X) and F(X).
  mctad.extend(dfs, mctad.continuousMixins);

  return dfs;
};
;
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

  return dfs;
};
;
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
