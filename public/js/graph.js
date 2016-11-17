const WIDTH = 600,
    HEIGHT = 600,
    MARGIN = 50,
    INNER_WIDTH = WIDTH - 2 * MARGIN,
    INNER_HEIGHT = HEIGHT - 2 * MARGIN,
    DEFAULT_SCALE = [0, 10];

const _xScale = d3.scaleLinear()
    .domain(DEFAULT_SCALE)
    .range([0, INNER_WIDTH]);

const _yScale = d3.scaleLinear()
    .domain(DEFAULT_SCALE)
    .range([INNER_HEIGHT, 0]);

var createGraph = () => {
    var svg = d3.select('.container').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    var xAxis = d3.axisBottom(_xScale).ticks(10).tickFormat((d) => d / 10);
    var yAxis = d3.axisLeft(_yScale).ticks(10).tickFormat((d) => d / 10);

    svg.append('g')
        .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
        .call(xAxis)
        .classed('xAxis', true);

    svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .call(yAxis)
        .classed('yAxis', true)

    return svg;
}

var addLineChart = (graph, datum, name, xScale, yScale) => {
    var g = graph.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .classed(name, true);

    var line = d3.line()
        .x(xScale)
        .y(yScale);

    g.append('path')
        .classed('path', true)
        .attr('d', line(datum));

    addMarker(g, datum, xScale, yScale);

    g.selectAll('path').exit().remove();
}

var addMarker = (graph, datum, xScale, yScale) => {
    graph.selectAll('marker')
        .data(datum)
        .enter().append('circle')
        .classed('marker', true)
        .attr('r', 5)
        .attr('cx', xScale)
        .attr('cy', yScale);
}

var toggleMarker = (() => {
    var enabled = true;
    return () => {
        var markers = d3.selectAll('.marker');
        enabled ? markers.attr('visibility', 'hidden') : markers.attr('visibility', 'visible');
        enabled = !enabled;
    }
})()

var nxScale = ([x, y]) => _xScale(x);
var nyScale = ([x, y]) => _yScale(y);
var pxScale = (d) => _xScale(d);
var sineScale = (d) => _yScale(Math.sin(d) + 5);

window.onload = () => {
    var points = [
        [0, 5],
        [1, 9],
        [2, 7],
        [3, 5],
        [4, 3],
        [6, 4],
        [7, 2],
        [8, 3],
        [9, 2]
    ];
    var oneToTen = rangeOf(0, 10);

    var graph = createGraph();
    addLineChart(graph, points, 'points', nxScale, nyScale);
    addLineChart(graph, oneToTen, 'sine', pxScale, sineScale)
}
