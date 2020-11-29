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
		errors: false, // Whether errors were identified in the CSV format
		observational: false,
	},
	nodes: {
		shape: 'circle',
		circleRadius: 15,
		scaleCircleArea: d=>settings.nodes.circleRadius / 100 * (100 + d),
		onHover: {
			enter:{
				calcCircleRadius: function(){return settings.nodes.circleRadius*2},
				circleRadius_min: 10,
				circleRadius_max: 50,
				calcIconSize: function(){return settings.nodes.icons.size()*2},
				calcIconPosition: function(){return -settings.nodes.circleRadius*2},
			},
			exit:{
				calcCircleRadius: function(){return settings.nodes.circleRadius},
				circleRadius_min: 10,
				circleRadius_max: 50,
				calcIconSize: function(){return settings.nodes.icons.size()},
				calcIconPosition: function(){return -settings.nodes.circleRadius},
			}
		},
		strokeColor: 'rgba(0, 0, 0, 0.9)',
		strokeWidth: 2,
		fill: 'white',
		colorSchemeForInterpolation: d => d.change<0 ? d3.interpolateGnBu(1-1*d.change_bar/100) : d3.interpolateOrRd(1*d.change_bar/100),
		opacity: 1,
		fillFromCSV: false,
		class: 'permanentLabels',
		labels: {
			enabled: true,
			font: 'Rubik, sans-serif',
			content: d => d.label,
			posX: 19, // Node radius + padding
			posY: 6, // Center text vertically on node
			anchor: 'none', // Special placement of text
			fontSize: 19,
			class: 'label', // Gives labels a custom CSS class
			color: 'black', // Text color
			outlineWidth: 0.1,
				outlineColor: 'none',
			background: 'none',
				backgroundPosX: function(){if(settings.nodes.labels.anchor=='none'){return settings.nodes.labels.posX-2}else{return -(settings.nodes.labels.backgroundWidth())/2}},
				backgroundPosY: -15,
				backgroundWidth: function(){return(settings.nodes.labels.fontSize * 8)},
				backgroundHeight: 25,
				cornerRounding: 12,
			extras: null,
			stroke: 'black',
			strokeWidth: '1px',
			opacity: 0.9,
		},
		icons: {
			enabled: false,
			size: function(){return(settings.nodes.circleRadius*2)},
			position : function(){return(-settings.nodes.circleRadius)},
		},
		onHover: {
			enabled: null,
			enter:{
				enabled: null,
				calcCircleRadius: null,
				calcIconSize: null,
			},
			exit:{
				enabled: null,
				calcCircleRadius: null,
				calcIconSize: null,
			},
		},
	},
	links: {
		colNeg: 'blue',
		colPos: 'red',
		opacity: 0.9,
		outline: false,
			outlineCalcScaledWidth: function(b){return(settings.links.scaleToBeta.minWidth+(Math.abs(b)*settings.links.scaleToBeta.scaleFactor))+2;}, // Method to calculate scale
			outlineWidth: d => settings.links.outlineCalcScaledWidth(d.proportionalBeta) + 1,
			outlineColor: 'black',
			outlineArrow: d=>settings.arrows.selectArrow(Math.abs(d.b), d.offset, outline = true),
			outlineArrowWeight: 8,
			outlineArrowPos: 0,
			outlineOffset: d=>-(settings.links.outlineWidth(d))*3+2, //-6-(20*Math.abs(d.b_pct)/100)}
		scaleToBeta:{
			method: 'percentOfMax',
			minWidth: 1.25, // Minimum scaled edge width 
			scaleFactor: 3, // Factor to scale width by beta
			calcScaledWidth: function(b){return(settings.links.scaleToBeta.minWidth+(Math.abs(b)*settings.links.scaleToBeta.scaleFactor));}, // Method to calculate scale
		},
		colorEdge: function(b, c1, c2){if(b<0){return(c1);}else{return(c2);}},
		color: d => settings.links.colorEdge(d.b, settings.links.colNeg, settings.links.colPos),
		width: d => settings.links.scaleToBeta.calcScaledWidth(d.proportionalBeta),
		bidirectional:{
			enabled: true,
			offsetEdges: true, // Offset bi-directional edges
			offset: function(offset){  // Offset each bidirectional edge
				if(!(offset==0)){
					return Math.abs(offset / 100) + 0.075; // Offset by a minimum angle plus an amount based on edge thickness to prevent large edges covering up small edges
				} else { return 0 }}, 
			calcLineOffset: function(b1, b2){return ( // Calculate line offset by width of lines
				settings.links.scaleToBeta.calcScaledWidth(b1) 
				+ settings.links.scaleToBeta.calcScaledWidth(b2))/2},
		},
		multiEdges:{
			enabled: true,
			calcLineOffset: function(numberOfLinks, currentLink){return(-numberOfLinks + (currentLink*2))},
		},
	},
	arrows: {
		enabled: true,
		position: 5,
		size: 8,
		opacity: function(){return settings.links.opacity},
		sameColorAsEdge: true, // Used by legend builder
		stroke: d=>d.col, // Color by edge color
		fill: d=>d.col,
		arrowType: d=>settings.arrows.selectArrow(d.b, d.offset),
		selectArrow: function(b, offset, outline=false){ 
			if(outline){
				switch(true){ // If outline
					case b < 0 && offset == 0: return('url(#end-neg_outline)'); // Negative uni-directional estimate
					case b >= 0 && offset == 0: return('url(#end-pos_outline)'); // Positive uni-directional estimate
					case b >= 0 && offset != 0: return('url(#end-pos-bi_outline)'); // Negative bi-directional estimate
					case b < 0 && offset != 0: return('url(#end-neg-bi_outline)'); // Positive bi-directional estimate
				}
			} else if (settings.links.bidirectional.enabled) { // If bidirectional arrows enabled
				switch(true){
					case b < 0 && offset == 0: return('url(#end-neg)'); // Negative uni-directional estimate
					case b >= 0 && offset == 0: return('url(#end-pos)'); // Positive uni-directional estimate
					case b >= 0 && offset != 0: return('url(#end-pos-bi)'); // Negative bi-directional estimate
					case b < 0 && offset != 0: return('url(#end-neg-bi)'); // Positive bi-directional estimate
				}
			} else { // If bidirectional arrows disabled
				switch(true){
					case b < 0 && offset == 0: return('url(#end-neg)'); // Negative uni-directional estimate
					case b >= 0 && offset == 0: return('url(#end-pos)'); // Positive uni-directional estimate
					case b >= 0 && offset != 0: return('url(#end-pos)'); // Negative bi-directional estimate
					case b < 0 && offset != 0: return('url(#end-neg)'); // Positive bi-directional estimate
				}
			}
		}
	},
	legend: {
		fontSize: function(){return settings.nodes.labels.fontSize},
	},
	simulation: {
		forceViewbox: false,
		viewbox: {
			x: 1250,
			y: 1250,
		},
		strength: -3000, // Higher values = less cohesion
		autoUpdate: false, // Enables auto-updating of graph
		animation: { // Enabled states
			listenForMouseEventsOn: 'circle', // On hover events for this element tagName only (e.g.,: 'image', 'circle')
		},
	},
}