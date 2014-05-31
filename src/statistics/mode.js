// # Mode
//
// `mctad.mode()` accepts an Array of Numbers and returns the numerical value(s) that appear most frequently as an Array of Numbers. If the data observations are unimodal, the mode will be returned as an Array of a single Number, not as a Number.
//
// More at the [Wikimedia article](http://en.wikipedia.org/wiki/Mode_(statistics))

mctad.mode = function (data) {
  if (!Array.isArray(data) || data.length === 0) { return null; }

  var modes = [], frequencies = {}, max = 0;
  // Iterate through the data, creating an object that counts frequencies and keeping track of the
  // maximum value.
  for (var i = 0; i < data.length; i++) {
    if (frequencies.hasOwnProperty(data[i])) {
      frequencies[data[i]]++;
    } else {
      frequencies[data[i]] = 1;
    }
    if (frequencies[data[i]] > max) { max = frequencies[data[i]]; }
  }

  // Pluck the values that have been maximally observed.
  for(var key in frequencies) {
    if (frequencies.hasOwnProperty(key)) {
      if (frequencies[key] === max) {
        modes.push(parseInt(key));
      }
    }
  }

  // Sort the modes before returning.
  this.sortNumeric(modes);
  return modes;
};
