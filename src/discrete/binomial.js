// # Binomial Distribution
// The [Binomial Distribution](http://en.wikipedia.org/wiki/Binomial_distribution) is the discrete probability
// distribution of the number of successes in a sequence of n independent yes/no experiments, each of which yields
// success with probability `p`. Such a success/failure experiment is also called a Bernoulli experiment or
// Bernoulli trial; when n = 1, the Binomial Distribution is a Bernoulli Distribution.
mctad.binomial_distribution = function(n, p) {
  // Check that `p` is a valid probability (0 ≤ p ≤ 1), and that `n` is an integer, strictly positive.
  if (p < 0 || p > 1.0 || !this.isInteger(n) || n <= 0) { return null; }

  // We initialize `x`, the random variable, and `acc`, an accumulator for the cumulative distribution function
  // to 0. `distribution_functions` is the object we'll return with the `probability_of_x` and the
  // `cumulative_probability_of_x`, as well as the calculated mean & variance. We iterate until the
  // `cumulative_probability_of_x` is within `epsilon` of 1.0.
  var probability_of_x, x = 0, acc = 0, distribution_functions = { mean: n * p, variance: (n * p) * (1.0 - p) };
  do {
    probability_of_x = (this.factorial(n) / (this.factorial(x) * this.factorial(n - x)) * (Math.pow(p, x) * Math.pow(1.0 - p, (n - x))));
    acc += probability_of_x;
    distribution_functions[x] = { probability_of_x: probability_of_x, cumulative_probability_of_x: acc };
    x++;
  }
  while (distribution_functions[x - 1].cumulative_probability_of_x < 1.0 - this.ε);

  return distribution_functions;
};
