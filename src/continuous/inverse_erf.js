/*
# Inverse Error Function

The [Inverse Error Function](http://en.wikipedia.org/wiki/Error_function#Inverse_functions).

This approximation uses the value of `a` as 0.147 to reduce the maximum error to about 0.00012 as per
Winitzki, Sergei (6 February 2008). "A handy approximation for the error function and its inverse".
@todo: do a better job using rational Chebyshev approximations?

*/

mctad.inverseErf = function (x) {
  var a = 0.147;
  return mctad.sign(x) * Math.sqrt(
    Math.sqrt(
      Math.pow((2 / (mctad.π * a) + (Math.log(1 - Math.pow(x, 2)) / 2)), 2) - Math.log(1 - Math.pow(x, 2)) / a
    ) - ((2 / (mctad.π * a)) + Math.log(1 - Math.pow(x, 2)) / 2)
  );
};
