// Visualization parameters
const margin = {left: 50, top: 50, bottom: 50, right: 50}
const width = 1000 - margin.left - margin.right
const height = 950 - margin.top - margin.bottom

// Coordinates were already rescaled to [-1 . 1] in previous processing
// Set domain to +0.05 to prevent node cut off

var x_scale = d3.scaleLinear()
    .domain([-1.05, 1.05])
    .range([0, margin.left + width + margin.right])

var y_scale = d3.scaleLinear()
    .domain([-1.05,  1.05])
    .range([margin.top + height, margin.top])

// Read in DC Metro Graph data and perform the following function to draw it
d3.json("data/dc_metro_graph.json")
    .then(function(d){
        console.log(d)
        dataset = d
        drawInitial()
    });

function drawInitial(){

    // Append the svg object to the body of the page, the 'vis' div
    let svg = d3.select("#vis")
        .append('svg')
        .attr('width', 1000)
        .attr('height', 950)
        .attr('opacity', 1);

    // Initialize the links
    links = svg
        .selectAll("line")
        .data(dataset.links)
        .enter()
        .append("line")
        .attr("x1", function(l) {
                var source_node = dataset.nodes.filter(function(d, i) {
                return i == l.source
                })[0];
                d3.select(this).attr("y1", y_scale(source_node.cy));
                return x_scale(source_node.cx)
            })
            .attr("x2", function(l) {
                var target_node = dataset.nodes.filter(function(d, i) {
                return i == l.target
                })[0];
                d3.select(this).attr("y2", y_scale(target_node.cy));
                return x_scale(target_node.cx)
            })
            .style("stroke", "#aaa")

        // Initialize the nodes
        nodes = svg
            .selectAll("circle")
            .data(dataset.nodes)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cx", function(d) {
                return x_scale(d.cx)
            })
            .attr("cy", function(d) {
                return y_scale(d.cy)
            })
            .style("fill", "#69b3a2")

        // Tool tips

        // Node tool tips show the ID and Name of a DC Metro station

        // Part of D3's function is too handle when the mouse is over elements
        // In this case, when a user's mouse is over the circle (node), it calls the function mouseOverNode
        // When the mouse leaves the element's area, it calls function mouseOutNode
        svg.selectAll('circle')
            .on('mouseover', mouseOverNode)
            .on('mouseout', mouseOutNode)

        // This function selects the circle and adds a border to help highlight selection
        // Additionally, a tooltip is transitioned in when selected to provide station details.
        function mouseOverNode(event, d){
            console.log('hi')
            d3.select(this)
                .transition('mouseover').duration(100)
                .attr('opacity', 1)
                .attr('stroke-width', 5)
                .attr('stroke', 'black')
                
            d3.select('#tooltip')
                .style('left', (event.pageX + 10)+ 'px')
                .style('top', (event.pageY - 25) + 'px')
                .style('display', 'inline-block')
                .html(`<strong>ID</strong> ${d.id}
                    <br>
                    <strong>Name</strong> ${d.name}`)
        }

        // This function erases the tool tip display and resets the circle border to zero to remove the highlight.
        function mouseOutNode(d){
            d3.select('#tooltip')
                .style('display', 'none')

            d3.select(this)
                .transition('mouseout').duration(100)
                .attr('opacity', 0.8)
                .attr('stroke-width', 0)
        }

        // Edge tool tips show what line the station is on.
        // Although the underlying data is a a multigraph, the visualized graph is a simple graph only showing one edge and therefore one line
        svg.selectAll('line')
            .on('mouseover', mouseOverEdge)
            .on('mouseout', mouseOutEdge)

        function mouseOverEdge(event, d){

            console.log('hi')
            d3.select(this)
                .transition('mouseover').duration(100)
                .attr('opacity', 1)
                .attr('stroke-width', 5)
                .attr('stroke', 'black')
                
            d3.select('#tooltip')
                .style('left', (event.pageX + 10)+ 'px')
                .style('top', (event.pageY - 25) + 'px')
                .style('display', 'inline-block')
                .html(`<strong>Line</strong> ${d.color}`)
        }

        function mouseOutEdge(d, i){
            d3.select('#tooltip')
                .style('display', 'none')

            d3.select(this)
                .transition('mouseout').duration(100)
                .attr('opacity', 0.8)
                .attr('stroke-width', 1)
        }
}

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