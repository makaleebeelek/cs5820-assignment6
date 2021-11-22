let margin = {top: 20, right:20, left: 40, bottom: 30};
let width = 960 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;

$.ajax({
    method: "get",
    url: "police",
    success: function (data) {
        let newData = d3.rollup(data, v => v.length, d => d.race);

        let barData = Array.from(newData, x => {
            return {"key": x[0], "value": x[1]};
        })

        for (let i = 0; i < barData.length; i++)
        {
            if (barData[i]["key"] === undefined) {
                barData[i]["key"] = "None";
            }
        }

        let barchart = d3.select("#barchart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.bottom + margin.top)
            .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


        let x = d3.scaleBand()
            .domain(barData.map((d) => d.key))
            .range([0, width]).padding(0.1);
        let y = d3.scaleLinear()
            .domain([0, d3.max(barData, (d) => d.value)])
            .range([height, 0]);



        let bars = barchart.selectAll("rect")
            .data(barData)
            .enter()
            .append("g")
            .attr("class", "bar");


        bars.append("rect")
        .attr("width", x.bandwidth())
        .attr("height", d=> height - y(d.value) )
        .attr("x", d => x(d.key))
        .attr("y", d => y(d.value))
        .on("mouseenter", (e, d)=> {
            d3.select(e.target)
                .attr("class", "barChange");

            d3.select("#race")
                .selectAll("text")
                .text("Race: " + d.key);

            d3.select("#raceData")
                .selectAll("text")
                .text("Race Shooting Total: " + d.value);

        })
            .on("mouseleave", (e, d) => {
            d3.select(e.target)
                .attr("class", "bar");

            d3.select("#race")
                .selectAll("text")
                .text("Race: ");

            d3.select("#raceData")
                .selectAll("text")
                .text("Race Shooting Total: ");

            });

        let xAxis = d3.axisBottom(x);
        let yAxis = d3.axisLeft(y);

        barchart.append("g")
            .call(xAxis)
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "axis")
            .attr("class", "x.axis");

        barchart.append("g")
            .call(yAxis)

        barchart.append("rect")
            .attr("x" , 550)
            .attr("y", 0)
            .attr("height", 190)
            .attr("width", 200)
            .attr("class", "legend")
            .append("text");

        barchart.append("text")
            .attr("x" , 560)
            .attr("y", 30)
            .text("LEGEND:");

        barchart.append("text")
            .attr("x" , 560)
            .attr("y", 50)
            .text("A : Asian");

        barchart.append("text")
            .attr("x" , 560)
            .attr("y", 70)
            .text("W : White, non-Hispanic");

        barchart.append("text")
            .attr("x" , 560)
            .attr("y", 90)
            .text("H : Hispanic");

        barchart.append("text")
            .attr("x" , 560)
            .attr("y", 110)
            .text("B : Black, non-Hispanic");

        barchart.append("text")
            .attr("x" , 560)
            .attr("y", 130)
            .text("O : Other");

        barchart.append("text")
            .attr("x" , 560)
            .attr("y", 150)
            .text("None : Unknown");

        barchart.append("text")
            .attr("x" , 560)
            .attr("y", 170)
            .text("N : Native American");
    }
})




