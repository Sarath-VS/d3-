// Common JS functions...

var translate = (x = 0, y = 0) => `translate(${x}, ${y})`


// Common D3 functions...

var createSvg = (container, klass = 'svg', width = 300, height = 300) => {
    return d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height)
        .classed(klass, true);
}
