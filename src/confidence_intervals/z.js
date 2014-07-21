/*
# Z Score

The [Z Score](https://en.wikipedia.org/wiki/Z_score) is the signed number of standard deviations a datum is above or below the mean of a Standard Normal Distribution. Often it is determined from extensive tables; here it is calculated using the inverse erf function, `mcatd.inverseErf()`;

### Assumptions

`p` is a valid probability (0 < p < 1).

### Use

`mctad.z(p)`

### Inline Comments
 */

mctad.z = function (p) {
  if (p <= 0.0 || p >= 1.0) { return undefined; }

  return Math.sqrt(2) * mctad.inverseErf(2 * p - 1);

};
