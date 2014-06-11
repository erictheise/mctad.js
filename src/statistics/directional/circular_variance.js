// # Circular Variance
//
// `mctad.circularVariance()` accepts an Array of angles (radians as numbers or strings, or degrees as strings only, in the
// form "47.3°") and returns their variance in radians as a Number. Relies on `mctad.meanResultantLength()`.
//
// From Kanti V. Mardia & Peter E. Jupp, "Directional Statistics", Wiley, 2000

mctad.circularVariance = function (data) {
  // The circular variance is undefined if the data is not in an Array of 1 or more elements.
  if (!Array.isArray(data) || data.length === 0) { return undefined; }

  // Mardia & Jupp equation (2.3.3)
  return 1 - mctad.meanResultantLength(data);
};
