// # Combination
//
// http://en.wikipedia.org/wiki/Combination

mctad.combination = function(n, k) {
  if (n < 0 || k < 0 ) { return undefined; }

  if (k > n) { return 0; }

  return this.factorial(n)/(this.factorial(k) * this.factorial(n - k));
};
