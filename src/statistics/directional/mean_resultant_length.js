// # Mean Resultant Length

mctad.mean_resultant_length = function (data) {
  // The mean_resultant_length of no angles is null
  if (data.length === 0 ) return null;

  // Mardia & Jupp equation (2.2.4)
  var c_bar, s_bar, r_bar, acc = { c: 0, s : 0 };
  for (i = 0; i < data.length; i++) {
    acc.c += Math.cos(this.toRadians(data[i]));
    acc.s += Math.sin(this.toRadians(data[i]));
  }
  c_bar = (acc.c / data.length);
  s_bar = (acc.s / data.length);
  r_bar = Math.sqrt(Math.pow(c_bar, 2) + Math.pow(s_bar, 2));
  return r_bar;
};
