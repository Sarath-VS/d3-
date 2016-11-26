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

    curves.forEach((curve) => {
        var xAxis = d3.axisBottom(_xScale).ticks(10).tickFormat((d) => d / 10);
        var yAxis = d3.axisLeft(_yScale).ticks(10).tickFormat((d) => d / 10);

        var graph = createGraph(WIDTH, HEIGHT, MARGIN, xAxis, yAxis)
        addLineChart(graph, points, {
            name: 'points',
            margin: MARGIN,
            color: 'brown',
            xScale: nxScale,
            yScale: nyScale,
            curve: curve
        });
        addLineChart(graph, oneToTen, {
            name: 'sine',
            color: 'steelblue',
            margin: MARGIN,
            xScale: pxScale,
            yScale: sineScale,
            curve: curve
        })
    })
}
