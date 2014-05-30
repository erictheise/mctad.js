// A, hopefully small, collection of helper methods.

mctad.isInteger = function (n) {
  return (/^-?\d+$/.test(n));
};

mctad.allPositive = function (data) {
  var positive = true;
  for (var i = 0; i < data.length; i++) {
    if (data[i] < 0) {
      positive = false;
      break;
    }
  }
  console.log(i);
  return positive;
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
