var plot = function (dist, plot, options) {

  if (typeof options === 'undefined') { options = {}; }

  var
    i, x, n,
    curve,
    stats, bubble, sigDigits = d3.format(".4f"),
    divToAppend = options.hasOwnProperty('divToAppend') ? options.divToAppend : '#plot',
    margin = { top: 27, right: 18, bottom: 18, left: 30 },
    paper = { width: 480, height: 240 },
    image = { width: paper.width - margin.left - margin.right, height: paper.height - margin.top - margin.bottom },
    radius = 3.5,
    halfInterval = (0.5 * image.width / (Math.floor(dist.domain.max) - Math.ceil(dist.domain.min) + 1)),
    data = [];

  var xScale = d3.scale.linear()
    .domain([dist.domain.min, dist.domain.max])
    .range([halfInterval, image.width - halfInterval]);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .ticks(dist.domain.max - dist.domain.min)
    .tickSize(-image.height)
    .tickPadding(6)
    .orient('bottom');

  var yScale;
  switch (plot) {
    case 'cdf':
      yScale = d3.scale.linear()
        .domain([0, 1])
        .range([image.height, 0]);
      break;

    // default handles 'pmf', 'pdf', and 'gen' cases.
    default:
    yScale = d3.scale.linear()
      .domain([dist.range.min, dist.range.max])
      .range([image.height, 0]);
    break;
  }

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .ticks(10)
    .tickSize(-image.width)
    .orient('left');

  // Set up the basic svg paper.
  var svg = d3.select(divToAppend)
    .append('svg')
    .attr('width', paper.width)
    .attr('height', paper.height)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Paint in the background grid that will be painted over by ticks of full width and height.
  svg.append('rect')
    .attr('class', 'backgrid')
    .attr('width', image.width)
    .attr('height', image.height);

  // Paint the vertical ticks across the paper.
  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,' + image.height + ')')
    .call(xAxis);

  // Paint the horizontal ticks across the paper.
  svg.append('g')
    .attr('class', 'axis')
    .call(yAxis);

  // Extract the generator parameter, if it's a 'gen' plot.
  if (plot.search(/^gen/) > -1) {
    n = parseInt(plot.match(/\d+/));
    plot = 'gen';
  }

  switch (plot) {

    case 'pmf':
    case 'gen':
      for (i = dist.domain.min; i <= dist.domain.max; i++) {
        data.push([i, dist.p(i)]);
      }

      // Plot the data.
      svg.selectAll('dot')
        .data(data)
        .enter().append('circle')
        .attr('class', 'dot')
        .attr('r', radius)
        .attr('cx', function (d) { return xScale(d[0]); })
        .attr('cy', function (d) { return yScale(d[1]); })
      ;

      // Provide invisible circular svg overlays that will respond to the mouse.
      svg.selectAll('target')
        .data(data)
        .enter().append('circle')
        .attr('class', 'overlay')
        .attr('r', halfInterval)
        .attr('cx', function (d) { return xScale(d[0]); })
        .attr('cy', function (d) { return yScale(d[1]); })
        .on('mouseover', pmf_mouseover)
        .on('mouseout', pmf_mouseout)
        .on('mousemove', pmf_mousemove)
      ;

      // Set up the stats.
      stats = d3.select(divToAppend)
        .data(data)
        .append('div')
        .attr('class', 'stats')
        .style('margin-top', margin.top + 'px')
        .html(
          'mean: ' + dist.mean + '<br />' +
          'median: ' + dist.median + '<br />' +
          'mode: ' + dist.mode + '<br />' +
          'variance: ' + dist.variance + '<br />' +
          'skewness: ' + dist.skewness + '<br />' +
          'entropy: ' + dist.entropy + '<br />'
        );

      // Set up and hide the information bubble.
      bubble = d3.select('body')
        .data(data)
        .append('div')
        .attr('class', 'bubble')
        .style('opacity', 0);

      // Fade in the bubble on mouseover.
      function pmf_mouseover() {
        bubble.transition()
          .duration(200)
          .style('opacity', 1);
      }

      // Fade out the bubble on mouseout.
      function pmf_mouseout() {
        bubble.transition()
          .duration(60)
          .style('opacity', 0);
      }

      // Place the bubble containing the caption.
      function pmf_mousemove() {
        var
          x0 = d3.mouse(this)[0],
          y0,
          caption = '';

        y0 = yScale(dist.p([Math.floor(xScale.invert(x0))]));
        caption = 'P(X = ' + Math.round(xScale.invert(x0)) + ') = ' + sigDigits(dist.p([Math.round(xScale.invert(x0))]));

        bubble
          .style('display', null)
          .style('left', (d3.event.pageX - 64) + 'px')
          .style('top', (d3.event.pageY - 36) + 'px')
          .text(caption);
      }

      if (plot === 'gen') {
        // Actually generate n random variables from the specified distribution.
        var random_variables = dist.generate(n), random_variables_xy = [], frequencies = {}, max = 0;

        // Iterate through the array of random variables data, creating an array that can be plotted, an object that counts frequencies,
        // and keeping track of the maximum value.
        for (i = 0; i < random_variables.length; i++) {
          if (frequencies.hasOwnProperty(random_variables[i])) {
            frequencies[random_variables[i]]++;
          } else {
            frequencies[random_variables[i]] = 1;
          }
          if (frequencies[random_variables[i]] > max) { max = frequencies[random_variables[i]]; }
          random_variables_xy.push([random_variables[i], frequencies[random_variables[i]]]);
        }

        var y2Scale = d3.scale.linear()
          .domain([0, max])
          .range([image.height, 0]);

        var y2Axis = d3.svg.axis()
          .scale(y2Scale)
          .ticks(10)
          .tickSize(-image.width)
          .orient('right');

        svg.append('g')
          .attr('class', 'rightAxis')
          .attr('transform', 'translate(' + image.width + ', 0)')
          .call(y2Axis);

        function update(data) {
          var rv = svg.selectAll('rv')
            .data(data)
            .enter().append('circle')
            .attr('class', 'rv')
            .attr('r', 0.8 * radius)
            .attr('cx', function (d) { return xScale(d[0]); })
            .attr('cy', function (d) { return y2Scale(d[1]); });
        }

      i = 0;
      setInterval(function () {
        if (i < n) {
          update([random_variables_xy[i]]);
          i++;
        }
      }, 80);

      }

      break;

    case 'pdf':

      // Load the data to plot.
      for (i = 0; i <= Math.ceil(image.width); i++) {
        x = xScale.invert(i);
        if ((dist.f(x) !== 0 || x >= dist.domain.min) && (dist.f(x) !== 0 || x <= dist.domain.max) && (typeof dist.f(x) !== 'undefined')) {
          data.push({ x: x, y: dist.f(x) })
        }
      }

      curve = d3.svg.line()
        .x(function(d) { return xScale(d.x); })
        .y(function(d) { return yScale(d.y); });

      svg.append('path')
        .datum(data)
        .attr('class', 'curve')
        .attr('d', curve);
      break;

    case 'cdf':

      // Check whether this probability function is continuous or discrete, i.e., has f(x) or p(x).
      if (typeof dist.p === 'function') {
        // This is a discrete distribution. Begin by loading data to plot.
        for (i = dist.domain.min; i <= dist.domain.max; i++) {
          data.push([i, dist.F(i)]);
        }

        // "Traces" are the line segments that extend to the right of one discrete value to the beginning
        // of the next. They factor in the radius of the dot marker to show the discontinuity and
        // otherwise look nice.
        svg.selectAll('trace')
          .data(data)
          .enter().append('line')
          .attr('class', 'trace')
          .attr('x1', function (d) { return xScale(d[0]) + radius; })
          .attr('y1', function (d) { return yScale(d[1]); })
          .attr('x2', function (d) {
            if (d[0] !== dist.domain.max) {
              return xScale(d[0] + 1) - radius;
            } else {
              return xScale(dist.domain.max + 0.5);
            }
          })
          .attr('y2', function (d) { return yScale(d[1]); });

        // "Start" is the small line segment that extends from the left edge of the image to F(0).
        svg.selectAll('start')
          .data(data)
          .enter().append('line')
          .attr('class', 'start')
          .attr('x1', function (d) { return xScale(dist.domain.min - 0.5); })
          .attr('y1', function (d) { return yScale(0); })
          .attr('x2', function (d) { return xScale(dist.domain.min) - radius; })
          .attr('y2', function (d) { return yScale(0); });

        // "Dots" mark the actual values for F(X).
        svg.selectAll('dot')
          .data(data)
          .enter().append('circle')
          .attr('class', 'dot')
          .attr('r', radius)
          .attr('cx', function (d) { return xScale(d[0]); })
          .attr('cy', function (d) { return yScale(d[1]); });

        // End discrete distribution plotting.

      } else {
        // This is a continuous distribution. Begin by loading data to plot.
        for (i = 0; i <= Math.ceil(image.width); i++) {
          x = xScale.invert(i);
          if (typeof dist.F(x) !== 'undefined') {
            data.push({ x: x, y: dist.F(x) })
          }
        }

        // Provide a method for, and append, the area under the curve.
        var area = d3.svg.area()
          .x(function (d) { return xScale(d.x); })
          .y0(function (d) { return yScale(d.y); })
          .y1(function (d) { return image.height; });

        svg.append('path')
          .datum(data)
          .attr('class', 'areaUnderTheCurve')
          .attr('d', area);

        // Provide a method for, and append, the curve itself.
        curve = d3.svg.line()
          .x(function (d) { return xScale(d.x); })
          .y(function (d) { return yScale(d.y); });

        svg.append('path')
          .datum(data)
          .attr('class', 'curve')
          .attr('d', curve);

        // End continuous distribution plotting.

      }

      // Provide an invisible svg overlay that will respond to the mouse.
      var focus = svg.append('g')
        .attr('class', 'focus')
        .style('display', 'none');

      // Set up to plot a line downward from F(X) to the baseline.
      focus.append('line')
        .attr('class', 'sweep');

      // Set up to plot a circle to mark the point of interest on F(X).
      focus.append('circle')
        .attr('r', radius);

      svg.append('rect')
        .attr('class', 'overlay')
        .attr('width', image.width)
        .attr('height', image.height)
        .on('mouseover', cdf_mouseover)
        .on('mouseout', cdf_mouseout)
        .on('mousemove', cdf_mousemove);

      // Set up and hide the information bubble.
      bubble = d3.select('body')
        .append('div')
        .attr('class', 'bubble')
        .style('opacity', 0);

      // Display the sweep and fade in the bubble on mouseover.
      function cdf_mouseover() {
        focus.style('display', null);
        bubble.transition()
          .duration(600)
          .style('opacity', 1);
      }

      // Hide the sweep and fade out the bubble on mouseout.
      function cdf_mouseout() {
        focus.style('display', 'none');
        bubble.transition()
          .duration(60)
          .style('opacity', 0);
      }

      // Place the sweep and bubble containing the caption.
      function cdf_mousemove() {
        var
          x0 = d3.mouse(this)[0],
          y0,
          sigDigits = d3.format(".4f"),
          caption = '';
        // For discrete distributions, account for F(X) being a step function.
        if (typeof dist.p === 'function') {
          y0 = yScale(dist.F([Math.floor(xScale.invert(x0))]));
          caption = 'P(X ≤ ' + Math.ceil(xScale.invert(x0)) + ') = ' + sigDigits(dist.F([Math.floor(xScale.invert(x0))]));
        } else {
          y0 = yScale(dist.F(xScale.invert(x0)));
          caption = 'P(X ≤ ' + sigDigits(xScale.invert(x0)) + ') = ' + sigDigits(dist.F(xScale.invert(x0)));
        }
        focus.select('line')
          .attr('x1', function (d) { return x0; })
          .attr('y1', function (d) { return y0; })
          .attr('x2', function (d) { return x0; })
          .attr('y2', function (d) { return image.height; });
        focus.select('circle')
          .attr('cx', function (d) { return x0; })
          .attr('cy', function (d) { return y0; });
        bubble
          .style('display', null)
          .style('left', (d3.event.pageX - 72) + 'px')
          .style('top', (d3.event.pageY - 36) + 'px')
          .text(caption);
      }
      break;

    }

};
