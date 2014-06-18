var pmf = function(dist) {
  var
    margin = { top: 27, right: 15, bottom: 18, left: 30 },
    paper = { width: 480, height: 240 },
    image = { width: paper.width - margin.left - margin.right, height: paper.height - margin.top - margin.bottom },
    discreteWidth = 4,
    halfInterval,
    data = [];

for (var i = dist.domain.min; i <= dist.domain.max; i++) {
  data.push([i, dist.p(i)]);
}
halfInterval = (0.5 * image.width / (dist.domain.max - dist.domain.min + 1));

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

var svg = d3.select('body')
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

svg.selectAll('dot')
  .data(data)
  .enter().append('circle')
  .attr('class', 'dot')
  .attr('r', 3.5)
  .attr('cx', function (d) { return xScale(d[0]); })
  .attr('cy', function (d) { return yScale(d[1]); })
;

};
