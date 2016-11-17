const WIDTH = 1415,
    HEIGHT = 600,
    MARGIN = 30,
    INNER_WIDTH = WIDTH - 2 * MARGIN,
    INNER_HEIGHT = HEIGHT - 2 * MARGIN,
    DEFAULT_SCALE = [0, 50];

var randomArray = (length, max) => [...new Array(length)].map((_, i) => ({
    'k': i,
    'v': Math.round(Math.random() * max)
}));
var random = (max) => Math.round(Math.random() * max);
var translate = (x, y) => "translate(" + x + "," + y + ")";
var rotate = (arr, val) => {
    arr.shift();
    arr.push(val);
}

var _xScale, _yScale;
var _lineData, _barData;

var createChart = (container, type) => {
    var svg = d3.select(container).append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .classed(type, true);

    _xScale = d3.scaleLinear()
        .domain(DEFAULT_SCALE)
        .range([0, INNER_WIDTH]);

    _yScale = d3.scaleLinear()
        .domain(DEFAULT_SCALE)
        .range([INNER_HEIGHT, 0]);

    var xAxis = d3.axisBottom(_xScale).ticks(12);
    var yAxis = d3.axisLeft(_yScale).ticks(10);

    svg.append('g')
        .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
        .call(xAxis)
        .classed('xAxis', true);

    svg.selectAll('.xAxis .tick')
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', -INNER_HEIGHT)
        .classed('grid', true);

    svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .classed('yAxis', true)
        .call(yAxis);

    svg.selectAll('.yAxis .tick')
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', INNER_WIDTH)
        .attr('y2', 0)
        .classed('grid', true);

    svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .classed('group', true);
}

var updateLineChart = (value, id) => {
    rotate(_lineData, value);
    var g = d3.select(id).select('.group');
    g.selectAll('path').size() || g.append('path');

    var line = d3.line()
        .x((d, i) => _xScale(i))
        .y((d, i) => _yScale(d.v))
        .curve(d3.curveCatmullRom.alpha(0.5));

    g.selectAll('path')
        .classed('path', true)
        .attr('d', line(_barData))

    g.selectAll('path').exit().remove();
}

var updateBarChart = (value, id) => {
    rotate(_barData, value);
    var g = d3.select(id).select('.group');

    var bars = g.selectAll('rect').data(_barData, (d) => d.k);

    bars.attr('x', (d, i) => _xScale(i));

    bars.enter()
        .append('rect')
        .classed('bar', true)
        .attr('x', (d, i) => _xScale(i))
        .attr('y', (d, i) => _yScale(d.v))
        .attr('width', 10)
        .attr('height', (d, i) => INNER_HEIGHT - _yScale(d.v))

    bars.exit().remove();
}

window.onload = () => {
    var length = 50;
    [_lineData, _barData] = [randomArray(length, 50), randomArray(length, 50)]

    createChart('.container', 'line-chart');
    createChart('.container', 'bar-chart');

    setInterval(() => {
        var val = {
            'k': length++,
            'v': random(45)
        };
        updateLineChart(val, '.line-chart');
        updateBarChart(val, '.bar-chart')
    }, 500);
}
