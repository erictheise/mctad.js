// # Sum

mctad.sum = function (data) {
  if (!Array.isArray(data) || data.length === 0 ) { return null; }

  var sum = 0.0;
  for (var i = 0; i < data.length; i++) {
    sum += data[i];
  }
  return sum;

};
