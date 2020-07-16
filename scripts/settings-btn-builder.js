/*

Graph settings
==============
Description:
This page contains settings for the graph:
- Function to easily create settings buttons

Use:
The main script can use functions in this page to easily create buttons for controlling settings.

*/

/* Build buttons to change settings */

// Count number of buttons for IDs
var btnCount = 1;

// Function to create radio buttons 
function createCheckbox(txt, funct, parentId = 'sidebar-settings'){
	// param 'setting' = dict of {id:, label:, function:,}

	// Create input button
	var btn = document.createElement("INPUT");
		btn.id = `sett-btn-${btnCount}`;
		btn.setAttribute("type", 'checkbox');
		btn.className = 'm-1 settings-btns'; // Spacing
		btn.onclick = funct;
	
	// Create label for button
	var label = document.createElement("Label");
		label.htmlFor = btn.id;
		label.innerHTML= txt;
		label.className = 'm-1 settings-labels'; // Spacing
	
	// Wrap in div
	var div = document.createElement("DIV");
		div.id = `sett-div-${btnCount}`;
	
	// Append to DOM
	document.getElementById(parentId).appendChild(div);
	document.getElementById(div.id).appendChild(btn);
	document.getElementById(div.id).appendChild(label);	
}