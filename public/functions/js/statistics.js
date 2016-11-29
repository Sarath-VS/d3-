var [HEIGHT, WIDTH] = [600, 1280];

var color = d3.schemeCategory10;

var translate = (x) => `translate(${x})`

var xScale = d3.scaleLinear().domain([0, 100]).range([WIDTH, 0]);

var drawButtons = (data) => {
    d3.select('.menu').selectAll('button')
        .data(data)
        .enter()
        .append('button')
        .classed('item', true)
        .text((d) => d)
        .style('background-color', (_, i) => color[i])
        // .attr('onclick', (d) => )
}

var drawCircles = (data) => {
    var g = d3.select('.container').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .append('g')
        .classed('circles', true);

    var circles = g.selectAll('circle').data(data, (d) => d)
        .enter()
        .append('circle')
        .classed('circle', true)
        .attr('r', (d) => d)
        .attr('fill', (_, i) => color[i])
        .attr('cx', (d) => WIDTH / 2)
        .attr('cy', HEIGHT / 2)

    circles.attr('transform', (d) => translate(xScale(d)));
    circles.exit().remove();
}

window.onload = () => {
    var data = [10, 40, 30, 99, 55, 36, 78, 20, 65, 100];

    var buttons = ['min', 'max', 'extend', 'sum', 'mean', 'median', 'quantile'];
    drawButtons(buttons);

    drawCircles(data);
}
