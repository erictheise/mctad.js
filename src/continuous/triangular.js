// # Triangular Distribution

mctad.triangular = {
  distribution: function (a, b, c) {
    // Check that `a < c < b`.
    if (a >= b || a >= c || c >= b) { return null; }

    var probability_of_x, x, distribution_functions = {
      mean: (a + b + c)/3,
      variance: (Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2) - (a * b) - (a * c) - (b * c))/18,
      mode: c
    };

    probability_of_x = function () {
      if (a <= x && x <= c) {
        return (2 * (x - a))/((b - a ) * (c - a));
      } else {
        if (c < x && x <= b) {
          return (2 * (b - x))/((b - a ) * (b - c));
        } else {
          return 0;
        }
      }
    };
    cumulative_probability_of_x = function () {
      if (x < a) {
        return 0;
      } else {
        if (a <= x && x <= c) {
          return (Math.pow((x - a), 2))/((b - a ) * (c - a));
        } else {
          if (c < x && x <= b) {
            return 1 - ((Math.pow((b - x), 2))/((b - a ) * (b - c)));
          } else {
            return 1;
          }
        }
      }
    };
    distribution_functions[x] = {
      probability_of_x: probability_of_x,
      cumulative_probability_of_x: cumulative_probability_of_x
    };

    return distribution_functions;
  }

};
