var width = 960,
    height = 960,
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

var drawPack = (svg, root, color) => {
    var g = svg.append('g');
    var pack = d3.pack()
        .size([width / 2 - 4, width / 2 - 4]);

    root = d3.hierarchy(root)
        .sum(function(d) {
            return d.r;
        })
        .sort(function(a, b) {
            return b.value - a.value;
        });

    var node = g.selectAll('.node')
        .data(pack(root).descendants())
        .enter().append('g')
        .attr('class', function(d) {
            return d.children ? 'node' : 'leaf node';
        })
        .attr('transform', function(d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        });

    node.append('circle')
        .attr('r', function(d) {
            return d.r;
        });

    // var g = svg.append('g');
    //
    // g.selectAll('circle').data(pack)
    //     .enter()
    //     .append('circle')
    //     .attr('r', (d) => d.r)
    //     .attr('cx', (d) => d.x)
    //     .attr('cy', (d) => d.y)
    //     .style('fill', color)
    //     .append('svg:title')
    //     .text((d) => d.r)
    //     // .call(d3.forceCenter([cx, cy]).drag())
    //
    // g.attr('transform', translate(cx, cy));
}

window.onload = () => {
    var svg = createSvg('.container', 'circles', width, height);

    var buttons = ['min', 'max', 'extend', 'sum', 'mean', 'median', 'quantile'];
    drawButtons(buttons);

    d3.json('data/circles.json', (err, data) => drawPack(svg, data, 'steelblue'))
}
