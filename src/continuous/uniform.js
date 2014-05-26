// # Uniform Distribution

mctad.uniform = {
  distribution: function (a, b) {
    // Check that `a < b`.
    if (a >= b) { return null; }

    var probability_of_x, x, acc = 0, distribution_functions = { mean: (a + b)/2, variance: Math.pow((b - a), 2)/12 };
    for (x = i; x <= j; x++) {
      probability_of_x = 1/(b - a);
      acc += probability_of_x;
      distribution_functions[x] = { probability_of_x: probability_of_x, cumulative_probability_of_x: acc };
    }

    return distribution_functions;
  }

};
