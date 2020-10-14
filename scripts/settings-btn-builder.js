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

// Identify and make groups of buttons for options
function createOptions(options, optionPanelId){
	var groupCount = 1; // Count number of options groups for IDs

	for(const optionGroup of options){
			
		// Wrap group in div
		var div = document.createElement("DIV");
			div.id = `settGroup-div-${groupCount}`;
			div.innerHTML = `<p><strong>${optionGroup.groupTitle}</strong></p><hr>`;
			div.className = 'col-md';
		document.getElementById(optionPanelId).appendChild(div);
		
		// Create buttons for this option group and append in this div
		createOptionBtns(optionGroup.buttons, div.id);
		
		groupCount++; // Increment group count for IDs
	}

}

// Create buttons for options
function createOptionBtns(options, parentId){
	
	// Create options forms for each setting option
	for(const option of options){

		// Create appropriate button for each settings option
		switch(option.type){
			case 'checkbox':
				createCheckbox(option, parentId);
				break;
			case 'radio':
				createRadio(option, parentId)
				break;
			case 'textForm':
				createTextForm(option, parentId);
				break;
		}
	}
}

// Function to create checkbox buttons 
function createCheckbox(option, parentId){
	const name = option.name;
	const funct = option.funct;
	const checked = option.default;
	const id = option.id;

	// Create input button
	var btn = document.createElement("INPUT");
		btn.id = `sett-btn-${id}`;
		btn.setAttribute("type", 'checkbox');
		btn.className = 'm-1 settings-btns'; // Spacing
		btn.onchange = funct;
		btn.checked = checked;
	
	// Create label for button
	var label = document.createElement("Label");
		label.htmlFor = btn.id;
		label.innerHTML= name;
		label.className = 'm-1 settings-labels'; // Spacing
	
	// Wrap in div
	var div = document.createElement("DIV");
		div.id = `sett-div-${id}`;
	
	// Append to DOM
	document.getElementById(parentId).appendChild(div);
	document.getElementById(div.id).appendChild(btn);
	document.getElementById(div.id).appendChild(label);	
}

// Function to create text form 
function createTextForm(option, parentId){
	const name = option.name;
	const funct = option.funct;
	const defaultValue = option.default;
	const size = option.size;
	const id = option.id;

	// Create input button
	var btn = document.createElement("INPUT");
		btn.id = `sett-btn-${id}`;
		btn.setAttribute("type", 'text');
		btn.className = 'm-1 settings-btns'; // Spacing
		btn.onchange = funct;
		btn.value = defaultValue;
		btn.size = size;
	
	// Create label for button
	var label = document.createElement("Label");
		label.htmlFor = btn.id;
		label.innerHTML= name;
		label.className = 'm-1 settings-labels'; // Spacing
	
	// Wrap in div
	var div = document.createElement("DIV");
		div.id = `sett-div-${id}`;
	
	// Append to DOM
	document.getElementById(parentId).appendChild(div);
	document.getElementById(div.id).appendChild(label);	
	document.getElementById(div.id).appendChild(btn);
}


// Function to create radio buttons 
function createRadio(option, parentId){
	const name = option.name;
	const funct = option.funct;
	const checked = option.default;
	const id = option.id;

	// Create input button
	var btn = document.createElement("INPUT");
		btn.id = `sett-btn-${id}`;
		btn.setAttribute("type", 'radio');
		btn.className = 'm-1 settings-btns'; // Spacing
		btn.onchange = funct;
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
		div.id = `sett-div-${id}`;
	
	// Append to DOM
	document.getElementById(parentId).appendChild(div);
	document.getElementById(div.id).appendChild(btn);
	document.getElementById(div.id).appendChild(label);	
}

// Buttons for presets
function createPresets(){

	// Define presets
	const presets = [
		{
			id: 0,
			name: 'Default',
			colors: ['#000','red','blue'],
			nodeShape: 'far fa-circle',
		},
		{
			id: 1,
			name: 'Academic',
			colors: ['gold','red','blue'],
			nodeShape: 'fas fa-square',
		},
		{
			id: 2,
			name: 'Clinical',
			colors: ['#000','#b83b5e','#008891'],
			nodeShape: 'fas fa-signature writtenNode',
		},
		{
			id: 3,
			name: 'Industrial',
			colors: ['#000','#ff9642','#646464'],
			nodeShape: 'fas fa-circle smallNode',
		},
		{
			id: 4,
			name: 'Design 1',
			colors: ['#01c5c4','#999','#b9fffc'],
			nodeShape: 'fas fa-circle',
		},
		{
			id: 5,
			name: 'Design 2',
			colors: ['#00587a','#008891','#0f3057'],
			nodeShape: 'far fa-circle',
		}
	]

	for(const preset of presets){

		// Style preset
		const html = `
			<i class="${preset.nodeShape}" style='color: ${preset.colors[0]}'></i>
			<i class="fas fa-long-arrow-alt-up" style='color: ${preset.colors[1]}'></i>
			<i class="fas fa-long-arrow-alt-down" style='color: ${preset.colors[2]}'></i>
			${preset.name}
		`

		// Format button
		const presetBtn = document.getElementById(`preset-${preset.id}`);
			presetBtn.innerHTML = html;
			presetBtn.addEventListener("click", function(){
				for(const preset of presets){document.getElementById(`preset-${preset.id}`).className = 'dropdown-item'};
				loadPreset(preset.id);
				document.getElementById('preset-text').innerText = preset.name;
				this.className = 'dropdown-item active';
				generateGraph();
			});
	}
}
