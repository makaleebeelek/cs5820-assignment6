let margin = {top: 20, right:20, left: 140, bottom: 50};
let width = 960 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;

let areachart = d3.select("#areachart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.bottom + margin.top)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

$.ajax({
    method: "GET",
    url: "covid",
    success: function (data) {
        console.log(data)




        let xScale = d3.scaleTime().range([0, width]);
        let yScale = d3.scaleLinear().range([height, 0]);

        const parseTime = d3.timeParse("%Y-%m-%d")

        let xValue = function(d) {
            return (parseTime(d['date']));
        };

        let yValue = function(d) {
            return (+d['new cases'])
        };

        xScale.domain([d3.min(data, xValue), d3.max(data, xValue)]);
        yScale.domain([d3.min(data, yValue), d3.max(data, yValue)]);


        let xAxis = d3.axisBottom(xScale);
        let yAxis = d3.axisLeft(yScale);

        areachart.append("path")
            .datum(data)
            .attr("d", d3.area()
                .x((d)=> {
                    return xScale(parseTime(d.date));
                })
                .y0(yScale(margin.bottom + 12))
                .y1((d)=> {
                    return yScale(+d['new cases']);
                })
            )
            .attr("class", "area")
            .on("mouseover", (e, d)=> {
                d3.select(e.target)
                    .attr("class", "selected");
                d3.select("#date")
                    .selectAll("text")
                    .text("Date Range: " + d[0]['date'] + " to " + d[6]['date']);

                d3.select("#cases")
                    .selectAll("text")
                    .text("Total Number of New Covid Cases: " + (+d[0]['new cases'] + +d[1]['new cases'] + +d[2]['new cases'] + +d[3]['new cases'] + +d[4]['new cases'] + +d[5]['new cases'] + +d[6]['new cases']));

            })
            .on("mouseout", (e, d) => {
                d3.select(e.target)
                    .attr("class", "area");

                d3.select("#date")
                    .selectAll("text")
                    .text("Date Range: ");

                d3.select("#cases")
                    .selectAll("text")
                    .text("Total Number of New Covid Cases: ");

            });

        areachart.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis.tickFormat(d3.timeFormat('%m/%d/%Y')).tickValues(data.map(d => parseTime(d.date))))
            .append("text")
            .attr("x", width / 2)
            .attr("y", 50)
            .text("Date")
            .attr("class", "label");

        areachart.append("g")
            .attr("class", "axis")
            .call(yAxis)
            .append("text")
            .attr("x", -70)
            .attr("y", height / 2 - 20)
            .text("New")
            .attr("class", "label");

        areachart.append("g")
            .attr("class", "axis")
            .call(yAxis)
            .append("text")
            .attr("x", -70)
            .attr("y", height / 2)
            .text("Cases")
            .attr("class", "label");
    }
})