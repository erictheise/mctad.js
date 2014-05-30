// # Sample Median

mctad.median = function (data) {
  if (!Array.isArray(data) || data.length === 0) { return null; }

  this.sortNumeric(data);
  if (data.length % 2 === 0) {
    return (data[data.length/2 - 1] + data[data.length/2])/2;
  } else {
    return data[(data.length + 1)/2 - 1];
  }

};
