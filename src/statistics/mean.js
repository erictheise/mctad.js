// # Sample Mean

mctad.mean = function (data) {
  if (!Array.isArray(data) || data.length === 0) { return null; }

  return this.sum(data)/data.length;

};
