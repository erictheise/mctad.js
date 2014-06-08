// # Mean Direction
//
// Directional statistics based on "Directional Statistics" by Kanti V. Mardia & Peter E. Jupp, Wiley (2000)

mctad.meanDirection = function (data) {
  // The mean_direction of no angles is null
  if (data.length === 0 ) return null;

  // Mardia & Jupp equation (2.2.4)
  var c_bar, s_bar, theta_bar, acc = { c: 0, s : 0 };
  for (i = 0; i < data.length; i++) {
    acc.c += Math.cos(this.toRadians(data[i]));
    acc.s += Math.sin(this.toRadians(data[i]));
  }
  c_bar = (acc.c / data.length);
  s_bar = (acc.s / data.length);
  if (c_bar >= 0 ) {
    theta_bar = Math.atan(s_bar/c_bar);
  } else {
    theta_bar = Math.atan(s_bar/c_bar) + this.π;
  }
  return theta_bar;
};
