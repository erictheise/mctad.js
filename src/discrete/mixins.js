mctad.mixins = {
  P: function(x) {
    if (this.hasOwnProperty(x)) {
      return this[x].pmf;
    } else {
      return 0.0;
    }
  },
  F: function(x) {
    if (this.hasOwnProperty(x)) {
      return this[x].cdf;
    } else {
      if (x < this.domain.min) {
        return 0.0;
      } else {
        if (x > this.domain.max) {
          return 1.0;
        }
      }
    }
  }
};
