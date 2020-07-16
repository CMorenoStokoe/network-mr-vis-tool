/*

Force-Directed Graph (FDG) Visualisation
==================================
Description:
This file contains functions for creating and customising a FDG designed for MR data.
- Clear graph
- Draw graph

Use:
The main script will call this function, and pass in options for customisation, when it requires a new graph to be drawn.

*/

// Clear FDG
function clearFDG(svgId){
		
	// Select SVG on DOM
	const svg = d3.select(svgId);

	//Clear
	svg.selectAll("*").remove();
}

// Draw FDG
function drawFDG (data, svgId, settings) {

	// Map data
	var links = data.links;
	var nodes = data.nodes;
	
	// Select SVG DOM element
	const svg = d3.select(svgId),
        width = +svg.attr("width"),
        height = +svg.attr("height");
    console.log(`Got SVG (${width} x ${height})`);

	// Set up simulation 
	const simulation = d3.forceSimulation(nodes)
		.force("link", d3.forceLink(links).id(d => d.id))
		.force("charge", d3.forceManyBody().strength(settings.simulation.strength))
		.force("center", d3.forceCenter(width / 2, height / 2))
		.force("x", d3.forceX())
		.force("y", d3.forceY());

	// Add edges
	const link = svg.append("g")
	.attr("class", "links")
	.selectAll("line")
	.data(links, d => d.id)
	.join(
		enter => enter.append("line")
		.attr("stroke-width", settings.links.width)
		.attr("stroke", settings.links.color)//edge color as function of beta weight sign//
		.attr("stroke-opacity", settings.links.opacity)//edge opacity as function of beta weight value//
		.attr("marker-end", "url(#end)"),
	);

	// Add nodes
	const node = svg.append("g")
	.attr("class", "nodes")
	.selectAll("g")
	.data(nodes)
	.join(
		enter => enter.append("g")
	)
	.call(drag(simulation));

	// Add node circles
	const circles = node.append("circle")
		.attr("r", settings.nodes.circleRadius)
		.attr("stroke", settings.nodes.strokeColor)
		.attr("fill", settings.nodes.fill)
		.attr("stroke-width", settings.nodes.strokeWidth);
	
	// Add node labels
	var nodeText = node.append("text")
		.text(settings.nodes.labels.content)
        .style("font-size", settings.nodes.labels.fontSize)
        .style("cursor", 'default')
        .style("user-select", 'none')
		.attr('x', settings.nodes.labels.position) // Offset from node by radius with padding
		.attr('y', 6);

	// Add arrows
	svg.append("svg:defs").selectAll("marker")
		.data(["end"])     
		.enter().append("svg:marker")
		.attr("id", String)
		.attr("viewBox", "0 -5 10 10")
		.attr("refX", settings.arrows.position)
		.attr("refY", 0) 
		.attr("markerWidth", settings.arrows.size) 
		.attr("markerHeight", settings.arrows.size) 
		.attr("stroke", settings.arrows.strokeColor)
		.attr("fill", settings.arrows.fill)
		.attr("orient", "auto")
		.append("svg:path")
		.attr("d", "M0,-5L10,0L0,5");

	// Simulation properties
	simulation
		.on("tick", ticked);
		
	function ticked() {
	link
		.attr("x1", d => d.source.x)
		.attr("y1", d => d.source.y)
		.attr("x2", d => d.target.x)
		.attr("y2", d => d.target.y);

	node // Ensure nodes cannot leave SVG
		.attr("transform", d => `translate(
			${
				Math.max(settings.nodes.circleRadius*2, 
				Math.min(width - settings.nodes.circleRadius*2, d.x))
			}, 
			${
				Math.max(settings.nodes.circleRadius, 
				Math.min(height - settings.nodes.circleRadius, d.y))
			}
		)`);
	}
		
	function dblclick(d) {
	d3.select(this).classed("fixed", d.fixed = false);
	}

	function dragstart(d) {
	d3.select(this).classed("fixed", d.fixed = true);
	}
		
	function drag(simulation) {

	function dragstarted(d) {
		if (!d3.event.active) simulation.alphaTarget(0.3).restart();
		d.fx = d.x;
		d.fy = d.y;
		d3.select(this).classed("fixed", d.fixed = true);
	}

	function dragged(d) {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
		d3.select(this).classed("fixed", d.fixed = true);
	}

	function dragended(d) {
		if (!d3.event.active) simulation.alphaTarget(0);
		d.fx = d3.event.x;
		d.fy = d3.event.y;
		d3.select(this).classed("fixed", d.fixed = true);    
	}

	return d3.drag()
		.on("start", dragstarted)
		.on("drag", dragged)
		.on("end", dragended);
	}     
};