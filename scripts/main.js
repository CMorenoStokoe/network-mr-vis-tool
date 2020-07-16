/*

Main script
===========
Description:
Handles the general operational structure of the app:
- Sets up event listeners to assign function to buttons on DOM
- Parse uploaded CSV data and produce visualisation

Use:
Calls functions from subservient script files and handles returned outputs to produce visualisation.

Assumptions:
Uploaded CSV contains the columns:
- 'id.exposure'
- 'id.outcome'

*/


/* Initialise DOM elements */

    // Give function to generate graph button
    document.getElementById("btn-action").addEventListener("click", generateGraph);
    
    // Set SVG height to fill window container
    svgContainerHeight = document.getElementById('film-panel').offsetHeight;
    document.getElementById('svg-main').setAttribute('height', svgContainerHeight);
    svgContainerWidth = document.getElementById('film-panel').offsetWidth;
    document.getElementById('svg-main').setAttribute('width', svgContainerWidth);

    // Get default settings
    var settings = defaultSettings;

    // Create settings buttons
    const options = [ // List of options {label on btn:, function to run:, type of btn:,}
        { 
            txt: 'Hide unused nodes', 
            funct: function(){settings.data.hideUnusedNodes=false},
        },
        
    ]
    for(const opt of options){createCheckbox(opt.txt, opt.funct)}


/* Draw graph */

//Define function to run on button press i.e., upload data, parse and pass into FDG funct
function generateGraph(){ 
    
    // Load uploaded CSV and then run function
    var fileReader = new FileReader();
    fileReader.onload = function (e) { 
        
        // Parse CSV
        var data = Papa.parse(fileReader.result)['data'];

        // Check data contains required information
        requiredFields = ['id.outcome','id.exposure', 'exposure', 'outcome', 'pval'];
        fields = identifyDataFields(data, requiredFields);

        // Extract MR estimate edges from CSV
        var edges = extractEdges(data);
        
        // Data cleaning - edges
        edges = filterByPval(edges, document.getElementById("pval_limit").value)
        edges = makeNamesSafe(edges); // Make names display and js friendly

        // Extract nodes
        nodes = extractNodes(edges);

        // Data cleaning - nodes
        console.log(settings.data.hideUnusedNodes)/*
        if(settings.data.hideUnusedNodes){ // If enabled
            console.log('filtering out edges')
            nodes = filterByHasEdges(nodes); // Filter out nodes without edges
        };*/

        // Clear gray film over canvas area
        clearDecorativeFilm('film-panel', 'film-text', 'film-logo');

        // Format edges and nodes for D3
        data = formatForD3(nodes, edges);

        // Draw graph
        clearFDG('#svg-main'); // Clear any already drawn graphs from SVG
        drawFDG(data, '#svg-main', settings); // Draw data to svg with settings
        
        
    };

    // Get most recent file uploaded and invoke above function
    fileReader.readAsText(document.getElementById('upload-mr').files[0]);

};