// # Circular Variance

mctad.circularVariance = function (data) {
  // Mardia & Jupp equation (2.3.3)
  // Depends on meanResultantLength
  return 1 - this.meanResultantLength(data);
};
