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
    const nodesRecorded=[];
    const edgesPerNode={};

    // Identify unique nodes in edges
    for(const edge of edges){
        for(const field of ['exposure', 'outcome']){ // Search exposure and outcome nodes in edge
            const id = edge[`id.${field}`];

            // Record edges per node
            if(edgesPerNode[id]){edgesPerNode[id].push(edge)}// If no record found, make one
            else{edgesPerNode[id]=[edge]}
            
            
            // Record if not already recorded
            if(!(nodesRecorded.includes(id))){
                nodes.push({ // Build node from exposure / outcome information in edge
                    id: id,
                    label: edge[field],
                });
                nodesRecorded.push(id);
            }  
        }
    }

    // Record final number of edges for each node
    for(const node of nodes){
        node.edges = edgesPerNode[node.id];
        node.edgeCount = edgesPerNode[node.id].length;
    }

    return(nodes);

}