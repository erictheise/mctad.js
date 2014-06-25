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
