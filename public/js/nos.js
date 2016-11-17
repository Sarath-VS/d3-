const fontScale = d3.scaleLinear()
    .domain([0, 10])
    .range(['italic bold 12px/30px Georgia, serif', 'italic bold 120px/180px Georgia, serif']);

var paint = (vals) => {
    d3.select('.container').selectAll('div')
        .data(vals)
        .enter()
        .append('div')
        .classed('box', true)
        .style('font', (d) => fontScale(d))
        .text((d) => d);
}

window.onload = () => {
    var vals = rangeOf(0, 10)
    paint(vals);
}
