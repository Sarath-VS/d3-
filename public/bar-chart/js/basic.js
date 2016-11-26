const WIDTH = 1415,
    HEIGHT = 600;


var random = (max) => Math.round(Math.random() * max);
var key = (value) => new Date() + value;

var createChart = (datum) => {
    var color = d3.scaleLinear()
        .domain([1, 10])
        .range(['lightsteelblue', 'steelblue']);

    var val = d3.scaleLinear()
        .domain([1, 10])
        .range([50, 500]);

    var bars = d3.select('.container').selectAll('div').data(datum)//, (d) => key(d));

    bars.enter().append('div')

    bars.classed('bar', true)
        .style('width', (d) => `${ val(d) }px`)
        .style('background-color', (d) => color(d))
        .text((d) => d);

    bars.exit().remove();
}

window.onload = () => {
    var data = [3, 8, 4, 9, 7, 5, 9, 10, 1];

    createChart(data);
    setInterval(() => {
        data.push(random(10) + 1);
        data.shift();
        createChart(data);
    }, 1000)
}
