var _pie = d3.pie().sort(null).value((d) => d);

var _half_pie = d3.pie().sort(null).value((d) => d).startAngle(0)
    .endAngle(Math.PI);

var color = d3.schemeCategory20;

var createSvg = (el, width, height, klass) => {
    return d3.select(el).append('svg')
        .attr('width', width)
        .attr('height', height)
        .classed(klass, true)
        .append('g')
        .attr('transform', translate(width / 2, height / 2));
}

var arc = (innerRadius, outerRadius) => {
    return d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
}

var drawPie = (data, options) => {
    var svg = createSvg('.container', options.width, options.height, 'pie-chart');

    var g = svg.selectAll('g')
        .data(options.pie(data))
        .enter()
        .append('g')
        .classed('arc', true);

    g.append('path')
        .style('fill', (d, i) => color[i])
        .attr('d', arc(options.innerRadius, options.outerRadius))
}

window.onload = () => {
    var [width, height] = [600, 600];
    var radius = Math.min(height, width) / 2;
    var data = [1, 1, 2, 2, 1, 2, 1];

    var options = {
        el: '.container',
        height: height,
        width: width,
        innerRadius: 0,
        outerRadius: radius,
        pie: _pie
    }

    drawPie(data, options);

    options.innerRadius = 200;
    drawPie(data, options);

    options.pie = _half_pie;
    drawPie(data, options);
}
