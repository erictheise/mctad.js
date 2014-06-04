/*
# Error Function

The [Error Function](http://en.wikipedia.org/wiki/Error_function) (also called the Gauss error function) is a special function of sigmoid shape which occurs in probability, statistics and partial differential equations. It is used in the calculation of `mcatd.normal()` and `mctad.lognormal()`.

The implementation of the erf uses [Abramowitz and Stegun's approximation 7.1.28](http://en.wikipedia.org/wiki/Error_function#Approximation_with_elementary_functions), which in turn comes from C. Hastings, Jr., Approximations for Digital Computers, Princeton University Press, NJ, 1955.
*/

mctad.erf = function (x) {
  return 1 - (1 / Math.pow(1 + 0.0705230784 * x + 0.0422820123 * Math.pow(x, 2) + 0.0092705272 * Math.pow(x, 3) + 0.0001520143 * Math.pow(x, 4) + 0.0002765672 * Math.pow(x, 5) + 0.0000430638 * Math.pow(x, 6), 16));
};
