/*

Graph settings
==============
Description:
This page contains default settings for the graph.

Use:
The main script will use these as default settings.

*/


/* Settings */

var defaultSettings = {
	data:{
		hideUnusedNodes: true,
		cleaning:{
			enabled: true,
			removeHyphens: true, // Data cleaning, removes hyphens from IDs
			removeMRBaseId: true, // Remove MR base ID from name (e.g., default R output name)
			removeCategory: true, // Remove identified categories following structure typical for UKB variables (cat:name)
			shorten: true, // Shorten names if over n chars
		},
		betaRange: null, // Range of beta weights in data set, used for scaling edges and in legend
		mrMethods: ['Inverse variance weighted', 'Wald ratio'], // MR methods to display
		requiredFields: ['id.outcome','id.exposure', 'exposure', 'outcome', 'pval', 'method'],
		requiredFieldsObs: ['measurex', 'measurey', 'effectSize', 'pval'],
		fields: null, // Edge properties identified in CSV data file
		observational: false,
	},
	nodes: {
		shape: 'circle',
		circleRadius: 15,
		strokeColor: 'rgba(0, 0, 0, 0.9)',
		strokeWidth: 2,
		fill: 'white',
		opacity: 1,
		fillFromCSV: false,
		labels: {
			enabled: true,
			font: 'Rubik, sans-serif',
			content: d => d.label,
			posX: 19, // Node radius + padding
			posY: 6, // Center text vertically on node
			anchor: 'none', // Special placement of text
			fontSize: '19px',
			textClass: '', // Gives labels a custom CSS class
		},
		icons: {
			enabled: false,
			size: 50,
			position : -25,
		}
	},
	links: {
		colNeg: 'blue',
		colPos: 'red',
		opacity: 1,
		scaleToBeta:{
			method: 'percentOfMax',
			minWidth: 0.3, // Minimum scaled edge width 
			scaleFactor: 1.5, // Factor to scale width by beta
			calcScaledWidth: function(b){return(settings.links.scaleToBeta.minWidth+(b*settings.links.scaleToBeta.scaleFactor));}, // Method to calculate scale
		},
		colorEdge: function(b, c1, c2){if(b<0){return(c1);}else{return(c2);}},
		color: d => settings.links.colorEdge(d.b, settings.links.colNeg, settings.links.colPos),
		width: d => settings.links.scaleToBeta.calcScaledWidth(d.proportionalBeta),
		bidirectional:{
			enabled: true,
			lineOffset: 2, // Offset for each line in bidirectional links
			calcLineOffset: function(bidirectional){switch(bidirectional){case '1st': return(settings.links.bidirectional.lineOffset); case '2nd': return(settings.links.bidirectional.lineOffset*-1); default: return(0);}},
		},
		multiEdges:{
			enabled: true,
			calcLineOffset: function(numberOfLinks, currentLink){console.log(currentLink);return(-numberOfLinks + (currentLink*2))},
		},
	},
	arrows: {
		enabled: true,
		position: function(){return(settings.nodes.circleRadius)},
		size: 7,
		sameColorAsEdge: true, // Used by legend builder
		stroke: d=>d.col, // Color by edge color
		fill: d=>d.col,
		arrowType: d=>settings.arrows.selectArrow(d.b, d.offset),
		selectArrow: function(b, offset){ 
			console.log(b, offset);switch(true){
			case b < 0 && offset == 0: console.log(1,b, offset);return('url(#end-neg)'); // Negative uni-directional estimate
			case b >= 0 && offset == 0: console.log(2,b, offset);return('url(#end-pos)'); // Positive uni-directional estimate
			case b >= 0 && offset != 0: console.log(3,b, offset);return('url(#end-pos-bi)'); // Negative bi-directional estimate
			case b < 0 && offset != 0: console.log(4,b, offset);return('url(#end-neg-bi)'); // Positive bi-directional estimate
		}}
	},
	simulation: {
		strength: -3000, // Higher values = less cohesion
	},
}