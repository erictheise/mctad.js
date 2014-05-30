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
