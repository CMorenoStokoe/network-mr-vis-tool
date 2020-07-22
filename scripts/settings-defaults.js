/*

Graph settings
==============
Description:
This page contains default settings for the graph.

Use:
The main script will use these as default settings.

*/


/* Default settings */

var defaultSettings = {
	data:{
		hideUnusedNodes: true,
		cleaning:{
			enabled: true,
			removeHyphens: true, // Data cleaning, removes hyphens from IDs
			removeMRBaseId: true, // Remove MR base ID from name (e.g., default R output name)
			removeCategory: true, // Remove identified categories following structure typical for UKB variables (cat:name)
			shorten: true, // Shorten names if over n chars
		}
	},
	nodes: {
		shape: 'circle',
		circleRadius: 15,
		strokeColor: 'rgba(0, 0, 0, 0.9)',
		strokeWidth: 2,
		fill: 'white',
		labels: {
			enabled: true,
			content: d => d.label,
			position: 19, // Node radius + padding
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
		colorEdge: function(b, c1, c2){if(b<0){return(c1);}else{return(c2);}},
		color: d => settings.links.colorEdge(d.b, settings.links.colNeg, settings.links.colPos),
		width: 2,
	},
	arrows: {
		enabled: true,
		position: 25,
		size: 5,
		stroke: 'rgba(150, 150, 150, 0.75)',
		fill: 'rgba(150, 150, 150, 0.75)',
	},
	simulation: {
		strength: -2000, // Higher values = less cohesion
	},
}