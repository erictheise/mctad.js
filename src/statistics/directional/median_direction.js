// # Median Direction
//
// From Kanti V. Mardia & Peter E. Jupp, "Directional Statistics", Wiley, 2000

mctad.medianDirection = function (data) {
  // Mardia & Jupp describe the conditions, but not the calculations!
  //
  // The median_direction is any angle θ such that
  // (i)  half of the data points lie in the in the arc [θ, θ + π) and
  // (ii) the majority are nearer to θ than to θ + π
  //
  // They don't use it after introducing it, so: low priority
};
