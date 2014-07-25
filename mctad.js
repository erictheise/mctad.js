mctad = { version: '0.0.1' };
;
// `π`
mctad.π = Math.PI;

// `ε`, epsilon, is a stopping criterion when we want to iterate until we're "close enough".
mctad.ε = 0.0001;
;
// ## isInteger(n)
// A function for determining if anything is an Integer. Used widely to validate parameters.
//
mctad.isInteger = function (n) {
  return (/^-?\d+$/.test(n));
};

// ## allPositive(Array)
// A function for determining if every element of an Array is greater than or equal to zero. Used in the determination
// of the [Geometric Mean](../statistics/geometric_mean.html).
//
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

// ## sign(n)
// A function used to determine the sign of a number.
// Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
// The Harmony ECMAScript 6 proposal includes Math.sign(), which would replace this helper.
mctad.sign = function (x) {
  if(isNaN(x)) {
    return NaN;
  } else if(x === 0) {
    return x;
  } else {
    return (x > 0 ? 1 : -1);
  }
};

// ## extend(destination, source)
// A function used to add convenience methods to distributions, e.g., `.p(x)`, `.f(x)`, `.F(x)`.
//
mctad.extend = function (destination, source) {
  for (var k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }
  return destination;
};

// ## sortNumeric(Array)
// A function for sorting a simple Array in numerical, rather than lexicographical, order.
//
mctad.sortNumeric = function (data) {
  if (typeof data === 'undefined') { return undefined; }
  data.sort(function (a, b) { return a - b; });
  return data;
};

// ## toRadians(Number)
// A function for converting degrees to radians.
//
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

// ## getBaseLog(x, y)
// A function for returning the logarithm of y with base x (ie. log<sub>x</sub> y), taken from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log
//
// @todo: replace with Math.log10() if that becomes widely implemented as part of Harmony (ECMAScript 6)
mctad.getBaseLog = function (x, y) {
  return Math.log(y) / Math.log(x);
};

// ## getRandomArbitrary(min, max)
// A function for generating a random number between min and mix, inclusive, taken from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
mctad.getRandomArbitrary = function (min, max) {
  return Math.random() * (max - min) + min;
};

// ## getRandomInt(min, max)
// A function for generating a random integer between min and max, inclusive, taken from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
mctad.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
;
mctad.factorial = function(n) {
  // Check that `n` is a non-negative Integer.
  if (!mctad.isInteger(n) || n < 0) { return undefined; }

  var acc = 1;
  // This is a simple, iterative implementation rather than a recursive implementation.
  for (var i = 2; i <= n; i++) {
    acc = acc * i;
  }
  return acc;
};
;
mctad.doubleFactorial = function(n) {
  // Check that `n` is an odd Integer.
  if (!mctad.isInteger(n) || n % 2 === 0) { return undefined; }

  var acc;

  if (n > 0) {
    // For the case where `n` is a positive Integer, continue to recurse through lesser positive Integers until 1
    // is reached.
    if (n > 1) {
      acc = n * mctad.doubleFactorial(n - 2);
    } else {
      acc = 1;
    }
    return acc;
  } else {
    if (n < 0) {
      // For the case where `n` is a negative Integer, use the inversion of its recurrence relation as
      // described at [the Wikipedia page](http://en.wikipedia.org/wiki/Double_factorial#Negative_arguments).
      if (n < -1) {
        acc = mctad.doubleFactorial(n + 2) / (n + 2);
      } else {
        acc = 1;
      }
    }
    return acc;
  }

};
;
mctad.Γ = function(n) {
  if (!mctad.isInteger(n * 2)) { return undefined; }

  if (n <= 0 && mctad.isInteger(n)) { return Infinity; }

  var Γ;

  // If n is a positive Integer, return its factorial, n!.
  if (mctad.isInteger(n)) {
    Γ = mctad.factorial(n - 1);
  } else {
    // If (n / 2) is a positive Integer, return the exact value using double factorials, n!!.
    if (mctad.isInteger(2 * n)) {
      Γ = (Math.sqrt(mctad.π) * mctad.doubleFactorial(n * 2 - 2) / Math.pow(2, (n * 2 - 1) / 2));
    }
  }
  return Γ;

};

mctad.gamma = mctad.Γ;
;
mctad.combination = function(n, k) {
  // Check that `n` and `k` are non-negative Integers.
  if (!mctad.isInteger(n) || n < 0 || !mctad.isInteger(k) || k < 0) { return undefined; }

  if (k > n) { return 0; }

  // Literal implementation of the (n k) = n!/(k!(n - k)!) formula.
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
  // The arithmetic mean is undefined if the data is not in an Array of 1 or more elements.
  if (!Array.isArray(data) || data.length === 0) { return undefined; }

  return this.sum(data)/data.length;

};
;
// # Circular Standard Deviation
//
// From Kanti V. Mardia & Peter E. Jupp, "Directional Statistics", Wiley, 2000

mctad.circularStandardDeviation = function (data) {
  // The circular standard deviation is undefined if the data is not in an Array of 1 or more elements.
  if (!Array.isArray(data) || data.length === 0) { return undefined; }

  // Mardia & Jupp equation 2.3.11
  // Depends on meanResultantLength
  return Math.sqrt( -2.0 * mctad.getBaseLog(10, 1 - mctad.meanResultantLength(data)) );
};
;
// # Circular Variance
//
// `mctad.circularVariance()` accepts an Array of angles (radians as numbers or strings, or degrees as strings only, in the
// form "47.3°") and returns their variance in radians as a Number. Relies on `mctad.meanResultantLength()`.
//
// From Kanti V. Mardia & Peter E. Jupp, "Directional Statistics", Wiley, 2000

mctad.circularVariance = function (data) {
  // The circular variance is undefined if the data is not in an Array of 1 or more elements.
  if (!Array.isArray(data) || data.length === 0) { return undefined; }

  // Mardia & Jupp equation (2.3.3)
  return 1 - mctad.meanResultantLength(data);
};
;
// # Mean Direction
//
// `mctad.meanDirection()` accepts an Array of angles (radians as numbers or strings, or degrees as strings only, in the
// form "47.3°") and returns their average in radians as a Number.
//
// From Kanti V. Mardia & Peter E. Jupp, "Directional Statistics", Wiley, 2000

mctad.meanDirection = function (data) {
  // The mean direction is undefined if the data is not in an Array of 1 or more elements.
  if (!Array.isArray(data) || data.length === 0) { return undefined; }

  // Mardia & Jupp equation 2.2.4
  var C_bar, S_bar, θ_bar, acc = { cos: 0, sin: 0 };
  for (var i = 0; i < data.length; i++) {
    acc.cos += Math.cos(mctad.toRadians(data[i]));
    acc.sin += Math.sin(mctad.toRadians(data[i]));
  }
  C_bar = (acc.cos / data.length);
  S_bar = (acc.sin / data.length);

  if (C_bar >= 0 ) {
    θ_bar = Math.atan(S_bar/C_bar);
  } else {
    θ_bar = Math.atan(S_bar/C_bar) + mctad.π;
  }
  return θ_bar;

};
;
// # Mean Resultant Length
//
// From Kanti V. Mardia & Peter E. Jupp, "Directional Statistics", Wiley, 2000

