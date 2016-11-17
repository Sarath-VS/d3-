var rangeOf = (s, e) => [...new Array(e - s + 1)].map((d, i) => i + s);

var translate = (x, y) => `translate(${ x },${ y })`;
