// A, hopefully small, collection of helper methods.

mctad.isInteger = function (n) {
  return (/^-?\d+$/.test(n));
};

mctad.extend = function (destination, source) {
  for (var k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }
  return destination;
};

mctad.sortNumeric = function (data) {
  data.sort(function (a, b) { return a - b; });
  return data;
};
