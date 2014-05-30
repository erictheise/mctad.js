// # Circular Standard Deviation

mctad.circularStandardDeviation = function (data) {
  // Mardia & Jupp equation (2.3.11)
  // Depends on meanResultantLength
  return Math.sqrt( -2.0 * Math.log(1 - this.meanResultantLength(data)) );
};
