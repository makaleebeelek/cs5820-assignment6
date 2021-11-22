let margin = {top: 20, right:20, left: 140, bottom: 50};
let width = 960 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;

let linechart = d3.select("#linechart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.bottom + margin.top)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

$.ajax({
    method: "GET",
    url: "tweets",
    success: function (data) {

        let newData = d3.rollup(data, v => v.length, d => d.date.substr(0,4));

        let lineData = Array.from(newData, x => {
            return {"key": x[0], "value": x[1]};
        })

        let x = d3.scaleBand()
            .domain(lineData.map((d) => d.key))
            .range([0, width])
            .padding(1);

        let y = d3.scaleLinear()
            .domain([0, d3.max(lineData, (d) => d.value)])
            .range([height, 0]);

        let lines = linechart.selectAll("path")
            .data(lineData)
            .enter()
            .append("g")
            .attr("class", "line");

        linechart.selectAll("circle")
            .data(lineData)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cx", (d)=>
                x(d.key)
            )
            .attr("cy", (d)=>
                y(d.value)
            )
            .attr("class", "points")
            .on("mouseenter", (e, d)=> {
                d3.select(e.target)
                    .attr("class", "selected");

                d3.select("#year")
                    .selectAll("text")
                    .text("Year: " + d.key);

                d3.select("#tweetCount")
                    .selectAll("text")
                    .text("Number of Tweets: " + d.value);

            })
            .on("mouseleave", (e, d) => {
                d3.select(e.target)
                    .attr("class", "points");

                d3.select("#year")
                    .selectAll("text")
                    .text("Year: ");

                d3.select("#tweetCount")
                    .selectAll("text")
                    .text("Number of Tweets: ");

            });

        lines.append("path")
            .datum(lineData)
            .attr("d", d3.line()
                .x((d)=> {
                return x(d.key)
                })
                .y((d)=> {
                    return y(d.value)
                })
            );

        let xAxis = d3.axisBottom(x);
        let yAxis = d3.axisLeft(y);

        linechart.append("g")
            .call(xAxis)
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "axis")
            .attr("class", "x.axis");

        linechart.append("g")
            .call(yAxis)
            .attr("class", "axis");

        linechart.append("text")
            .attr("x", width / 2)
            .attr("y", height + 50)
            .text("Year")
            .attr("class", "label");

        linechart.append("text")
            .attr("x", -140)
            .attr("y", height / 2 -30)
            .text("Number")
            .attr("class", "label");

        linechart.append("text")
            .attr("x", -140)
            .attr("y", height / 2 -10)
            .text("of")
            .attr("class", "label");

        linechart.append("text")
            .attr("x", -140)
            .attr("y", height / 2 +10)
            .text("Tweets")
            .attr("class", "label");
    }
})