mctad.meanResultantLength = function (data) {
  // The mean resultant length is undefined if the data is not in an Array of 1 or more elements.
  if (!Array.isArray(data) || data.length === 0) { return undefined; }

  // Mardia & Jupp equation 2.2.3
  var C_bar, S_bar, R_bar, acc = { cos: 0, sin: 0 };
  for (var i = 0; i < data.length; i++) {
    acc.cos += Math.cos(mctad.toRadians(data[i]));
    acc.sin += Math.sin(mctad.toRadians(data[i]));
  }
  C_bar = (acc.cos / data.length);
  S_bar = (acc.sin / data.length);

  R_bar = Math.sqrt(Math.pow(C_bar, 2) + Math.pow(S_bar, 2));
  return R_bar;
};
;
// # Median Direction
//
// From Kanti V. Mardia & Peter E. Jupp, "Directional Statistics", Wiley, 2000

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
  if (!Array.isArray(data) || data.length === 0 ) { return undefined; }

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
mctad.simpleLinearRegression = function (data) {
  if (!Array.isArray(data) || data.length === 0 ) { return undefined; }

  var x = [], y = [], num_acc = 0, x_diff_acc = 0, y_diff_acc = 0, rxy, α, β;
  for (var i = 0; i < data.length; i++) {
    x.push(data[i][0]);
    y.push(data[i][1]);
  }
  x_bar = mctad.arithmeticMean(x);
  y_bar = mctad.arithmeticMean(y);

  for (i = 0; i < data.length; i++) {
    num_acc += (x[i] - x_bar) * (y[i] - y_bar);
    x_diff_acc += Math.pow(x[i] - x_bar, 2);
    y_diff_acc += Math.pow(y[i] - y_bar, 2);
  }
  rxy = num_acc / Math.sqrt(x_diff_acc * y_diff_acc);

  β = rxy * (mctad.sampleStandardDeviation(y) / mctad.sampleStandardDeviation(x));
  α = y_bar - β * x_bar;

  return {
    x_bar: x_bar,
    y_bar: y_bar,
    rxy: rxy,
    R2: Math.pow(rxy, 2),
    α: α,
    β: β
  };

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
  p: function(x) {
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
    skewness: ((1.0 - p) - p)/Math.sqrt(p * (1.0 - p)),
    entropy: -(1.0 - p) * Math.log(1.0 - p) - p * Math.log(p),
    domain: { min: 0, max: 1 },
    range: { min: 0.0, max: 0.0 },

    // `mctad.bernoulli(.7).generate(100)` will perform 100 Bernoulli trials, yielding 100
    // random variables each having had a success probability of .7.
    generate: function (n) {
      var randomVariables = [];
      for (var i = 0; i < n; i++ ) {
        if (mctad.getRandomArbitrary(0, 1) <= p) {
          randomVariables.push(1);
        } else {
          randomVariables.push(0);
        }
      }
      return randomVariables;
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
;
mctad.binomial = function (n, p) {
  // Check that `p` is a valid probability (0 ≤ p ≤ 1), and that `n` is an integer, strictly positive.
  if (p < 0 || p > 1.0 || !mctad.isInteger(n) || n <= 0) { return undefined; }

  var x = 0, pmf, cdf = 0, dfs = {
    mean: n * p,
    median: undefined,
    mode: function () {
      if ((n + 1) * p === 0.0 || !mctad.isInteger((n + 1) * p)) {
        return [Math.floor((n + 1) * p)];
      } else {
        if (mctad.isInteger((n + 1) * p) && (n + 1) * p >= 1 && (n + 1) * p <= n) {
          return [(n + 1) * p - 1, (n + 1) * p];
        } else {
          return n;
        }
      }
    }(),
    variance: (n * p) * (1.0 - p),
    skewness: (1 - 2 * p)/Math.sqrt(n * p * (1.0 - p)),
    entropy: undefined, // @todo: implement from wikipedia once O(1/n) becomes clear
    domain: { min: 0, max: Infinity },
    range: { min: 0.0, max: 0.0 },

    // `mctad.binomial(9, .7).generate(100)` will perform 100 sequences of nine [Bernoulli trials](bernoulli.html)
    // where the random variables have a success probability of .7.
    generate: function (m) {
      var trial = [], randomVariables = [];
      for (var i = 0; i < m; i++ ) {
        trial = mctad.bernoulli(p).generate(n);
        randomVariables.push(mctad.sum(trial));
      }
      return randomVariables;
    }
  };

  // Iterate over the domain, calculating the probability mass and cumulative distribution functions.
  do {
    pmf = (mctad.factorial(n) / (mctad.factorial(x) * mctad.factorial(n - x)) * (Math.pow(p, x) * Math.pow(1.0 - p, (n - x))));
    cdf += pmf;
    dfs[x] = { pmf: pmf, cdf: cdf };
    if (pmf > dfs.range.max) { dfs.range.max = 0.1 * Math.ceil(10 * pmf); }
    x++;
  }
  while (dfs[x - 1].cdf < 1.0 - mctad.ε);
  dfs.domain.max = x - 1;

  // Mix in the convenience methods for p(x) and F(x).
  mctad.extend(dfs, mctad.discreteMixins);

  return dfs;
};
;
mctad.geometric = function (p) {
  // Check that `p` is a valid probability (0 < p ≤ 1).
  if (p <= 0 || p > 1.0) { return undefined; }

  var x = 0, pmf, cdf = 0, dfs = {
    mean: (1 - p)/p,
    median: undefined, // @todo: understand nonuniqueness as laid out at wikipedia page
    mode: [0.0],
    variance: (1.0 - p)/Math.pow(p, 2),
    skewness: (2 - p)/Math.sqrt(1 - p),
    entropy: (-(1.0 - p) * (Math.log(1.0 - p) / Math.LN2) - p * (Math.log(p) / Math.LN2)) / p,
    domain: { min: 0, max: Infinity },
    range: { min: 0.0, max: 0.0 },

    // `mctad.geometric(0.25).generate(100)` will generate an Array of 100
    // random variables, distributed geometrically with a probability .25 of success.
    generate: function (n) {
      var randomVariables = [];
      for (var k = 0; k < n; k++ ) {
        randomVariables.push(Math.floor(Math.log(mctad.getRandomArbitrary(0, 1)) / Math.log(1.0 - p)));
      }
      return randomVariables;
    }
  };

  // Iterate over the domain, calculating the probability mass and cumulative distribution functions.
  do {
    pmf = p * Math.pow(1.0 - p, x);
    cdf += pmf;
    dfs[x] = { pmf: pmf, cdf: cdf };
    if (pmf > dfs.range.max) { dfs.range.max = 0.1 * Math.ceil(10 * pmf); }
    x++;
  }
  while (dfs[x - 1].cdf < 1.0 - mctad.ε);
  dfs.domain.max = x - 1;

  // Mix in the convenience methods for p(x) and F(x).
  mctad.extend(dfs, mctad.discreteMixins);

  return dfs;
};
;
mctad.hypergeometric = function (N, K, n) {
  // Check that `N`, `K`, and `n` are positive Integers, with K ≤ N, n ≤ N.
  if (!mctad.isInteger(N) || !mctad.isInteger(K) || !mctad.isInteger(n) || N < 0 || K < 0 || n < 0 || K > N || n > N) { return undefined; }

  var k = 0, pmf, cdf = 0, dfs = {
    mean: n * K / N,
    median: undefined,
    mode: [Math.floor(((n + 1) * (K + 1)) / (N + 2))],
    variance: n * (K / N) * ((N - K) / N) * ((N - n) / (N - 1)),
    skewness: ((N - 2 * K) * Math.sqrt(N - 1) * (N - 2 * n)) / (Math.sqrt(n * K * (N - K) * (N - n)) * (N - 2)),
    entropy: undefined,
    domain: { min: 0, max: K },
    range: { min: 0.0, max: 0.0 }

    // @todo: implement `mctad.hypergeometric(9, 3, 4).generate()`
//    generate: function (n) {
//      var randomVariables = [];
//      return randomVariables;
//    }
  };

  // Iterate over the domain, calculating the probability mass and cumulative distribution functions.
  for (k = 0; k <= n; k++) {
    pmf = (this.combination(K, k) * this.combination(N - K, n - k)) / this.combination(N, n);
    cdf += pmf;
    dfs[k] = { pmf: pmf, cdf: cdf };
    if (pmf > dfs.range.max) { dfs.range.max = 0.1 * Math.ceil(10 * pmf); }
  }

  // Mix in the convenience methods for p(x) and F(x).
  mctad.extend(dfs, mctad.discreteMixins);

  return dfs;
};
;
mctad.pascal = function (r, p) {
  // Check that `p` is a valid probability (0 < p < 1), and that `r` is an integer, strictly positive.
  if (p <= 0 || p >= 1.0 || !mctad.isInteger(r) || r <= 0) { return undefined; }

  var k = 0, pmf, cdf = 0, dfs = {
    mean: (r * p) / (1.0 - p),
    median: undefined,
    mode: (function () {
      if (r > 1) {
        return [Math.floor((p * (r - 1)) / (1.0 - p))];
      } else {
        return [0];
      }
    })(),
    variance: (r * p) / Math.pow((1.0 - p), 2),
    skewness: (1 + p) / Math.sqrt(r * p),
    entropy: undefined,
    domain: { min: 0, max: Infinity },
    range: { min: 0.0, max: 0.0 },

    // `mctad.pascal(5, 0.8).generate(100)` will perform 100 sequences of [Bernoulli trials](bernoulli.html), each of
    // which ceases when five failures have been observed. The probability of success is 0.8.
    generate: function (n) {
      var successes, failures,
        randomVariables = [];
      for (var i = 0; i < n; i++ ) {
        successes = 0;
        failures = 0;
        do {
          if (mctad.bernoulli(p).generate(1)[0] === 1) {
            successes++;
          } else {
            failures++;
          }
        } while (failures <= r);
        randomVariables.push(successes);
      }
      return randomVariables;
    }
  };

  // Iterate over the domain, calculating the probability mass and cumulative distribution functions.
  do {
    pmf = (mctad.combination((k + r - 1), k) * Math.pow((1.0 - p), r)) * Math.pow(p, k);
    cdf += pmf;
    dfs[k] = { pmf: pmf, cdf: cdf };
    if (pmf > dfs.range.max) { dfs.range.max = 0.1 * Math.ceil(10 * pmf); }
    k++;
  }
  while (dfs[k - 1].cdf < 1.0 - mctad.ε);
  dfs.domain.max = k - 1;

  // Mix in the convenience methods for p(x) and F(x).
  mctad.extend(dfs, mctad.discreteMixins);

  return dfs;
};
;
mctad.poisson = function (λ) {
  // Check that λ is strictly positive.
  if (λ <= 0) { return undefined; }

  var x = 0, pmf, cdf = 0, dfs = {
    mean: λ,
    median: Math.floor(λ + 1 / 3 - 0.02 / λ),
    mode: [Math.ceil(λ) - 1, Math.floor(λ)],
    variance: λ,
    skewness: Math.pow(λ, 0.5),
    entropy: undefined, // @todo: revisit this
    domain: { min: 0, max: Infinity },
    range: { min: 0.0, max: 0.0 },

    // `mctad.poisson(10).generate(100)` will generate an Array of 100
    // random variables, having a Poisson Distribution with an arrival rate of 10 per time unit.
    generate: function (n) {
      var a = Math.pow(Math.E, -λ), randomVariables = [];
      for (var i = 0; i < n; i++) {
        var j = 0, b = 1;
        do {
          b = b * mctad.getRandomArbitrary(0, 1);
          j++;
        }
        while (b > a);
        randomVariables.push(j - 1);
      }
      return randomVariables;
    }
  };

  // Iterate over the domain, calculating the probability mass and cumulative distribution functions.
  do {
    pmf = (Math.pow(Math.E, -λ) * Math.pow(λ, x)) / mctad.factorial(x);
    cdf += pmf;
    dfs[x] = { pmf: pmf, cdf: cdf };
    if (pmf > dfs.range.max) { dfs.range.max = 0.1 * Math.ceil(10 * pmf); }
    x++;
  }
  while (dfs[x - 1].cdf < 1.0 - mctad.ε);
  dfs.domain.max = x - 1;

  // Mix in the convenience methods for p(x) and F(x).
  mctad.extend(dfs, mctad.discreteMixins);

  return dfs;
};
;
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
    range: { min: 0.0, max: 0.0 },

    // `mctad.discreteUniform(1, 6).generate(10)` will generate an Array of 10
    // random variables, distributed uniformly between 1 and 6, inclusive, as in the roll of a fair die.
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
    if (pmf > dfs.range.max) { dfs.range.max = 0.1 * Math.ceil(10 * pmf); }
  }
  // Mix in the convenience methods for p(x) and F(x).
  mctad.extend(dfs, mctad.discreteMixins);

  return dfs;
};
;
mctad.chi_squared_distribution_table = {
  1: { 0.995:  0.00, 0.99:  0.00, 0.975:  0.00, 0.95:  0.00, 0.9:  0.02, 0.5:  0.45, 0.1:  2.71, 0.05:  3.84, 0.025:  5.02, 0.01:  6.63, 0.005:  7.88 },
  2: { 0.995:  0.01, 0.99:  0.02, 0.975:  0.05, 0.95:  0.10, 0.9:  0.21, 0.5:  1.39, 0.1:  4.61, 0.05:  5.99, 0.025:  7.38, 0.01:  9.21, 0.005: 10.60 },
  3: { 0.995:  0.07, 0.99:  0.11, 0.975:  0.22, 0.95:  0.35, 0.9:  0.58, 0.5:  2.37, 0.1:  6.25, 0.05:  7.81, 0.025:  9.35, 0.01: 11.34, 0.005: 12.84 },
  4: { 0.995:  0.21, 0.99:  0.30, 0.975:  0.48, 0.95:  0.71, 0.9:  1.06, 0.5:  3.36, 0.1:  7.78, 0.05:  9.49, 0.025: 11.14, 0.01: 13.28, 0.005: 14.86 },
  5: { 0.995:  0.41, 0.99:  0.55, 0.975:  0.83, 0.95:  1.15, 0.9:  1.61, 0.5:  4.35, 0.1:  9.24, 0.05: 11.07, 0.025: 12.83, 0.01: 15.09, 0.005: 16.75 },
  6: { 0.995:  0.68, 0.99:  0.87, 0.975:  1.24, 0.95:  1.64, 0.9:  2.20, 0.5:  5.35, 0.1: 10.65, 0.05: 12.59, 0.025: 14.45, 0.01: 16.81, 0.005: 18.55 },
  7: { 0.995:  0.99, 0.99:  1.25, 0.975:  1.69, 0.95:  2.17, 0.9:  2.83, 0.5:  6.35, 0.1: 12.02, 0.05: 14.07, 0.025: 16.01, 0.01: 18.48, 0.005: 20.28 },
  8: { 0.995:  1.34, 0.99:  1.65, 0.975:  2.18, 0.95:  2.73, 0.9:  3.49, 0.5:  7.34, 0.1: 13.36, 0.05: 15.51, 0.025: 17.53, 0.01: 20.09, 0.005: 21.96 },
  9: { 0.995:  1.73, 0.99:  2.09, 0.975:  2.70, 0.95:  3.33, 0.9:  4.17, 0.5:  8.34, 0.1: 14.68, 0.05: 16.92, 0.025: 19.02, 0.01: 21.67, 0.005: 23.59 },
  10: { 0.995:  2.16, 0.99:  2.56, 0.975:  3.25, 0.95:  3.94, 0.9:  4.87, 0.5:  9.34, 0.1: 15.99, 0.05: 18.31, 0.025: 20.48, 0.01: 23.21, 0.005: 25.19 },
  11: { 0.995:  2.60, 0.99:  3.05, 0.975:  3.82, 0.95:  4.57, 0.9:  5.58, 0.5: 10.34, 0.1: 17.28, 0.05: 19.68, 0.025: 21.92, 0.01: 24.72, 0.005: 26.76 },
  12: { 0.995:  3.07, 0.99:  3.57, 0.975:  4.40, 0.95:  5.23, 0.9:  6.30, 0.5: 11.34, 0.1: 18.55, 0.05: 21.03, 0.025: 23.34, 0.01: 26.22, 0.005: 28.30 },
  13: { 0.995:  3.57, 0.99:  4.11, 0.975:  5.01, 0.95:  5.89, 0.9:  7.04, 0.5: 12.34, 0.1: 19.81, 0.05: 22.36, 0.025: 24.74, 0.01: 27.69, 0.005: 29.82 },
  14: { 0.995:  4.07, 0.99:  4.66, 0.975:  5.63, 0.95:  6.57, 0.9:  7.79, 0.5: 13.34, 0.1: 21.06, 0.05: 23.68, 0.025: 26.12, 0.01: 29.14, 0.005: 31.32 },
  15: { 0.995:  4.60, 0.99:  5.23, 0.975:  6.27, 0.95:  7.26, 0.9:  8.55, 0.5: 14.34, 0.1: 22.31, 0.05: 25.00, 0.025: 27.49, 0.01: 30.58, 0.005: 32.80 },
  16: { 0.995:  5.14, 0.99:  5.81, 0.975:  6.91, 0.95:  7.96, 0.9:  9.31, 0.5: 15.34, 0.1: 23.54, 0.05: 26.30, 0.025: 28.85, 0.01: 32.00, 0.005: 34.27 },
  17: { 0.995:  5.70, 0.99:  6.41, 0.975:  7.56, 0.95:  8.67, 0.9: 10.09, 0.5: 16.34, 0.1: 24.77, 0.05: 27.59, 0.025: 30.19, 0.01: 33.41, 0.005: 35.72 },
  18: { 0.995:  6.26, 0.99:  7.01, 0.975:  8.23, 0.95:  9.39, 0.9: 10.87, 0.5: 17.34, 0.1: 25.99, 0.05: 28.87, 0.025: 31.53, 0.01: 34.81, 0.005: 37.16 },
  19: { 0.995:  6.84, 0.99:  7.63, 0.975:  8.91, 0.95: 10.12, 0.9: 11.65, 0.5: 18.34, 0.1: 27.20, 0.05: 30.14, 0.025: 32.85, 0.01: 36.19, 0.005: 38.58 },
  20: { 0.995:  7.43, 0.99:  8.26, 0.975:  9.59, 0.95: 10.85, 0.9: 12.44, 0.5: 19.34, 0.1: 28.41, 0.05: 31.41, 0.025: 34.17, 0.01: 37.57, 0.005: 40.00 },
  21: { 0.995:  8.03, 0.99:  8.90, 0.975: 10.28, 0.95: 11.59, 0.9: 13.24, 0.5: 20.34, 0.1: 29.62, 0.05: 32.67, 0.025: 35.48, 0.01: 38.93, 0.005: 41.40 },
  22: { 0.995:  8.64, 0.99:  9.54, 0.975: 10.98, 0.95: 12.34, 0.9: 14.04, 0.5: 21.34, 0.1: 30.81, 0.05: 33.92, 0.025: 36.78, 0.01: 40.29, 0.005: 42.80 },
  23: { 0.995:  9.26, 0.99: 10.20, 0.975: 11.69, 0.95: 13.09, 0.9: 14.85, 0.5: 22.34, 0.1: 32.01, 0.05: 35.17, 0.025: 38.08, 0.01: 41.64, 0.005: 44.18 },
  24: { 0.995:  9.89, 0.99: 10.86, 0.975: 12.40, 0.95: 13.85, 0.9: 15.66, 0.5: 23.34, 0.1: 33.20, 0.05: 36.42, 0.025: 39.36, 0.01: 42.98, 0.005: 45.56 },
  25: { 0.995: 10.52, 0.99: 11.52, 0.975: 13.12, 0.95: 14.61, 0.9: 16.47, 0.5: 24.34, 0.1: 34.28, 0.05: 37.65, 0.025: 40.65, 0.01: 44.31, 0.005: 46.93 },
  26: { 0.995: 11.16, 0.99: 12.20, 0.975: 13.84, 0.95: 15.38, 0.9: 17.29, 0.5: 25.34, 0.1: 35.56, 0.05: 38.89, 0.025: 41.92, 0.01: 45.64, 0.005: 48.29 },
  27: { 0.995: 11.81, 0.99: 12.88, 0.975: 14.57, 0.95: 16.15, 0.9: 18.11, 0.5: 26.34, 0.1: 36.74, 0.05: 40.11, 0.025: 43.19, 0.01: 46.96, 0.005: 49.65 },
  28: { 0.995: 12.46, 0.99: 13.57, 0.975: 15.31, 0.95: 16.93, 0.9: 18.94, 0.5: 27.34, 0.1: 37.92, 0.05: 41.34, 0.025: 44.46, 0.01: 48.28, 0.005: 50.99 },
  29: { 0.995: 13.12, 0.99: 14.26, 0.975: 16.05, 0.95: 17.71, 0.9: 19.77, 0.5: 28.34, 0.1: 39.09, 0.05: 42.56, 0.025: 45.72, 0.01: 49.59, 0.005: 52.34 },
  30: { 0.995: 13.79, 0.99: 14.95, 0.975: 16.79, 0.95: 18.49, 0.9: 20.60, 0.5: 29.34, 0.1: 40.26, 0.05: 43.77, 0.025: 46.98, 0.01: 50.89, 0.005: 53.67 },
  40: { 0.995: 20.71, 0.99: 22.16, 0.975: 24.43, 0.95: 26.51, 0.9: 29.05, 0.5: 39.34, 0.1: 51.81, 0.05: 55.76, 0.025: 59.34, 0.01: 63.69, 0.005: 66.77 },
  50: { 0.995: 27.99, 0.99: 29.71, 0.975: 32.36, 0.95: 34.76, 0.9: 37.69, 0.5: 49.33, 0.1: 63.17, 0.05: 67.50, 0.025: 71.42, 0.01: 76.15, 0.005: 79.49 },
  60: { 0.995: 35.53, 0.99: 37.48, 0.975: 40.48, 0.95: 43.19, 0.9: 46.46, 0.5: 59.33, 0.1: 74.40, 0.05: 79.08, 0.025: 83.30, 0.01: 88.38, 0.005: 91.95 },
  70: { 0.995: 43.28, 0.99: 45.44, 0.975: 48.76, 0.95: 51.74, 0.9: 55.33, 0.5: 69.33, 0.1: 85.53, 0.05: 90.53, 0.025: 95.02, 0.01: 100.42, 0.005: 104.22 },
  80: { 0.995: 51.17, 0.99: 53.54, 0.975: 57.15, 0.95: 60.39, 0.9: 64.28, 0.5: 79.33, 0.1: 96.58, 0.05: 101.88, 0.025: 106.63, 0.01: 112.33, 0.005: 116.32 },
  90: { 0.995: 59.20, 0.99: 61.75, 0.975: 65.65, 0.95: 69.13, 0.9: 73.29, 0.5: 89.33, 0.1: 107.57, 0.05: 113.14, 0.025: 118.14, 0.01: 124.12, 0.005: 128.30 },
  100: { 0.995: 67.33, 0.99: 70.06, 0.975: 74.22, 0.95: 77.93, 0.9: 82.36, 0.5: 99.33, 0.1: 118.50, 0.05: 124.34, 0.025: 129.56, 0.01: 135.81, 0.005: 140.17 }
};
;
mctad.t_distribution_table = {
  1: { 0.50: 0.0, 0.60: 0.325, 0.75: 1.000, 0.80: 1.376, 0.85: 1.963, 0.90: 3.078, 0.95: 6.314, 0.975: 12.71, 0.99: 31.82, 0.995: 63.66, 0.9975: 127.3, 0.999: 318.3, 0.9995: 636.6 },
  2: { 0.50: 0.0, 0.60: 0.289, 0.75: 0.816, 0.80: 1.061, 0.85: 1.386, 0.90: 1.886, 0.95: 2.920, 0.975: 4.303, 0.99: 6.965, 0.995: 9.925, 0.9975: 14.09, 0.999: 22.33, 0.9995: 31.60 },
  3: { 0.50: 0.0, 0.60: 0.277, 0.75: 0.765, 0.80: 0.978, 0.85: 1.250, 0.90: 1.638, 0.95: 2.353, 0.975: 3.182, 0.99: 4.541, 0.995: 5.841, 0.9975: 7.453, 0.999: 10.21, 0.9995: 12.92 },
  4: { 0.50: 0.0, 0.60: 0.271, 0.75: 0.741, 0.80: 0.941, 0.85: 1.190, 0.90: 1.533, 0.95: 2.132, 0.975: 2.776, 0.99: 3.747, 0.995: 4.604, 0.9975: 5.598, 0.999: 7.173, 0.9995: 8.610 },
  5: { 0.50: 0.0, 0.60: 0.267, 0.75: 0.727, 0.80: 0.920, 0.85: 1.156, 0.90: 1.476, 0.95: 2.015, 0.975: 2.571, 0.99: 3.365, 0.995: 4.032, 0.9975: 4.773, 0.999: 5.893, 0.9995: 6.869 },
  6: { 0.50: 0.0, 0.60: 0.265, 0.75: 0.718, 0.80: 0.906, 0.85: 1.134, 0.90: 1.440, 0.95: 1.943, 0.975: 2.447, 0.99: 3.143, 0.995: 3.707, 0.9975: 4.317, 0.999: 5.208, 0.9995: 5.959 },
  7: { 0.50: 0.0, 0.60: 0.263, 0.75: 0.711, 0.80: 0.896, 0.85: 1.119, 0.90: 1.415, 0.95: 1.895, 0.975: 2.365, 0.99: 2.998, 0.995: 3.499, 0.9975: 4.029, 0.999: 4.785, 0.9995: 5.408 },
  8: { 0.50: 0.0, 0.60: 0.262, 0.75: 0.706, 0.80: 0.889, 0.85: 1.108, 0.90: 1.397, 0.95: 1.860, 0.975: 2.306, 0.99: 2.896, 0.995: 3.355, 0.9975: 3.833, 0.999: 4.501, 0.9995: 5.041 },
  9: { 0.50: 0.0, 0.60: 0.261, 0.75: 0.703, 0.80: 0.883, 0.85: 1.100, 0.90: 1.383, 0.95: 1.833, 0.975: 2.262, 0.99: 2.821, 0.995: 3.250, 0.9975: 3.690, 0.999: 4.297, 0.9995: 4.781 },
  10: { 0.50: 0.0, 0.60: 0.260, 0.75: 0.700, 0.80: 0.879, 0.85: 1.093, 0.90: 1.372, 0.95: 1.812, 0.975: 2.228, 0.99: 2.764, 0.995: 3.169, 0.9975: 3.581, 0.999: 4.144, 0.9995: 4.587 },
  11: { 0.50: 0.0, 0.60: 0.260, 0.75: 0.697, 0.80: 0.876, 0.85: 1.088, 0.90: 1.363, 0.95: 1.796, 0.975: 2.201, 0.99: 2.718, 0.995: 3.106, 0.9975: 3.497, 0.999: 4.025, 0.9995: 4.437 },
  12: { 0.50: 0.0, 0.60: 0.259, 0.75: 0.695, 0.80: 0.873, 0.85: 1.083, 0.90: 1.356, 0.95: 1.782, 0.975: 2.179, 0.99: 2.681, 0.995: 3.055, 0.9975: 3.428, 0.999: 3.930, 0.9995: 4.318 },
  13: { 0.50: 0.0, 0.60: 0.259, 0.75: 0.694, 0.80: 0.870, 0.85: 1.079, 0.90: 1.350, 0.95: 1.771, 0.975: 2.160, 0.99: 2.650, 0.995: 3.012, 0.9975: 3.372, 0.999: 3.852, 0.9995: 4.221 },
  14: { 0.50: 0.0, 0.60: 0.258, 0.75: 0.692, 0.80: 0.868, 0.85: 1.076, 0.90: 1.345, 0.95: 1.761, 0.975: 2.145, 0.99: 2.624, 0.995: 2.977, 0.9975: 3.326, 0.999: 3.787, 0.9995: 4.140 },
  15: { 0.50: 0.0, 0.60: 0.258, 0.75: 0.691, 0.80: 0.866, 0.85: 1.074, 0.90: 1.341, 0.95: 1.753, 0.975: 2.131, 0.99: 2.602, 0.995: 2.947, 0.9975: 3.286, 0.999: 3.733, 0.9995: 4.073 },
  16: { 0.50: 0.0, 0.60: 0.258, 0.75: 0.690, 0.80: 0.865, 0.85: 1.071, 0.90: 1.337, 0.95: 1.746, 0.975: 2.120, 0.99: 2.583, 0.995: 2.921, 0.9975: 3.252, 0.999: 3.686, 0.9995: 4.015 },
  17: { 0.50: 0.0, 0.60: 0.257, 0.75: 0.689, 0.80: 0.863, 0.85: 1.069, 0.90: 1.333, 0.95: 1.740, 0.975: 2.110, 0.99: 2.567, 0.995: 2.898, 0.9975: 3.222, 0.999: 3.646, 0.9995: 3.965 },
  18: { 0.50: 0.0, 0.60: 0.257, 0.75: 0.688, 0.80: 0.862, 0.85: 1.067, 0.90: 1.330, 0.95: 1.734, 0.975: 2.101, 0.99: 2.552, 0.995: 2.878, 0.9975: 3.197, 0.999: 3.610, 0.9995: 3.922 },
  19: { 0.50: 0.0, 0.60: 0.257, 0.75: 0.688, 0.80: 0.861, 0.85: 1.066, 0.90: 1.328, 0.95: 1.729, 0.975: 2.093, 0.99: 2.539, 0.995: 2.861, 0.9975: 3.174, 0.999: 3.579, 0.9995: 3.883 },
  20: { 0.50: 0.0, 0.60: 0.257, 0.75: 0.687, 0.80: 0.860, 0.85: 1.064, 0.90: 1.325, 0.95: 1.725, 0.975: 2.086, 0.99: 2.528, 0.995: 2.845, 0.9975: 3.153, 0.999: 3.552, 0.9995: 3.850 },
  21: { 0.50: 0.0, 0.60: 0.257, 0.75: 0.686, 0.80: 0.859, 0.85: 1.063, 0.90: 1.323, 0.95: 1.721, 0.975: 2.080, 0.99: 2.518, 0.995: 2.831, 0.9975: 3.135, 0.999: 3.527, 0.9995: 3.819 },
  22: { 0.50: 0.0, 0.60: 0.256, 0.75: 0.686, 0.80: 0.858, 0.85: 1.061, 0.90: 1.321, 0.95: 1.717, 0.975: 2.074, 0.99: 2.508, 0.995: 2.819, 0.9975: 3.119, 0.999: 3.505, 0.9995: 3.792 },
  23: { 0.50: 0.0, 0.60: 0.256, 0.75: 0.685, 0.80: 0.858, 0.85: 1.060, 0.90: 1.319, 0.95: 1.714, 0.975: 2.069, 0.99: 2.500, 0.995: 2.807, 0.9975: 3.104, 0.999: 3.485, 0.9995: 3.767 },
  24: { 0.50: 0.0, 0.60: 0.256, 0.75: 0.685, 0.80: 0.857, 0.85: 1.059, 0.90: 1.318, 0.95: 1.711, 0.975: 2.064, 0.99: 2.492, 0.995: 2.797, 0.9975: 3.091, 0.999: 3.467, 0.9995: 3.745 },
  25: { 0.50: 0.0, 0.60: 0.256, 0.75: 0.684, 0.80: 0.856, 0.85: 1.058, 0.90: 1.316, 0.95: 1.708, 0.975: 2.060, 0.99: 2.485, 0.995: 2.787, 0.9975: 3.078, 0.999: 3.450, 0.9995: 3.725 },
  26: { 0.50: 0.0, 0.60: 0.256, 0.75: 0.684, 0.80: 0.856, 0.85: 1.058, 0.90: 1.315, 0.95: 1.706, 0.975: 2.056, 0.99: 2.479, 0.995: 2.779, 0.9975: 3.067, 0.999: 3.435, 0.9995: 3.707 },
  27: { 0.50: 0.0, 0.60: 0.256, 0.75: 0.684, 0.80: 0.855, 0.85: 1.057, 0.90: 1.314, 0.95: 1.703, 0.975: 2.052, 0.99: 2.473, 0.995: 2.771, 0.9975: 3.057, 0.999: 3.421, 0.9995: 3.690 },
  28: { 0.50: 0.0, 0.60: 0.256, 0.75: 0.683, 0.80: 0.855, 0.85: 1.056, 0.90: 1.313, 0.95: 1.701, 0.975: 2.048, 0.99: 2.467, 0.995: 2.763, 0.9975: 3.047, 0.999: 3.408, 0.9995: 3.674 },
  29: { 0.50: 0.0, 0.60: 0.256, 0.75: 0.683, 0.80: 0.854, 0.85: 1.055, 0.90: 1.311, 0.95: 1.699, 0.975: 2.045, 0.99: 2.462, 0.995: 2.756, 0.9975: 3.038, 0.999: 3.396, 0.9995: 3.659 },
  30: { 0.50: 0.0, 0.60: 0.256, 0.75: 0.683, 0.80: 0.854, 0.85: 1.055, 0.90: 1.310, 0.95: 1.697, 0.975: 2.042, 0.99: 2.457, 0.995: 2.750, 0.9975: 3.030, 0.999: 3.385, 0.9995: 3.646 },
  40: { 0.50: 0.0, 0.60: 0.255, 0.75: 0.681, 0.80: 0.851, 0.85: 1.050, 0.90: 1.303, 0.95: 1.684, 0.975: 2.021, 0.99: 2.423, 0.995: 2.704, 0.9975: 2.971, 0.999: 3.307, 0.9995: 3.551 },
  50: { 0.50: 0.0, 0.60: 0.255, 0.75: 0.679, 0.80: 0.849, 0.85: 1.047, 0.90: 1.299, 0.95: 1.676, 0.975: 2.009, 0.99: 2.403, 0.995: 2.678, 0.9975: 2.937, 0.999: 3.261, 0.9995: 3.496 },
  60: { 0.50: 0.0, 0.60: 0.254, 0.75: 0.679, 0.80: 0.848, 0.85: 1.045, 0.90: 1.296, 0.95: 1.671, 0.975: 2.000, 0.99: 2.390, 0.995: 2.660, 0.9975: 2.915, 0.999: 3.232, 0.9995: 3.460 },
  80: { 0.50: 0.0, 0.60: 0.254, 0.75: 0.678, 0.80: 0.846, 0.85: 1.043, 0.90: 1.292, 0.95: 1.664, 0.975: 1.990, 0.99: 2.374, 0.995: 2.639, 0.9975: 2.887, 0.999: 3.195, 0.9995: 3.416 },
  100: { 0.50: 0.0, 0.60: 0.254, 0.75: 0.677, 0.80: 0.845, 0.85: 1.042, 0.90: 1.290, 0.95: 1.660, 0.975: 1.984, 0.99: 2.364, 0.995: 2.626, 0.9975: 2.871, 0.999: 3.174, 0.9995: 3.390 },
  120: { 0.50: 0.0, 0.60: 0.254, 0.75: 0.677, 0.80: 0.845, 0.85: 1.041, 0.90: 1.289, 0.95: 1.658, 0.975: 1.980, 0.99: 2.358, 0.995: 2.617, 0.9975: 2.860, 0.999: 3.160, 0.9995: 3.373 }
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
    range: { min: 0, max: Infinity },

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
      if (x >= 0) {
        return λ * Math.pow(Math.E, -λ * x);
      } else {
        return undefined;
      }
    },

    cdf: function (x) {
      if (x >= 0) {
        return 1 - Math.pow(Math.E, -λ * x);
      } else {
        return 0.0;
      }
    }

  };

  // Mix in the convenience methods for f(X) and F(X).
  mctad.extend(dfs, mctad.continuousMixins);

  dfs.domain.max = Math.ceil(4 * dfs.variance);
  dfs.range.max = 0.1 * Math.ceil(10 * dfs.pdf(0.0));

  return dfs;
};
;
mctad.inverseErf = function (x) {
  var a = 0.147;
  return mctad.sign(x) * Math.sqrt(
    Math.sqrt(
      Math.pow((2 / (mctad.π * a) + (Math.log(1 - Math.pow(x, 2)) / 2)), 2) - Math.log(1 - Math.pow(x, 2)) / a
    ) - ((2 / (mctad.π * a)) + Math.log(1 - Math.pow(x, 2)) / 2)
  );
};
;
mctad.lognormal = function (μ, σ2) {
  // Check that `μ > 0` and `σ2 > 0`.
  if (μ < 0 || σ2 <= 0) { return undefined; }

  var dfs = {
    mean: Math.pow(Math.E, μ + σ2 / 2),
    median: Math.pow(Math.E, μ),
    mode: Math.pow(Math.E, μ - σ2),
    variance: Math.pow(Math.E, 2 * μ + σ2) * (Math.pow(Math.E, σ2) - 1),
    skewness: (Math.pow(Math.E, σ2) + 2) * Math.sqrt(Math.pow(Math.E, σ2) - 1),
    entropy: 0.5 + 0.5 * Math.log(2 * mctad.π * σ2) + μ,
    domain: { min: 0.0, max: Infinity },
    range: { min: 0, max: Infinity },

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
      if (x > 0) {
        return (1 / (x * Math.sqrt(2 * mctad.π * σ2))) * Math.pow(Math.E, -(Math.pow(Math.log(x) - μ, 2) / (2 * σ2)));
      } else {
        return undefined;
      }
    },

    cdf: function (x) {
      if (x > 0) {
        var Z = (Math.log(x) - μ) / Math.sqrt(σ2);
        return mctad.normal(0, 1).F(Z);
      } else {
        return 0.0;
      }
    }
  };

  // Mix in the convenience methods for f(X) and F(X).
  mctad.extend(dfs, mctad.continuousMixins);

  dfs.domain.max = μ + Math.ceil(2.5 * dfs.variance);
  dfs.range.max = 0.1 * Math.ceil(10 * dfs.pdf(dfs.mode));

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
    range: { min: 0, max: Infinity },

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

  dfs.domain.min = μ - Math.ceil(3 * dfs.variance);
  dfs.domain.max = μ + Math.ceil(3 * dfs.variance);
  dfs.range.max = 0.1 * Math.ceil(10 * dfs.pdf(μ));

  return dfs;
};
;
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
    range: { min: 0, max: Infinity },

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

  dfs.range.max = 0.1 * Math.ceil(10 * dfs.pdf(a));

  return dfs;
};
;
mctad.weibull = function (λ, k) {
  // Check that `λ > 0` and `k > 0`.
  if (λ < 0 || k < 0) { return undefined; }

  var dfs = {
    mean: λ * mctad.Γ(1 + 1 / k),
    median: λ * Math.pow(Math.log(2), 1 / k),
    mode: function () {
      if (k >= 1) {
        return λ * Math.pow((k - 1) / k, 1 / k);
      } else {
        return 0.0;
      }
    }(),
    variance: Math.pow(λ, 2) * ( mctad.Γ(1 + 2 / k) - Math.pow(mctad.Γ(1 + 1 / k), 2)),
    skewness: undefined, // @todo circle back for this
    entropy: undefined, // @todo circle back for this
    domain: { min: 0, max: Infinity },
    range: { min: 0, max: Infinity },

    // `mctad.weibull(1.5).generate(100)` will generate an Array of 100
    // random variables, distributed weibullly.
    generate: function (n) {
      var randomVariables = [];
      for (var k = 0; k < n; k++ ) {
        randomVariables.push(-(1 / λ) * Math.log(mctad.getRandomArbitrary(0, 1)));
      }
      return randomVariables;
    },

    pdf: function (x) {
      if (x >= 0) {
        return (k / λ) * Math.pow(x / λ, k - 1) * Math.pow(Math.E, -(Math.pow(x / λ, k)));
      } else {
        return 0.0;
      }
    },

    cdf: function (x) {
      if (x >= 0) {
        return 1 - Math.pow(Math.E, -Math.pow(x / λ, k));
      } else {
        return 0.0;
      }
    }

  };

  // Mix in the convenience methods for f(X) and F(X).
  mctad.extend(dfs, mctad.continuousMixins);

  dfs.domain.max = Math.ceil(6 * dfs.variance);
  dfs.range.max = 0.1 * Math.ceil(10 * dfs.pdf(dfs.mode));

  return dfs;
};
;
mctad.confidenceIntervalOnTheDifferenceBetweenTwoMeans = function (x_bar, s_x, y_bar, s_y, n_x, n_y, α, type) {
  if (typeof x_bar !== 'number' || typeof s_x !== 'number' || typeof y_bar !== 'number' || typeof s_y !== 'number' ||
    !mctad.isInteger(n_x) || !mctad.isInteger(n_y) || α <= 0.0 || α >= 1.0) { return undefined; }

  var
    x_bar_minus_y_bar = x_bar - y_bar,
    σ_x_bar_minus_y_bar = Math.sqrt(Math.pow(s_x, 2) / n_x + Math.pow(s_y, 2) / n_y),
    v;

  // If the sample size is large, use Z Scores from the Standard Normal Distribution.
  if (n_x > 30 && n_y > 30) {
    // Return the upper confidence bound of a one-tailed confidence interval.
    if (typeof type !== 'undefined' && type.toLowerCase() === 'u') {
      return x_bar_minus_y_bar + mctad.z(1 - α) * σ_x_bar_minus_y_bar;
    } else {
      // Return the lower confidence bound of a one-tailed confidence interval.
      if (typeof type !== 'undefined' && type.toLowerCase() === 'l') {
        return x_bar_minus_y_bar - mctad.z(1 - α) * σ_x_bar_minus_y_bar;
      } else {
        // Return both bounds of a two-tailed confidence interval.
        return [
          x_bar_minus_y_bar - mctad.z(1 - α / 2) * σ_x_bar_minus_y_bar,
          x_bar_minus_y_bar + mctad.z(1 - α / 2) * σ_x_bar_minus_y_bar
        ];
      }
    }
  } else {
    // Otherwise, calculate the degrees of freedom and use Student's t distribution.
    v = Math.floor(
      Math.pow(Math.pow(s_x, 2) / n_x + Math.pow(s_y, 2) / n_y, 2) /
        ((Math.pow(Math.pow(s_x, 2) / n_x, 2) / (n_x - 1)) + (Math.pow(Math.pow(s_y, 2) / n_y, 2) / (n_y - 1)))
    );
    // Return the upper confidence bound of a one-tailed confidence interval.
    if (typeof type !== 'undefined' && type.toLowerCase() === 'u') {
      return x_bar_minus_y_bar + mctad.t_distribution_table[v][1 - α] * σ_x_bar_minus_y_bar;
    } else {
      // Return the lower confidence bound of a one-tailed confidence interval.
      if (typeof type !== 'undefined' && type.toLowerCase() === 'l') {
        return x_bar_minus_y_bar - mctad.t_distribution_table[v][1 - α] * σ_x_bar_minus_y_bar;
      } else {
        // Return both bounds of a two-tailed confidence interval.
        return [
          x_bar_minus_y_bar - mctad.t_distribution_table[v][1 - α / 2] * σ_x_bar_minus_y_bar,
          x_bar_minus_y_bar + mctad.t_distribution_table[v][1 - α / 2] * σ_x_bar_minus_y_bar
        ];
      }
    }
  }

};
;
mctad.confidenceIntervalOnTheDifferenceBetweenTwoProportions = function (X, Y, n_x, n_y, α, type) {
  if (typeof X !== 'number' || typeof Y !== 'number' || !mctad.isInteger(n_x) || !mctad.isInteger(n_y) || α <= 0.0 || α >= 1.0) { return undefined; }

  // Apply the Agresti-Coull Interval transformation.
  var
    n_tilde_x = n_x + 2, n_tilde_y = n_y + 2,
    p_tilde_x = (X + 1) / n_tilde_x, p_tilde_y = (Y + 1) / n_tilde_y,
    p_tilde_x_minus_p_tilde_y = p_tilde_x - p_tilde_y,
    σ_p_tilde_x_p_tilde_y = Math.sqrt(p_tilde_x * (1.0 - p_tilde_x) / n_tilde_x + p_tilde_y * (1.0 - p_tilde_y) / n_tilde_y);

  // Return the upper confidence bound of a one-tailed confidence interval.
  if (typeof type !== 'undefined' && type.toLowerCase() === 'u') {
    return p_tilde_x_minus_p_tilde_y + mctad.z(1 - α) * σ_p_tilde_x_p_tilde_y;
  } else {
    // Return the lower confidence bound of a one-tailed confidence interval.
    if (typeof type !== 'undefined' && type.toLowerCase() === 'l') {
      return p_tilde_x_minus_p_tilde_y - mctad.z(1 - α) * σ_p_tilde_x_p_tilde_y;
    } else {
      // Return both bounds of a two-tailed confidence interval.
      return [
        p_tilde_x_minus_p_tilde_y - mctad.z(1 - α / 2) * σ_p_tilde_x_p_tilde_y,
        p_tilde_x_minus_p_tilde_y + mctad.z(1 - α / 2) * σ_p_tilde_x_p_tilde_y
      ];
    }
  }

};
;
mctad.confidenceIntervalOnTheMean = function (x_bar, s, n, α, type) {
  if (typeof x_bar !== 'number' || typeof s !== 'number' || !mctad.isInteger(n) || α <= 0.0 || α >= 1.0) { return undefined; }

  var σ_bar = s / Math.sqrt(n);

  // If the sample size is large, use Z Scores from the Standard Normal Distribution.
  if (n > 30) {
    // Return the upper confidence bound of a one-tailed confidence interval.
    if (typeof type !== 'undefined' && type.toLowerCase() === 'u') {
      return x_bar + mctad.z(1 - α) * σ_bar;
    } else {
      // Return the lower confidence bound of a one-tailed confidence interval.
      if (typeof type !== 'undefined' && type.toLowerCase() === 'l') {
        return x_bar - mctad.z(1 - α) * σ_bar;
      } else {
        // Return both bounds of a two-tailed confidence interval.
        return [
          x_bar - mctad.z(1 - α / 2) * σ_bar,
          x_bar + mctad.z(1 - α / 2) * σ_bar
        ];
      }
    }
  } else {
    // Otherwise, use Student's t distribution.
    // Return the upper confidence bound of a one-tailed confidence interval.
    if (typeof type !== 'undefined' && type.toLowerCase() === 'u') {
      return x_bar + mctad.t_distribution_table[n - 1][1 - α] * σ_bar;
    } else {
      // Return the lower confidence bound of a one-tailed confidence interval.
      if (typeof type !== 'undefined' && type.toLowerCase() === 'l') {
        return x_bar - mctad.t_distribution_table[n - 1][1 - α] * σ_bar;
      } else {
        // Return both bounds of a two-tailed confidence interval.
        return [
          x_bar - mctad.t_distribution_table[n - 1][1 - α / 2] * σ_bar,
          x_bar + mctad.t_distribution_table[n - 1][1 - α / 2] * σ_bar
        ];
      }
    }
  }

};
;
mctad.confidenceIntervalOnTheProportion = function (X, n, α, type) {
  if (typeof X !== 'number' || !mctad.isInteger(n) || α <= 0.0 || α >= 1.0) { return undefined; }

  // Apply the Agresti-Coull Interval transformation.
  var
    n_tilde = n + 4,
    p_tilde = (X + 2) / n_tilde,
    σ_p_tilde = Math.sqrt(p_tilde * (1.0 - p_tilde) / n_tilde);

  // Return the upper confidence bound of a one-tailed confidence interval.
  if (typeof type !== 'undefined' && type.toLowerCase() === 'u') {
    return p_tilde + mctad.z(1 - α) * σ_p_tilde;
  } else {
    // Return the lower confidence bound of a one-tailed confidence interval; enforce 0 as lowest possible bound.
    if (typeof type !== 'undefined' && type.toLowerCase() === 'l') {
      return Math.max(0, p_tilde - mctad.z(1 - α) * σ_p_tilde);
    } else {
      // Return both bounds of a two-tailed confidence interval; enforce 0 as lowest possible bound.
      return [
        Math.max(0, p_tilde - mctad.z(1 - α / 2) * σ_p_tilde),
        p_tilde + mctad.z(1 - α / 2) * σ_p_tilde
      ];
    }
  }

};
;
mctad.z = function (p) {
  if (p <= 0.0 || p >= 1.0) { return undefined; }

  return Math.sqrt(2) * mctad.inverseErf(2 * p - 1);

};
