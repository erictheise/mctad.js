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
