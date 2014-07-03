/*
# Combination

A [Combination](http://en.wikipedia.org/wiki/Combination) is a way of selecting members from a group such that order of
selection does not matter. This can be contrasted with permutations, where order is accounted for. Combination is
usually expressed as _n choose k_ or _n items taken k at a time_.

`mctad.factorial()` is used to calculate `mctad.combination()`; `mctad.combination()` is used to calculate
`mctad.pascal()`.

### Assumptions

`n` and `k` are non-negative Integers.

### Use

`mctad.combination(n, k)`

### Inline Comments
*/

mctad.combination = function(n, k) {
  // Check that `n` and `k` are non-negative Integers.
  if (!mctad.isInteger(n) || n < 0 || !mctad.isInteger(k) || k < 0) { return undefined; }

  if (k > n) { return 0; }

  // Literal implementation of the (n k) = n!/(k!(n - k)!) formula.
  return this.factorial(n)/(this.factorial(k) * this.factorial(n - k));
};
