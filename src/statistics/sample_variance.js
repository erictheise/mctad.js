// # Sample Variance
//
// `mctad.sampleVariance()` accepts an Array of Numbers assumed to be a sample and returns their variance as a Number.
//
// Implemented using [Welford's algorithm](http://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Online_algorithm), cited by Knuth.
//
// More at the [Wikipedia article](http://en.wikipedia.org/wiki/Variance#Sample_variance).

mctad.sampleVariance = function (data) {
  if (!Array.isArray(data) || data.length === 0 ) { return undefined; }

  var mean = 0.0, σ2 = 0.0, Δ, n = 0, M2 = 0.0;
  for (var i = 0; i < data.length; i++) {
    n++;
    Δ = data[i] - mean;
    mean += Δ/n;
    M2 += Δ * (data[i] - mean);
  }
  // Use [Bessel's correction](http://en.wikipedia.org/wiki/Bessel%27s_correction) since this is sample variance.
  σ2 = M2/(n - 1);

  return σ2;

};
