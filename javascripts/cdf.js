var cdf = function(dist) {
  var
    margin = { top: 27, right: 15, bottom: 18, left: 30 },
    paper = { width: 480, height: 240 },
    image = { width: paper.width - margin.left - margin.right, height: paper.height - margin.top - margin.bottom },
    radius = 3.5,
    discreteWidth = 4,
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

  var yScale = d3.scale.linear()
    .domain([0, 1])
    .range([image.height, 0]);

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .ticks(10)
    .tickSize(-image.width)
    .orient('left');

  // Set up the basic svg paper.
  var svg = d3.select('#cdf')
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

  // Check whether this probability function is continuous or discrete, i.e., has f(x) or p(x).
  if (typeof dist.p === 'function') {
    // This is a discrete distribution. Begin by loading data to plot.
    for (var i = dist.domain.min; i <= dist.domain.max; i++) {
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
      var x = xScale.invert(i);
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
    var curve = d3.svg.line()
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
    .datum(data)
    .attr('class', 'sweep');

  // Set up to plot a circle to mark the point of interest on F(X).
  focus.append('circle')
    .datum(data)
    .attr('r', radius);

  svg.append('rect')
    .attr('class', 'overlay')
    .attr('width', image.width)
    .attr('height', image.height)
    .on('mouseover', mouseover)
    .on('mouseout', mouseout)
    .on('mousemove', mousemove);

  // Set up and hide the information bubble.
  var bubble = d3.select('body')
    .append('div')
    .attr('class', 'bubble')
    .style('opacity', 0);

  // Display the sweep and fade in the bubble on mouseover.
  function mouseover() {
    focus.style('display', null);
    bubble.transition()
      .duration(600)
      .style('opacity', 1);
  }

  // Hide the sweep and fade out the bubble on mouseout.
  function mouseout() {
    focus.style('display', 'none');
    bubble.transition()
      .duration(60)
      .style('opacity', 0);
  }

  // Place the sweep and bubble containing the caption.
  function mousemove() {
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
      y0 = yScale(data[x0].y);
      caption = 'P(X ≤ ' + sigDigits(xScale.invert(x0)) + ') = ' + sigDigits(data[x0].y);
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
      .style('left', (d3.event.pageX - 72) + "px")
      .style('top', (d3.event.pageY - 36) + "px")
      .text(caption);
  }

};
