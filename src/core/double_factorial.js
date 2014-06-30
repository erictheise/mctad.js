/*

# Double Factorial

The [Double Factorial](http://en.wikipedia.org/wiki/Double_factorial) is the product of all the odd integers up to a
specified odd positive integer. The mathematical notation is `n!!`.

Because the [Chi Squared](../continuous/chi_squared.html), [Student's t](../continuous/students_t.html), and
[Weibull](../continuous/weibull.html) Distributions require the [Gamma Function](gamma.html), and because this use of
the Gamma Function requires it to be defined for negative odd integers, that case is handled by this recursive
implementation.

### Assumptions

`n` is an odd Integer.

### Use

`mctad.doubleFactorial(n)`

### Inline Comments
*/

mctad.doubleFactorial = function(n) {
  // Check that `n` is an odd Integer.
  if (!mctad.isInteger(n) || n % 2 === 0) { return undefined; }

  var acc;

  if (n > 0) {
    // For the case where `n` is a positive Integer, continue to recurse through lesser positive Integers until 1
    // is reached.
    if (n > 1) {
      acc = n * mctad.doubleFactorial(n - 2);
    } else {
      acc = 1;
    }
    return acc;
  } else {
    if (n < 0) {
      // For the case where `n` is a negative Integer, use the inversion of its recurrence relation as
      // described at [the Wikipedia page](http://en.wikipedia.org/wiki/Double_factorial#Negative_arguments).
      if (n < -1) {
        acc = mctad.doubleFactorial(n + 2) / (n + 2);
      } else {
        acc = 1;
      }
    }
    return acc;
  }

};
