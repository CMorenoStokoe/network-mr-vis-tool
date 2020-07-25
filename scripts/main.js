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

    // Give function to button
    addOnclickEvent("btn-action", generateGraph); // Btn to generate graph
    addOnclickEvent("btn-settings", function(){toggleVisibility('settings-panel')}); // Btn to open advanced settings panel
    
    // Set SVG height to fill window container
    svgContainerHeight = document.getElementById('film-panel').offsetHeight;
        document.getElementById('svg-main').setAttribute('height', svgContainerHeight);
    svgContainerWidth = document.getElementById('film-panel').offsetWidth;
        document.getElementById('svg-main').setAttribute('width', svgContainerWidth);

    // Use default settings
    var settings = defaultSettings;

    // Create settings buttons for changing settings
    createOptions(options, 'div-settings'); // options = list of settings options in settings-options


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
        
        // Data cleaning and formatting

            // Filter edges by pvalue threshold
            edges = filterByPval(edges, document.getElementById("pval_limit").value)

            // Filter out self loop edges
            edges = removeSelfloopEdges(edges);

            // Make names display and js friendly (if enabled)
            if(settings.data.cleaning.enabled==true){ 
                edges = makeNamesSafe(edges); 
            }
            
            // Detect, mark and display bidirectional edges differently
            edges = markBidirectionalEdges(edges); 
            
            // Scale edges to beta weights (if enabled)
            if(!(settings.links.scaleToBeta.method=='none')){
                settings.data.betaRange = getBetaRange(edges);
                makeEdgeBetasProportional(edges, settings.data.betaRange, settings.links.scaleToBeta.method); // Scale edges by their beta weight proportional to the min/max beta values in the data set
            }

        // Extract nodes
        nodes = extractNodes(edges);

        // Clear gray film over canvas area
        clearDecorativeFilm('film-panel', 'film-text', 'film-logo');

        // Format edges and nodes for D3
        edges = formatForD3(edges); // Add source and target fields
        data = {nodes: nodes, links: edges}; // Format expected by D3 graphing utility

        // Draw graph
        clearFDG('#svg-main'); // Clear any already drawn graphs from SVG
        drawFDG(data, '#svg-main', settings); // Draw data to svg with settings
        
        // Draw legend
        resetLegend('legend');
        createLegend('legend', 'div-legend', settings)

        // Hide settings panel
        setVisibility('settings-panel', 'hidden');
        
    };

    // Get most recent file uploaded and invoke above function
    fileReader.readAsText(document.getElementById('upload-mr').files[0]);

};