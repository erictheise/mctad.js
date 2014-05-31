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
