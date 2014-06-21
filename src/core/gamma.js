/*

# Gamma Function

The [Gamma Function](http://en.wikipedia.org/wiki/Particular_values_of_the_gamma_function) is an important special
function in mathematics. Its values can be expressed in closed form for integer and half-integer arguments, but no
simple expressions are known for its values at rational points in general.

### Assumptions

`n` is a positive integer, half-integer, or

### Use

`mctad.Γ(n)` or `mctad.gamma(n)`

### Inline Comments
*/

mctad.Γ = function(n) {
  if (n < 0) { return undefined; }

  var Γ;

  // If n is a positive Integer, return its factorial.
  if (mctad.isInteger(n)) {
    Γ = mctad.factorial(n - 1);
  } else {
    // If (n / 2) is a positive Integer, return the exact value using double factorials.
    if (mctad.isInteger(2 * n)) {
      Γ = (Math.sqrt(mctad.π) * mctad.doubleFactorial(n * 2 - 2) / Math.pow(2, (n * 2 - 1) / 2));
    }
  }
  return Γ;

};
