const WIDTH = 1415,
    HEIGHT = 600;

var createChart = (datum) => {
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var val = d3.scaleLinear()
        .domain([1, 100])
        .range([50, 500]);

    var cont = d3.select('.container');

    var bars = cont.selectAll('div')
        .data(datum);
    bars.enter()
        .append('div')
        .classed('bar', true)
        .classed('round', true)
        .style('width', (d) => `${val(d.score)}px`)
        .style('background-color', (d) => color(d.subject))
        .text((d) => `${d.name} ${d.score}`)
        .exit().remove();

    var sort = cont.append('g').classed('sort', true).text('Sort by: ');
    sort.selectAll('button').data(['name', 'subject', 'score'])
        .enter()
        .append('button')
        .classed('round', true)
        .on('click', (d) => d3.selectAll('.bar').sort((a, b) => d3.ascending(a[d], b[d])))
        .text((d) => d);

    var legend = cont.append('g').classed('legend', true).text('Subjects: ');
    legend.selectAll('div').data(datum, (d) => d.subject)
        .enter()
        .append('div')
        .classed('legend', true)
        .classed('round', true)
        .text((d) => d.subject)
        .style('background-color', (d) => color(d.subject))
        .exit().remove();
}

window.onload = () => {
    d3.json('data/score.json', createChart);
}
