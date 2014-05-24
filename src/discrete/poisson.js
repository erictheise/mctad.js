// # Poisson Distribution
// The [Poisson Distribution](http://en.wikipedia.org/wiki/Poisson_distribution) is a discrete probability
// distribution that expresses the probability of a given number of events occurring in a fixed interval of time
// and/or space if these events occur with a known average rate and independently of the time since the last event.
//
// The Poisson Distribution is characterized by the strictly positive mean arrival or occurrence rate, `λ`.
mctad.poisson_distribution = function (λ) {
  // Check that λ is strictly positive
  if (λ <= 0) { return null; }

  // We initialize `x`, the random variable, and `acc`, an accumulator for the cumulative distribution function
  // to 0. `distribution_functions` is the object we'll return with the `probability_of_x` and the
  // `cumulative_probability_of_x`, as well as the trivially calculated mean & variance. We iterate until the
  // `cumulative_probability_of_x` is within `epsilon` of 1.0.
  var probability_of_x, x = 0, acc = 0, distribution_functions = { mean: λ, variance: λ };
  do {
    probability_of_x = (Math.pow(Math.E, -λ) * Math.pow(λ, x))/this.factorial(x);
    acc += probability_of_x;
    distribution_functions[x] = { probability_of_x: probability_of_x, cumulative_probability_of_x: acc };
    x++;
  }
  while (distribution_functions[x - 1].cumulative_probability_of_x < 1.0 - this.ε);

  return distribution_functions;
};
