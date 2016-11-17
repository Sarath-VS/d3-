const [WIDTH, HEIGHT] = [100, 100];

var createShape = (svg, shape, attrs) => {
    var shape = svg.append(shape);
    Object.entries(attrs).forEach(
        ([attr, value]) => shape.attr(attr, value)
    );
    return shape;
}

var drawLine = (svg) => {
    return createShape(svg, 'line', {x1: 0, y1: HEIGHT, x2: WIDTH, y2: 0, stroke: 'gray', class: 'shape'});
}

var drawCircle = (svg) => {
    return createShape(svg, 'circle', {cx: WIDTH/2, cy: HEIGHT/2, r: WIDTH/2, stroke: 'red', class: 'shape'});
}

var drawRect = (svg) => {
    return createShape(svg, 'rect', {x: 0, y: 0, width: WIDTH, height: HEIGHT, stroke: 'steelblue', class: 'shape'});
}

var drawTriangle = (svg) => {
    return createShape(svg, 'polygon', {points: `0,${HEIGHT} ${WIDTH/2},0 ${WIDTH},${HEIGHT}`, stroke: 'green', class: 'shape'});
}

var transform = (shape, x) => {
  shape.attr('transform', `translate(${ x })`)
}

var count = (() => {
    let count = 0;
    return () => {
      let prev = count;
      count += 150;
      console.log(prev);
      return prev;
    }
})()

window.onload = () => {
    var svg = d3.select('.container')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '300px');

    var line = drawLine(svg);
    var circle = drawCircle(svg);
    var rect = drawRect(svg);
    var triangle = drawTriangle(svg);

    transform(line, count())
    transform(circle, count())
    transform(rect, count())
    transform(triangle, count())
}
