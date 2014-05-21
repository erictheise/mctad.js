// core.js
var McTad = (function(pub) {

  // `ε`, epsilon, is a stopping criterion when we want to iterate until we're "close enough".
  pub.ε = 0.0001;

  // A factorial, usually written n!, is the product of all positive integers less than or equal to n.
  pub.factorial = function(n) {
    if (n < 0 ) { return null; }

    var acc = 1;
    for (var i = 2; i <= n; i++) {
      acc = acc * i;
    }
    return acc;
  }

  return pub;
}(McTad || {}));
