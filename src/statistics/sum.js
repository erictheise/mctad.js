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
