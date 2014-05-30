// # Geometric Mean
//
// `mctad.geometricMean()` accepts an Array of Numbers and returns their average as a Number.
//
// More at the [Wikipedia article](http://en.wikipedia.org/wiki/Mean#Geometric_mean_.28AM.29).

mctad.geometricMean = function (data) {
  if (!Array.isArray(data) || data.length === 0) { return undefined; }

  return Math.pow(this.product(data), 1/data.length);

};
