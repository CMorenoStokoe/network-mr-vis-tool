/*

Graph settings
==============
Description:
This page contains settings for the graph:
- Default settings
- Function to create buttons to change settings
- Functions to change settings

Use:
The main script can use functions in this page to edit or restore default settings.

*/


/* Default settings */

var settings = {
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

/* Build buttons to change settings */

// Function to create radio buttons 
function createRadioBtn(setting, inputType, parentId = 'sidebar-settings'){
	// param 'setting' = dict of {id:, label:, function:,}

	// Create input button
	var btn = document.createElement("INPUT");
		btn.id = `btn-${setting.id}`;
		btn.setAttribute("type", inputType);
		btn.setAttribute("value", setting.id);
		btn.className = 'm-1 settings-btns'; // Spacing
		btn.onclick = setting.function;
	
	// Create label for button
	var label = document.createElement("Label");
		label.htmlFor = btn.id;
		label.innerHTML=setting.label;
		label.className = 'm-1 settings-labels'; // Spacing
	
	// Wrap in div
	var div = document.createElement("DIV");
		div.id = `div-${setting.id}`;
	
	// Append to DOM
	document.getElementById(parentId).appendChild(div);
	document.getElementById(div.id).appendChild(btn);
	document.getElementById(div.id).appendChild(label);	
}

/* Functions to change settings */

createRadioBtn(
	{
		id: '1', 
		label: 'test', 
		function: function(){alert('hi')},
	},
	'radio'
)