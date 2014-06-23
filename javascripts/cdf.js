var cdf = function(dist) {
  var
    margin = { top: 27, right: 15, bottom: 18, left: 30 },
    paper = { width: 318, height: 240 },
    image = { width: paper.width - margin.left - margin.right, height: paper.height - margin.top - margin.bottom },
    radius = 3.5,
    discreteWidth = 4,
    halfInterval,
    data = [];

  halfInterval = (0.5 * image.width / (Math.floor(dist.domain.max) - Math.ceil(dist.domain.min) + 1));

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

  var svg = d3.select('#cdf')
    .append('svg')
    .attr('width', paper.width)
    .attr('height', paper.height)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  svg.append('rect')
    .attr('class', 'backgrid')
    .attr('width', image.width)
    .attr('height', image.height);

  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,' + image.height + ')')
    .call(xAxis);

  svg.append('g')
    .attr('class', 'axis')
    .call(yAxis);

  // Check whether this probability function is continuous — has f(x) — or discrete — has p(x)
  if (typeof dist.p === 'function') {
    for (var i = dist.domain.min; i <= dist.domain.max; i++) {
      data.push([i, dist.F(i)]);
    }

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

    svg.append('line')
      .attr('class', 'start')
      .attr('x1', function (d) { return xScale(dist.domain.min - 0.5); })
      .attr('y1', function (d) { return yScale(0); })
      .attr('x2', function (d) { return xScale(dist.domain.min) - radius; })
      .attr('y2', function (d) { return yScale(0); });

    svg.selectAll('dot')
      .data(data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('r', radius)
      .attr('cx', function (d) { return xScale(d[0]); })
      .attr('cy', function (d) { return yScale(d[1]); })

  } else {
    for (i = 0; i <= Math.ceil(image.width); i++) {
      var x = xScale.invert(i);
      if (typeof dist.F(x) !== 'undefined') {
        data.push({ x: x, y: dist.F(x) })
      }
    }

    var line = d3.svg.line()
      .x(function (d) { return xScale(d.x); })
      .y(function (d) { return yScale(d.y); });

    var area = d3.svg.area()
      .x(function (d) { return xScale(d.x); })
      .y0(function (d) { return yScale(d.y); })
      .y1(function (d) { return image.height; });

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line);

    svg.append('path')
      .datum(data)
      .attr('class', 'area')
      .attr('d', area);
  }

};
