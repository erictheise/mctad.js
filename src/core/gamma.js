// A factorial, usually written n!, is the product of all positive integers less than or equal to n.
mctad.factorial = function(n) {
  if (n < 0) { return null; }

  var acc = 1;
  for (var i = 2; i <= n; i++) {
    acc = acc * i;
  }
  return acc;
};
