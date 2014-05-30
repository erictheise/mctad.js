// # Mean
//
// `mctad.mean()` accepts an Array of Numbers and returns their average as a Number.
// It is an alias for `mctad.arithmeticMean()`.
//
// See [Arithmetic Mean](http://en.wikipedia.org/wiki/Mean#Arithmetic_mean_.28AM.29).

mctad.mean = function (data) { return this.arithmeticMean(data); };
