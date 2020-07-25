/*

CSV to JSON
===========
Description:
Functions to parse an array of CSV rows (parsed CSV) into a JSON list of dictionary entries for each row.

Use:
Called by main to parse CSV into JSON formatted for graphing.

*/


// Function to extract edges from csv
function extractEdges(csv){

    // Seperate csv header from body
    const header = csv[0];
    const body = csv.slice(1);

    // Construct list of dictionaries of properties for each cell in each row of the CSV
    const edges = [];
    for (const row in body) {
            
        cellInfo = {id: row}; // Initiate cell information dictionary with ID
        
        // Populate dictionary with properties for each row
        for(const cell in body[row]){

            // Add dictionary with key = col header name : value = cell contents
            cellInfo[header[cell]] = body[row][cell];
        }

        edges.push(cellInfo); // Add dict to list

    }

    return(edges);
}

// Return fields in csv
function identifyDataFields(csv, requiredFields){
    const fields = [];
    
    // Seperate csv header and body
    const header = csv[0]; 
    const body = csv.slice(1);

    // Identify fields in header
    for (const [key, value] of Object.entries(header)) {
        fields.push(value);
    }

    // Check data for errors and display to user
    checkForErrors(requiredFields, fields, body, header);

    // Return fields
    return(fields)
}


// Check data for errors and display errors to user
function checkForErrors(requiredFields, fields, body, header){
    errors=[];
    
    // Check all required fields are given
    for(const field of requiredFields){
        if(!(fields.includes(field))){errors.push(`Field not found in data file: ${field}`);}
    }

    // Check data is longer than 1 rows
    if(header[0]==''){errors.push('First column in header in data file is blank')}

    // Check data is longer than 1 rows
    if(body[0][0]==''){errors.push('First cell below header in data file is blank')}

    // If errors found
    if(errors.length > 0){
        
        // Add errors to pop-up modal
        content="<ul>";
        for(const error of errors){
            content += `<li>${error}</li>`;
        }
        document.getElementById('modal-text').innerHTML = content;

        // Trigger Modal
        $('#modal-errors').modal('show');
    }
}