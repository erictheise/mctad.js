// # Mean Direction
//
// `mctad.meanDirection()` accepts an Array of angles (radians as numbers or strings, or degrees as strings only, in the
// form "47.3°") and returns their average in radians as a Number.
//
// From Kanti V. Mardia & Peter E. Jupp, "Directional Statistics", Wiley, 2000

mctad.meanDirection = function (data) {
  // The mean direction is undefined if the data is not in an Array of 1 or more elements.
  if (!Array.isArray(data) || data.length === 0) { return undefined; }

  // Mardia & Jupp equation 2.2.4
  var C_bar, S_bar, θ_bar, acc = { cos: 0, sin: 0 };
  for (var i = 0; i < data.length; i++) {
    acc.cos += Math.cos(mctad.toRadians(data[i]));
    acc.sin += Math.sin(mctad.toRadians(data[i]));
  }
  C_bar = (acc.cos / data.length);
  S_bar = (acc.sin / data.length);

  if (C_bar >= 0 ) {
    θ_bar = Math.atan(S_bar/C_bar);
  } else {
    θ_bar = Math.atan(S_bar/C_bar) + mctad.π;
  }
  return θ_bar;

};
