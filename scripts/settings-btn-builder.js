/*

Graph settings
==============
Description:
This page contains settings for the graph:
- Function to easily create settings buttons
- Function to toggle state of true/false settings

Use:
The main script can use functions in this page to easily create buttons for controlling settings.

*/

/* Toggle settings function */
function toggleSetting(setting){
	switch(setting){
		case true:
			return(false);
		case false:
			return(true);
	}
}

/* Build buttons to change settings */

// Iterating function
function createOptions(options, parentId){
	var btnCount = 1; // Count number of buttons for IDs
	// Create options forms for each setting option
	for(const option of options){
		console.log(option)
		switch(option.type){
			case 'checkbox':
				createCheckbox(option, `${parentId}-checkboxes`, btnCount);
				break;
			case 'radio':
				createRadio(option, `${parentId}-radios`, btnCount)
				break;
			case 'textForm':
				createTextForm(option, `${parentId}-textForms`, btnCount);
				break;
		}
		
		btnCount++; // Increment button count
	}
}

// Function to create checkbox buttons 
function createCheckbox(option, parentId, btnCount){
	const name = option.name;
	const funct = option.funct;
	const checked = option.default;

	// Create input button
	var btn = document.createElement("INPUT");
		btn.id = `sett-btn-${btnCount}`;
		btn.setAttribute("type", 'checkbox');
		btn.className = 'm-1 settings-btns'; // Spacing
		btn.onclick = funct;
		btn.checked = checked;
	
	// Create label for button
	var label = document.createElement("Label");
		label.htmlFor = btn.id;
		label.innerHTML= name;
		label.className = 'm-1 settings-labels'; // Spacing
	
	// Wrap in div
	var div = document.createElement("DIV");
		div.id = `sett-div-${btnCount}`;
	
	// Append to DOM
	document.getElementById(parentId).appendChild(div);
	document.getElementById(div.id).appendChild(btn);
	document.getElementById(div.id).appendChild(label);	
}

// Function to create text form 
function createTextForm(option, parentId, btnCount){
	const name = option.name;
	const funct = option.funct;
	const defaultValue = option.default;

	// Create input button
	var btn = document.createElement("INPUT");
		btn.id = `sett-btn-${btnCount}`;
		btn.setAttribute("type", 'text');
		btn.className = 'm-1 settings-btns'; // Spacing
		btn.onchange = funct;
		btn.value = defaultValue;
		btn.size = 2;
	
	// Create label for button
	var label = document.createElement("Label");
		label.htmlFor = btn.id;
		label.innerHTML= name;
		label.className = 'm-1 settings-labels'; // Spacing
	
	// Wrap in div
	var div = document.createElement("DIV");
		div.id = `sett-div-${btnCount}`;
	
	// Append to DOM
	document.getElementById(parentId).appendChild(div);
	document.getElementById(div.id).appendChild(label);	
	document.getElementById(div.id).appendChild(btn);
}


// Function to create radio buttons 
function createRadio(option, parentId, btnCount){
	const name = option.name;
	const funct = option.funct;
	const checked = option.default;

	// Create input button
	var btn = document.createElement("INPUT");
		btn.id = `sett-btn-${btnCount}`;
		btn.setAttribute("type", 'radio');
		btn.className = 'm-1 settings-btns'; // Spacing
		btn.onclick = funct;
		btn.value = option.value;
		btn.checked = checked;
		btn.name = option.group;
	
	// Create label for button
	var label = document.createElement("Label");
		label.htmlFor = btn.id;
		label.innerHTML= name;
		label.className = 'm-1 settings-labels'; // Spacing
	
	// Wrap in div
	var div = document.createElement("DIV");
		div.id = `sett-div-${btnCount}`;
	
	// Append to DOM
	document.getElementById(parentId).appendChild(div);
	document.getElementById(div.id).appendChild(btn);
	document.getElementById(div.id).appendChild(label);	
}
