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

var pxScale = (d) => _xScale(d);
var sineScale = (d) => _yScale(3 * Math.sin(d) + 5);

var xAxis = d3.axisBottom(_xScale).ticks(10).tickFormat((d) => d / 10);
var yAxis = d3.axisLeft(_yScale).ticks(10).tickFormat((d) => d / 10);

window.onload = () => {
    var oneToTen = rangeOf(0, 10);
    curves.forEach((curve) => {
        var graph = createGraph(WIDTH, HEIGHT, MARGIN, xAxis, yAxis);
        var options = {
            name: 'area',
            margin: MARGIN,
            xScale: pxScale,
            yScale: sineScale,
            curve: curve,
        };
        addAreaChart(graph, oneToTen, options);
    })
}
