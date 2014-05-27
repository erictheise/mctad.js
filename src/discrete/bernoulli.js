// # Bernoulli Distribution
// The [Bernoulli distribution](http://en.wikipedia.org/wiki/Bernoulli_distribution) is the probability discrete
// distribution of a random variable which takes value 1 with success probability `p` and value 0 with failure
// probability `q` = 1 - `p`. It can be used, for example, to represent the toss of a coin, where "1" is defined to
// mean "heads" and "0" is defined to mean "tails" (or vice versa). It is a special case of a Binomial Distribution
// where `n` = 1.

mctad.bernoulli = {
  distribution: function(p) {
    // Check that `p` is a valid probability (0 ≤ p ≤ 1)
    if (p < 0 || p > 1.0) { return null; }

    return mctad.binomial.distribution(1, p);
  }
};
