let dataset = [];

let barchart = d3.select("#barchart")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 1000);

barchart.append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 50)
    .attr("height", 50);