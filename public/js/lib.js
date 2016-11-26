var rangeOf = (s, e) => [...new Array(e - s + 1)].map((d, i) => i + s);

var translate = (x, y) => `translate(${ x },${ y })`;

var curves = [
    d3.curveLinear,
    d3.curveLinearClosed,
    d3.curveStep,
    d3.curveBasis,
    d3.curveBundle.beta(.7),
    d3.curveCardinal,
    d3.curveCardinalClosed,
    d3.curveCatmullRom
]

var drawPath = (graph, datum, {klass, d}) => {
    graph.append('path')
        .classed(klass, true)
        .attr('d', d(datum));
}

var createGraph = (width, height, margin, xAxis, yAxis) => {
    var svg = d3.select('.container').append('svg')
        .attr('width', width)
        .attr('height', height);

    svg.append('g')
        .attr('transform', translate(margin, height - margin))
        .call(xAxis)
        .classed('xAxis', true);

    svg.append('g')
        .attr('transform', translate(margin, margin))
        .call(yAxis)
        .classed('yAxis', true)

    return svg;
}

var addLineChart = (graph, datum, {name, stroke, margin, xScale, yScale, curve, fill}) => {
    var g = graph.append('g')
        .attr('transform', translate(margin, margin))
        .classed(name, true);

    var line = d3.line()
        .x(xScale)
        .y(yScale)
        .curve(curve);

    drawPath(g, datum, {stroke: stroke, fill: fill, d: line});
    addMarker(g, datum, xScale, yScale);

    g.selectAll('path').exit().remove();
}

var addAreaChart = (graph, datum, {name, margin, xScale, yScale, curve}) => {
    var g = graph.append('g')
        .attr('transform', translate(margin, margin))
        .classed(name, true);

    var line = d3.line()
        .x(xScale)
        .y(yScale)
        .curve(curve);

    var area = d3.area()
        .x(xScale)
        .y0(INNER_HEIGHT)
        .y1(yScale)
        .curve(curve);

    drawPath(g, datum, {klass: 'area', d: area});
    drawPath(g, datum, {klass: 'line', d: line});
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
