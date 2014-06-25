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
