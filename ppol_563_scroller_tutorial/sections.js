// Visualization parameters
const margin = {left: 170, top: 50, bottom: 50, right: 20}
const width = 1000 - margin.left - margin.right
const height = 950 - margin.top - margin.bottom

// Append the svg object to the body of the page, the 'vis' div
var svg = d3.select("#vis")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// Read in DC Metro Graph data and perform the following function to draw it
d3.json("data/dc_metro_graph.json", function(data) {

    // Initialize the links
    var link = svg
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .style("stroke", "#aaa")

    // Initialize the nodes
    var node = svg
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("r", 5)
        .style("fill", "#69b3a2")

    // Force specification
    // This produces the network layout from the initial draw of all nodes as a single circle in the corner.
    var simulation = d3.forceSimulation(data.nodes)                 // Force algorithm is applied to data.nodes
        .force("link", d3.forceLink()                               // This force provides links between nodes
                .id(function(d) { return d.id; })                   // This provides the id of a node
                .links(data.links)                                  // and this the list of edges
        )
        .force("charge", d3.forceManyBody().strength(-20))          // This adds repulsion between nodes
        .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
        .on("end", ticked);

    // This function is run at each iteration of the force algorithm, updating the nodes position.
    function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    }
})

// This specifies that scrolling occurs over the 'graphic' div that contains the text content on the left side.
let scroll = scroller()
    .container(d3.select('#graphic'))

scroll()

scroll.on('active', function(index){
    // When index in inactive, opacity is reduced for the fade effect
    d3.selectAll('.step')
        // This transition call specifies over how much time the fade effect should occur.
        // It specifies a duration of 500ms
        .transition().duration(500)
        .style('opacity', function (d, i) {return i === index ? 1 : 0.1;});

    // Compared to Chow's version, I've stripped out code related to various activations of his visualization for now.
})