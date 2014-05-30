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
