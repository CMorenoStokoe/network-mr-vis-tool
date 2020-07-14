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
    
    // Seperate csv header from body
    const header = csv[0]; 

    // Identify fields in header
    for (const [key, value] of Object.entries(header)) {
        fields.push(value);
    }

    // Check all required fields are given
    for(const field of requiredFields){
        if(!(fields.includes(field))){alert(`Required field not found: ${field}`);}
    }

    // Return fields
    return(fields)
}
