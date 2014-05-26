// # Geometric Distribution

mctad.geometric_distribution = function (p) {
  // Check that `p` is a valid probability (0 < p < 1).
  if (p <= 0 || p >= 1.0) { return null; }

  var probability_of_x, x = 0, acc = 0, distribution_functions = { mean: (1 - p)/p, variance: (1.0 - p)/Math.pow(p, 2) };
  do {
    probability_of_x = p * Math.pow(1.0 - p, x);
    acc += probability_of_x;
    distribution_functions[x] = { probability_of_x: probability_of_x, cumulative_probability_of_x: acc };
    x++;
  }
  while (distribution_functions[x - 1].cumulative_probability_of_x < 1.0 - this.ε);

  return distribution_functions;
};
