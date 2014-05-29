// # Sample Variance
// Implemented using [Welford's algorithm](http://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Online_algorithm), cited by Knuth.

mctad.sampleVariance = function (data) {
  if (!Array.isArray(data) || data.length === 0 ) { return null; }

  var mean = 0.0, σ2 = 0.0, Δ, n = 0, M2 = 0.0;
  for (var i = 0; i < data.length; i++) {
    n++;
    Δ = data[i] - mean;
    mean += Δ/n;
    M2 += Δ * (data[i] - mean);
  }
  σ2 = M2/(n - 1);

  return σ2;

};
