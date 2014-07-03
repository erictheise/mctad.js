/*
# Helpers

A small collection of helper methods.

*/

// ## isInteger(n)
// A function for determining if anything is an Integer. Used widely to validate parameters.
//
mctad.isInteger = function (n) {
  return (/^-?\d+$/.test(n));
};

// ## allPositive(Array)
// A function for determining if every element of an Array is greater than or equal to zero. Used in the determination
// of the [Geometric Mean](../statistics/geometric_mean.html).
//
mctad.allPositive = function (data) {
  var positive = true;
  for (var i = 0; i < data.length; i++) {
    if (data[i] < 0) {
      positive = false;
      break;
    }
  }
  return positive;
};

// ## extend(destination, source)
// A function used to add convenience methods to distributions, e.g., `.p(x)`, `.f(x)`, `.F(x)`.
//
mctad.extend = function (destination, source) {
  for (var k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }
  return destination;
};

// ## sortNumeric(Array)
// A function for sorting a simple Array in numerical, rather than lexicographical, order.
//
mctad.sortNumeric = function (data) {
  data.sort(function (a, b) { return a - b; });
  return data;
};

// ## toRadians(Number)
// A function for converting degrees to radians.
//
mctad.toRadians = function (v) {
  if (typeof v === 'string' || v instanceof String) {
    // If it's a string, explicitly in degrees, e.g, "47.3°", convert it to radians
    if (v.trim().slice(-1) === '°') {
      return (Math.PI/180) * parseFloat(v);
    } else {
      // If it's a string, assume it's already in radians
      return parseFloat(v);
    }
  } else {
    // If it's a number, assume it's already in radians
    return v;
  }
};

// ## getBaseLog(x, y)
// A function for returning the logarithm of y with base x (ie. log<sub>x</sub> y), taken from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log
//
// @todo: replace with Math.log10() if that becomes widely implemented as part of Harmony (ECMAScript 6)
mctad.getBaseLog = function (x, y) {
  return Math.log(y) / Math.log(x);
};

// ## getRandomArbitrary(min, max)
// A function for generating a random number between min and mix, inclusive, taken from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
mctad.getRandomArbitrary = function (min, max) {
  return Math.random() * (max - min) + min;
};

// ## getRandomInt(min, max)
// A function for generating a random integer between min and max, inclusive, taken from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
mctad.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
