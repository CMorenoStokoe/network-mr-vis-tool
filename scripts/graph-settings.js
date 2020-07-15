
// Configure FDG
function configureFDG(newSettings){

	// Use default values at first
	var defaults = {
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
			color: d => colorEdge(d.b),
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
	var settings = defaults;

	// For each change modify the default settings
	for(const newSetting of newSettings){
		settings[newSetting.setting] = newSetting.value;
	}

	console.log('Settings: ', settings)
	return(settings); // Return modified settings
}

// Formatting and design
function colorEdge(b){
	if(b<0){return('blue');}else{return('red');};
}