/*

# Gamma Function

The [Gamma Function](http://en.wikipedia.org/wiki/Particular_values_of_the_gamma_function) is an important special
function in mathematics. Its values can be expressed in closed form for integer and half-integer arguments, but no
simple expressions are known for its values at rational points in general.

### Assumptions

`n` is an integer, or half-integer, of any sign. For negative integers, Γ(n) = ∞.

### Use

`mctad.Γ(n)` or `mctad.gamma(n)`

### Inline Comments
*/

mctad.Γ = function(n) {
  if (!mctad.isInteger(n * 2)) { return undefined; }

  if (n <= 0 && mctad.isInteger(n)) { return Infinity; }

  var Γ;

  // If n is a positive Integer, return its factorial, n!.
  if (mctad.isInteger(n)) {
    Γ = mctad.factorial(n - 1);
  } else {
    // If (n / 2) is a positive Integer, return the exact value using double factorials, n!!.
    if (mctad.isInteger(2 * n)) {
      Γ = (Math.sqrt(mctad.π) * mctad.doubleFactorial(n * 2 - 2) / Math.pow(2, (n * 2 - 1) / 2));
    }
  }
  return Γ;

};
