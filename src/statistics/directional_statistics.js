// Directional statistics
//
// This section is based on "Directional Statistics" by Kanti V. Mardia &
// Peter E. Jupp, Wiley (2000)
//
function _to_radians(v) {
  if (typeof v === 'string' || v instanceof String) {
    // If it's a string, explicitly in degrees, e.g, "47.3°", convert it to radians
    if (v.trim().slice(-1) === '°') {
      return (Math.PI/180) * parseFloat(v);
    } else {
      // If it's a string, assume it's already in radians
      return parseFloat(v);
    }
  } else {
    // If it's a number, assume it's already in radians
    return v;
  }
}

function mean_direction(data) {
  // The mean_direction of no angles is null
  if (data.length === 0 ) return null;

  // Mardia & Jupp equation (2.2.4)
  var c_bar, s_bar, theta_bar, acc = { c: 0, s : 0 };
  for (i = 0; i < data.length; i++) {
    acc.c += Math.cos(_to_radians(data[i]));
    acc.s += Math.sin(_to_radians(data[i]));
  }
  c_bar = (acc.c / data.length);
  s_bar = (acc.s / data.length);
  (c_bar >= 0 ) ? theta_bar = Math.atan(s_bar/c_bar) : theta_bar = Math.atan(s_bar/c_bar) + Math.PI;
  return theta_bar;
}

function mean_resultant_length(data) {
  // The mean_resultant_length of no angles is null
  if (data.length === 0 ) return null;

  // Mardia & Jupp equation (2.2.4)
  var c_bar, s_bar, r_bar, acc = { c: 0, s : 0 };
  for (i = 0; i < data.length; i++) {
    acc.c += Math.cos(_to_radians(data[i]));
    acc.s += Math.sin(_to_radians(data[i]));
  }
  c_bar = (acc.c / data.length);
  s_bar = (acc.s / data.length);
  r_bar = Math.sqrt(Math.pow(c_bar, 2) + Math.pow(s_bar, 2));
  return r_bar;
}

function median_direction(data) {
  // Mardia & Jupp describe the conditions, but not the calculations!
  //
  // The median_direction is any angle θ such that
  // (i)  half of the data points lie in the in the arc [θ, θ + π) and
  // (ii) the majority are nearer to θ than to θ + π
  //
  // They don't use it after introducing it, so: low priority
}

function circular_variance(data) {
  // Mardia & Jupp equation (2.3.3)
  // Depends on mean_resultant_length
  return 1 - mean_resultant_length(data);
}

function circular_standard_deviation() {
  // Mardia & Jupp equation (2.3.11)
  // Depends on mean_resultant_length
  return Math.sqrt( -2.0 * Math.log(1 - mean_resultant_length(data)) );
}

