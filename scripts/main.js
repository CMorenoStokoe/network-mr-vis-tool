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


/* Set up event listeners */

    // Assign generate graph function to button press
    document.getElementById("btn-action").addEventListener("click", generateGraph);


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
        edges = extractEdges(data);

        // Data cleaning
        edges = filterByPval(edges, document.getElementById("pval_limit").value)
        edges = makeNamesSafe(edges); // Make names display and js friendly

        // Extract nodes
        nodes = extractNodes(edges);

        // Clear gray film over canvas
        document.getElementById('film-panel').style.backgroundColor = '';
        document.getElementById('film-logo').style.display = 'none';

        // Draw graph
        clearFDG('#svg-main');
        settings = configureFDG([]);
        drawFDG(formatForD3(nodes, edges), '#svg-main', settings);    
    };
    // Get most recent file uploaded and invoke above function
    fileReader.readAsText(document.getElementById('upload-mr').files[0]);

};