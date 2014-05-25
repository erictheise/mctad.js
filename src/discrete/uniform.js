// # Discrete Uniform Distribution

mctad.discrete_uniform_distribution = function (i, j) {
  // Check that `i ≤ j`, and that `i` and `j` are integers.
  if (i > j || !this.isInteger(i) || !this.isInteger(j) ) { return null; }

  var probability_of_x, x, acc = 0, distribution_functions = { mean: (i + j)/2, variance: (Math.pow((j - i + 1), 2) - 1)/12 };
  for (x = i; x <= j; x++) {
    probability_of_x = 1/(j - i + 1);
    acc += probability_of_x;
    distribution_functions[x] = { probability_of_x: probability_of_x, cumulative_probability_of_x: acc };
  }

  return distribution_functions;
};
