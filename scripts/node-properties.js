/*

Node properties
===============
Description:
Functions intended for processing nodes and outputting a JSON collection.

Use:
The main script calls these functions for processing nodes:
- Identifying unique nodes from list of edges
- Adding in properties to nodes

*/

// Function to extract nodes from edge list
function extractNodes(edges){   
    const nodes=[];

    // Identify unique nodes in edges
    for(const edge of edges){
        for(const field of ['exposure', 'outcome']){ // Search exposure and outcome nodes in edge

            // Build node from exposure / outcome information in edge
            const node = {
                id: edge[`id.${field}`],
                label: edge[field],
            }

            // Record if not already recorded
            if(!(nodes.includes(node))){nodes.push(node);}
        }
    }

    return(nodes);

}