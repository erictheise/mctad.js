// # Sample Standard Deviation
//

mctad.sampleStandardDeviation = function (data) {
  if (!Array.isArray(data) || data.length === 0 ) { return null; }

  return Math.sqrt(this.sampleVariance(data));

};
