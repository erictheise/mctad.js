/*

# Double Factorial

The [Double Factorial](http://en.wikipedia.org/wiki/Double_factorial) is the product of all the odd integers up to a
specified odd positive integer. The mathematical notation is `n!!`.

### Assumptions

`n` is an odd positive Integer.

### Use

`mctad.doubleFactorial(n)`

### Inline Comments
*/

//mctad.doubleFactorial = function(n) {
//  if (!mctad.isInteger(n) || n % 2 === 0) { return undefined; }
//
//  var acc = 1;
//  for (var i = 1; i <= n; i += 2) {
//    acc = acc * i;
//  }
//  return acc;
//
//};

mctad.doubleFactorial = function(n) {
  if (!mctad.isInteger(n) || n % 2 === 0) { return undefined; }

  var acc;

  if (n > 0) {
    if (n > 1) {
      acc = n * mctad.doubleFactorial(n - 2);
    } else {
      acc = 1;
    }
    return acc;
  } else {
    if (n < 0) {
      if (n < -1) {
        acc = mctad.doubleFactorial(n + 2) / (n + 2);
      } else {
        acc = 1;
      }
    }
    return acc;
  }

};
