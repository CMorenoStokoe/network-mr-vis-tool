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
	const svg = d3.select(svgId).attr("viewBox", "0 0 800 800"),
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
		.attr("biDirectAdjust", d => d.biDirectAdjust)
		.attr("stroke-width", settings.links.width)
		.attr("stroke", settings.links.color)//edge color as function of beta weight sign//
		.attr("stroke-opacity", settings.links.opacity)//edge opacity as function of beta weight value//
		.attr("marker-end", settings.arrows.arrowType),
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
		.attr('opacity', settings.nodes.opacity)
		.attr("stroke-width", settings.nodes.strokeWidth);
	
	// Add node labels
	var nodeText = node.append("text")
		.text(settings.nodes.labels.content)
		.style("font-size", settings.nodes.labels.fontSize)
		.style("font-family", settings.nodes.labels.font)
        .style("cursor", 'default')
		.style("user-select", 'none')
		.attr('text-anchor', settings.nodes.labels.anchor)
		.attr('x', settings.nodes.labels.posX) // Offset from node by radius with padding
		.attr('y', settings.nodes.labels.posY);

	// Add arrows
	
	svg.append("svg:defs").selectAll("marker")
		.data([ // Arrow ends for positive and negative links
			{id: "end-pos", col: settings.links.colPos}, 
			{id: "end-neg", col: settings.links.colNeg}])     
		.enter().append("svg:marker")
		.attr("markerUnits", "userSpaceOnUse") // Do not scale arrow to edge width, causes positioning troubles
			.attr("id", d=>d.id) // Populated from given id in data above
			.attr("viewBox", "0 -5 10 10")
			.attr("refX", settings.arrows.position)
			.attr("refY", 0)
			.attr("markerWidth", 16) 
			.attr("markerHeight", 16) 
			.attr("stroke", settings.arrows.stroke) // Either fixed or by edge color using data above
			.attr("fill", settings.arrows.fill) // Either fixed or by edge color using data above
			.attr("orient", "auto")
			.attr('opacity', settings.links.opacity)
			.append("svg:path")
			.attr("d", "M0,-5 L5,0 L0,0");

	// Simulation properties
	simulation
		.on("tick", ticked);
		
	function ticked() {
	link
		.attr("x1", d => d.source.x + d.bidirectionalOffset)
		.attr("y1", d => d.source.y + d.bidirectionalOffset)
		.attr("x2", d => d.target.x + d.bidirectionalOffset)
		.attr("y2", d => d.target.y + d.bidirectionalOffset);

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