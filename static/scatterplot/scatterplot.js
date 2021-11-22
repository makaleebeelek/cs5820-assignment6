let margin = {top: 20, right:20, left: 140, bottom: 50};
let width = 960 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;

let scatterplot = d3.select("#scatterplot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.bottom + margin.top)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

$.ajax({
    method: "GET",
    url: "fires",
    success: function (data) {

        let xScale = d3.scaleLinear().range([0, width]);
        let yScale = d3.scaleLinear().range([height, 0]);

        let xValue = function(d) {
            return (+d['year']);
        };

        let yValue = function(d) {
            return (+d['acres'])
        };

        xScale.domain([d3.min(data, xValue), d3.max(data, xValue)]);
        yScale.domain([d3.min(data, yValue), d3.max(data, yValue)]);


        let xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
        let yAxis = d3.axisLeft(yScale);


        scatterplot.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", 10)
            .attr("cx", (d)=>
                xScale(+d['year'])
            )
            .attr("cy", (d)=>
                yScale(+d['acres'])
            )
            .attr("class", (d)=> {
                    if (d['cause'] === 'Under Investigation'){
                        return "investigation";
                    }
                    else if (d['cause'] === 'Powerlines'){
                        return "powerlines";
                    }
                    else if (d['cause'] === "Human Related"){
                        return "human";
                    }
                    else if (d['cause'] === "Lightning"){
                        return "lightning";
                    }
                    else {
                        return "undefined";
                    }
            })
            .on("mouseenter", (e, d)=> {
                d3.selectAll("." + e.target.className.baseVal)
                    .attr("class", (d)=> {
                        if (d['cause'] === "Under Investigation") {
                            return "investigationhighlight";
                        } else if (d['cause'] === 'Powerlines') {
                            return "powerlineshighlight";
                        } else if (d['cause'] === "Human Related") {
                            return "humanhighlight";
                        } else if (d['cause'] === "Lightning") {
                            return "lightninghighlight";
                        } else {
                            return "undefinedhighlight";
                        }
                })
            })
            .on("mouseleave", (e, d) => {
                d3.selectAll("." + e.target.className.baseVal)
                    .attr("class", (d)=> {
                        if (d['cause'] === 'Under Investigation') {
                            return "investigation";
                        } else if (d['cause'] === 'Powerlines') {
                            return "powerlines";
                        } else if (d['cause'] === "Human Related") {
                            return "human";
                        } else if (d['cause'] === "Lightning") {
                            return "lightning";
                        } else {
                            return "undefined";
                        }
                    })
            });

        scatterplot.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("x", width / 2)
            .attr("y", 50)
            .text("Year")
            .attr("class", "label");

        scatterplot.append("g")
            .attr("class", "axis")
            .call(yAxis)
            .append("text")
            .attr("x", -70)
            .attr("y", height / 2)
            .text("Acres")
            .attr("class", "label");

        scatterplot.append("rect")
            .attr("x" , 250)
            .attr("y", 0)
            .attr("height", 150)
            .attr("width", 200)
            .attr("class", "legend")
            .append("text");

        scatterplot.append("text")
            .attr("x" , 260)
            .attr("y", 30)
            .text("LEGEND:");

        scatterplot.append("text")
            .attr("x" , 270)
            .attr("y", 50)
            .text("Powerlines");

        scatterplot.append("circle")
            .attr("r", 5)
            .attr("cx", 260)
            .attr("cy", 45)
            .attr("class", "powerlineslegend");

        scatterplot.append("text")
            .attr("x" , 270)
            .attr("y", 70)
            .text("Lightning");

        scatterplot.append("circle")
            .attr("r", 5)
            .attr("cx", 260)
            .attr("cy", 65)
            .attr("class", "lightninglegend");

        scatterplot.append("text")
            .attr("x" , 270)
            .attr("y", 90)
            .text("Human Related");

        scatterplot.append("circle")
            .attr("r", 5)
            .attr("cx", 260)
            .attr("cy", 85)
            .attr("class", "humanlegend");

        scatterplot.append("text")
            .attr("x" , 270)
            .attr("y", 110)
            .text("Undefined");

        scatterplot.append("circle")
            .attr("r", 5)
            .attr("cx", 260)
            .attr("cy", 105)
            .attr("class", "undefinedlegend");

        scatterplot.append("text")
            .attr("x" , 270)
            .attr("y", 130)
            .text("Under Investigation");

        scatterplot.append("circle")
            .attr("r", 5)
            .attr("cx", 260)
            .attr("cy", 125)
            .attr("class", "investigationlegend");
    }
})