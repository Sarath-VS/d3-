var width = 960,
    height = 600,
    cx = width / 2,
    cy = height / 2,
    totalNodes = 15,
    maxRadius = 12,
    totalClusters = 1;

// var simulation = d3.forceSimulation(nodeData)
//     .force('center', d3.forceCenter(cx, cy))
var color = d3.schemeCategory10;

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

var drawPack = (svg, data, color) => {
    var pack = d3.packSiblings(data);

    var g = svg.append('g');

    g.selectAll('circle').data(pack)
        .enter()
        .append('circle')
        .attr('r', (d) => d.r)
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
        .style('fill', color)
        .append("svg:title")
        .text((d) => d.r)
        // .call(d3.forceCenter([cx, cy]).drag())

    g.attr('transform', translate(cx, cy));
}

var nodeData = [{
    "r": 80
}, {
    "r": 55
}, {
    "r": 35
}, {
    "r": 5
}, {
    "r": 70
}, {
    "r": 25
}];

window.onload = () => {
    var svg = createSvg('.container', 'circles', width, height);

    var buttons = ['min', 'max', 'extend', 'sum', 'mean', 'median', 'quantile'];
    drawButtons(buttons);

    drawPack(svg, nodeData, 'steelblue');
    drawPack(svg, nodeData.reverse(), 'lightgray');
    // drawPack(svg, nodeData, 'rgb(110, 206, 227)');
}
