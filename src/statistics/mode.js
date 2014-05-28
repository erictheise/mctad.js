// # Sample Mode

mctad.mode = function (data) {
  if (!Array.isArray(data) || data.length === 0) { return null; }

  var modes = [], frequencies = {}, max = 0;
  for (var i = 0; i < data.length; i++) {
    if (frequencies.hasOwnProperty(data[i])) {
      frequencies[data[i]]++;
    } else {
      frequencies[data[i]] = 1;
    }
    if (frequencies[data[i]] > max) { max = frequencies[data[i]]; }
  }

  for(var key in frequencies) {
    if (frequencies.hasOwnProperty(key)) {
      if (frequencies[key] === max) {
        modes.push(parseInt(key));
      }
    }
  }

  this.sortNumeric(modes);
  return modes;
};
