var pmf = function(dist) {
  var
    margin = { top: 27, right: 15, bottom: 18, left: 30 },
    paper = { width: 480, height: 240 },
    image = { width: paper.width - margin.left - margin.right, height: paper.height - margin.top - margin.bottom },
    radius = 3.5,
    halfInterval = (0.5 * image.width / (dist.domain.max - dist.domain.min + 1)),
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
    .domain([dist.range.min, dist.range.max])
    .range([image.height, 0]);

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .ticks(10)
    .tickSize(-image.width)
    .orient('left');

  // Set up the basic svg paper.
  var svg = d3.select('#pmf')
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

  // Load the data to plot.
  for (var i = dist.domain.min; i <= dist.domain.max; i++) {
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
    .on('mouseover', mouseover)
    .on('mouseout', mouseout)
    .on('mousemove', mousemove)
  ;

  // Set up and hide the information bubble.
  var bubble = d3.select('body')
    .data(data)
    .append('div')
    .attr('class', 'bubble')
    .style('opacity', 0);

  // Fade in the bubble on mouseover.
  function mouseover() {
    bubble.transition()
      .duration(200)
      .style('opacity', 1);
  }

  // Fade out the bubble on mouseout.
  function mouseout() {
    bubble.transition()
      .duration(60)
      .style('opacity', 0);
  }

  // Place the bubble containing the caption.
  function mousemove() {
    var
      x0 = d3.mouse(this)[0],
      y0,
      sigDigits = d3.format(".4f"),
      caption = '';

    y0 = yScale(dist.p([Math.floor(xScale.invert(x0))]));
    caption = 'P(X = ' + Math.round(xScale.invert(x0)) + ') = ' + sigDigits(dist.p([Math.round(xScale.invert(x0))]));

    bubble
      .style('display', null)
      .style('left', (d3.event.pageX - 64) + "px")
      .style('top', (d3.event.pageY - 36) + "px")
      .text(caption);
  }

};
