// Global variables
let svg, dataset, simulation
let links, nodes

// Visualization parameters
const margin = {left: 50, top: 50, bottom: 50, right: 50}
const width = 800 - margin.left - margin.right
const height = 800 - margin.top - margin.bottom

// Coordinates were already rescaled to [-1 . 1] in previous processing
// Set domain to +0.05 to prevent node cut off

var x_scale = d3.scaleLinear()
    .domain([-1.05, 1.05])
    .range([0, margin.left + width + margin.right])

var y_scale = d3.scaleLinear()
    .domain([-1.05,  1.05])
    .range([margin.top + height, margin.top])

// Read in DC Metro Graph data and perform the following function to draw it
d3.json("data/dc_metro_graph_predictions.json")
    .then(function(d){
        dataset = d
        drawInitial()
    });

function drawInitial(){

    // Append the svg object to the body of the page, the 'vis' div
    let svg = d3.select("#vis")
        .append('svg')
        .attr('width', 800)
        .attr('height', 750)
        .attr('opacity', 1);

    // Initialize the links
    links = svg
        .selectAll("line")
        .data(dataset.links)
        .enter()
        .append("line")
        .style("stroke", "#aaa")

    // Initialize the nodes
    nodes = svg
        .selectAll("circle")
        .data(dataset.nodes)
        .enter()
        .append("circle")
        .attr("r", 5)
        .style("fill", "#69b3a2")

    // Force specification
    // This produces the network layout from the initial draw of all nodes as a single circle in the corner.
    simulation = d3.forceSimulation(dataset.nodes)              // Force algorithm is applied to data.nodes
        .force("link", d3.forceLink()                               // This force provides links between nodes
                .id(function(d) { return d.id; })                   // This provides the id of a node
                .links(dataset.links)                               // and this the list of edges
        )
        .force("charge", d3.forceManyBody().strength(-20))          // This adds repulsion between nodes
        .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
        .on("end", ticked);

    // This function is run at each iteration of the force algorithm, updating the nodes position.
    function ticked() {
        // This assigns four attributes to a link, two coordinate pairs that a line is drawn between
        // x, y pairs will be the location of a node
        links
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
        // this assigned two attributes to a node, a coordinate pair for its location
        nodes
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    }

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
            .attr('opacity', 1)
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

//Cleaning Function
//Will hide all the elements which are not necessary for a given chart type 

function clean(chartType){
    let svg = d3.select('#vis').select('svg')

}

//First draw function

function draw1(){
    // simulation  
    //     .force("link", d3.forceLink()                               // This force provides links between nodes
    //             .id(function(d) { return d.id; })                   // This provides the id of a node
    //             .links(dataset.links)                               // and this the list of edges
    //     )
    //     .force("charge", d3.forceManyBody().strength(-20))          // This adds repulsion between nodes
    //     .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
    //     .on("end", ticked);

    // // This function is run at each iteration of the force algorithm, updating the nodes position.
    // function ticked() {
    //     // This assigns four attributes to a link, two coordinate pairs that a line is drawn between
    //     // x, y pairs will be the location of a node
    //     links
    //         .attr("x1", function(d) { return d.source.x; })
    //         .attr("y1", function(d) { return d.source.y; })
    //         .attr("x2", function(d) { return d.target.x; })
    //         .attr("y2", function(d) { return d.target.y; });
    //     // this assigned two attributes to a node, a coordinate pair for its location
    //     nodes
    //         .attr("cx", function(d) { return d.x; })
    //         .attr("cy", function(d) { return d.y; });
    // }

    //Reheat simulation and restart
    simulation.alpha(0.9).restart()
}

function draw2(){}

function draw3(){}

function draw4(){
    
    let svg = d3.select("#vis")
                    .select('svg')
                    .attr('width', 800)
                    .attr('height', 750)

    simulation.stop()

    // Fade links
    svg.selectAll('line')
        .attr('opacity', 0);

    // Transition Nodes
    svg.selectAll('circle')
        .transition()
            .duration(500)
            .delay(1000)
        .attr("cx", function(d) {
            return x_scale(d.cx)
        })
        .attr("cy", function(d) {
            return y_scale(d.cy)
        })
        .style("fill", "#69b3a2")

    // Re-introduce links
    svg.selectAll('line')
        .transition()
            .delay(500)
        .attr("x1", function(l) {
            var source_node = dataset.nodes.filter(function(d, i) {
                return i == l.source.id
            })[0];
            d3.select(this).attr("y1", y_scale(source_node.cy));
            return x_scale(source_node.cx)
        })
        .attr("x2", function(l) {
            var target_node = dataset.nodes.filter(function(d, i) {
                return i == l.target.id
            })[0];
            d3.select(this).attr("y2", y_scale(target_node.cy));
            return x_scale(target_node.cx)
        })
        
    svg.selectAll('line')
        .transition()
            .duration(500)
            .delay(1500)
        .attr('opacity', 1);
}

function draw5(){
    let svg = d3.select("#vis")
        .select('svg')
        .attr('width', 800)
        .attr('height', 750)

    // Consider writing this into a function to be neater
    // Loop through length of d.predictions
    // enumerate delay start: 0 ++ 500
    svg.selectAll('circle')
        .transition()
            .duration(100)
        .style("fill", function(d) {
            return d.predictions[0]
        })

    svg.selectAll('circle')
        .transition()
            .duration(100)
            .delay(500)
        .style("fill", function(d) {
            return d.predictions[1]
        })

    svg.selectAll('circle')
        .transition()
            .duration(100)
            .delay(1000)
        .style("fill", function(d) {
            return d.predictions[2]
        })

    svg.selectAll('circle')
        .transition()
            .duration(100)
            .delay(1500)
        .style("fill", function(d) {
            return d.predictions[3]
        })

    svg.selectAll('circle')
        .transition()
            .duration(100)
            .delay(2000)
        .style("fill", function(d) {
            return d.predictions[4]
        })

    svg.selectAll('circle')
        .transition()
            .duration(100)
            .delay(2500)
        .style("fill", function(d) {
            return d.predictions[5]
        })

    svg.selectAll('circle')
        .transition()
            .duration(100)
            .delay(3000)
        .style("fill", function(d) {
            return d.predictions[6]
        })

    svg.selectAll('circle')
        .transition()
            .duration(100)
            .delay(3500)
        .style("fill", function(d) {
            return d.predictions[7]
        })

    svg.selectAll('circle')
        .transition()
            .duration(100)
            .delay(4000)
        .style("fill", function(d) {
            return d.predictions[8]
        })

    svg.selectAll('circle')
        .transition()
            .duration(100)
            .delay(4500)
        .style("fill", function(d) {
            return d.predictions[9]
        })

    svg.selectAll('circle')
        .transition()
            .duration(100)
            .delay(5000)
        .style("fill", function(d) {
            return d.predictions[10]
        })

    svg.selectAll('circle')
        .transition()
            .duration(100)
            .delay(5500)
        .style("fill", function(d) {
            return d.predictions[11]
        })

    svg.selectAll('circle')
        .transition()
            .duration(100)
            .delay(6000)
        .style("fill", function(d) {
            return d.predictions[12]
        })

    svg.selectAll('circle')
        .transition()
            .duration(100)
            .delay(6500)
        .style("fill", function(d) {
            return d.predictions[13]
        })

    svg.selectAll('circle')
        .transition()
            .duration(100)
            .delay(7000)
        .style("fill", function(d) {
            return d.predictions[14]
        })

    svg.selectAll('circle')
        .transition()
            .duration(100)
            .delay(7500)
        .style("fill", function(d) {
            return d.predictions[15]
        })

    svg.selectAll('circle')
        .transition()
            .duration(100)
            .delay(8000)
        .style("fill", function(d) {
            return d.predictions[16]
        })

    svg.selectAll('circle')
        .transition()
            .duration(100)
            .delay(8500)
        .style("fill", function(d) {
            return d.predictions[17]
        })

    svg.selectAll('circle')
        .transition()
            .duration(100)
            .delay(9000)
        .style("fill", function(d) {
            return d.predictions[18]
        })

    svg.selectAll('circle')
        .transition()
            .duration(100)
            .delay(10000)
        .style("fill", function(d) {
            return d.predictions[19]
        })

    svg.selectAll('circle')
        .transition()
            .duration(100)
            .delay(10500)
        .style("fill", function(d) {
            return d.predictions[20]
        })

}

function draw6(){}

//Array of all the graph functions
//Will be called from the scroller functionality

let activationFunctions = [
    draw1,
    draw2,
    draw3,
    draw4,
    draw5,
    draw6
]

// This specifies that scrolling occurs over the 'graphic' div that contains the text content on the left side.
let scroll = scroller()
    .container(d3.select('#graphic'))

scroll()

let lastIndex, activeIndex = 0

scroll.on('active', function(index){
    d3.selectAll('.step')
        .transition().duration(500)
        .style('opacity', function (d, i) {return i === index ? 1 : 0.1;});
    
    activeIndex = index
    let sign = (activeIndex - lastIndex) < 0 ? -1 : 1; 
    let scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(i => {
        activationFunctions[i]();
    })
    lastIndex = activeIndex;

})

scroll.on('progress', function(index, progress){
    if (index == 2 & progress > 0.7){

    }
})