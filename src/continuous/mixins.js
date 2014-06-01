mctad.continuousMixins = {
  f: function(x) {
    return this.pdf(x);
  },
  F: function(x) {
    return this.cdf(x);
  }
};
