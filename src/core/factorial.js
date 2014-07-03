/*
# Factorial

The [Factorial](http://en.wikipedia.org/wiki/Factorial) is the product of all positive integers up to a
specified odd positive integer. The mathematical notation is `n!`.

### Assumptions

`n` is a non-negative Integer.

### Use

`mctad.factorial(n)`

### Inline Comments
*/

mctad.factorial = function(n) {
  // Check that `n` is a non-negative Integer.
  if (!mctad.isInteger(n) || n < 0) { return undefined; }

  var acc = 1;
  // This is a simple, iterative implementation rather than a recursive implementation.
  for (var i = 2; i <= n; i++) {
    acc = acc * i;
  }
  return acc;
};
