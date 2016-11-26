var oneTo = (n) => [...new Array(n)].map((d, i) => i + 1);

var identity = d3.scaleLinear();
var sq = d3.scalePow().exponent(2);
var log = d3.scaleLog();

var addRow = (vals, scale) => {
    d3.select('.container').select('tbody')
        .append('tr').selectAll('td')
        .data(vals)
        .enter()
        .append('td')
        .classed('cell', true)
        .text((d) => scale(d));
}
var createTable = (vals) => {
    var table = d3.select('.container').append('table');
    var thead = table.append('thead');
    var tbody = table.append('tbody');

    thead.append('tr').selectAll('th')
        .data(vals)
        .enter()
        .append('th')
        .classed('cell', true)
        .text((d) => d);

    addRow(vals, identity);
    addRow(vals, sq);
    addRow(vals, log);
    // addRow(vals);
}

window.onload = () => {
    var vals = oneTo(10)
    vals.unshift('Title');

    createTable(vals)
};
