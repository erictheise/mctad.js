// # Mean Resultant Length
//
// From Kanti V. Mardia & Peter E. Jupp, "Directional Statistics", Wiley, 2000

mctad.meanResultantLength = function (data) {
  // The mean resultant length is undefined if the data is not in an Array of 1 or more elements.
  if (!Array.isArray(data) || data.length === 0) { return undefined; }

  // Mardia & Jupp equation 2.2.3
  var C_bar, S_bar, R_bar, acc = { cos: 0, sin: 0 };
  for (var i = 0; i < data.length; i++) {
    acc.cos += Math.cos(mctad.toRadians(data[i]));
    acc.sin += Math.sin(mctad.toRadians(data[i]));
  }
  C_bar = (acc.cos / data.length);
  S_bar = (acc.sin / data.length);

  R_bar = Math.sqrt(Math.pow(C_bar, 2) + Math.pow(S_bar, 2));
  return R_bar;
};
