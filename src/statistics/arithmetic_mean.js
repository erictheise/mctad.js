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
