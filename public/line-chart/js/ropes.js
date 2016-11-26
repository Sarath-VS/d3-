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
    .domain([0, 1])
    .range([INNER_HEIGHT, 0]);

var pxScale = (d) => _xScale(d);
var sineScale = (d) => _yScale((Math.sin(3 * d) + 1) / 2);

var xAxis = d3.axisBottom(_xScale).ticks(10).tickFormat((d) => d);
var yAxis = d3.axisLeft(_yScale).ticks(10).tickFormat((d) => d);

var inc = (() => {
    var val = -1.5;
    return () => {
        return val += .6;
    }
})()

window.onload = () => {
    var oneToTen = rangeOf(0, 9);

    for (var i = -1.5; i <= 1; i += .6) {
        var graph = createGraph(WIDTH, HEIGHT, MARGIN, xAxis, yAxis)
        addLineChart(graph, oneToTen, {
            name: 'ropes',
            margin: MARGIN,
            color: 'steelblue',
            xScale: pxScale,
            yScale: sineScale,
            curve: d3.curveCardinal.tension(i)
        });
    }

}
