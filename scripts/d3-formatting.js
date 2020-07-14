/*

D3 formatting
============
Description:
The functions here are intended to transform a collection of edges and nodes into the format D3 expects for graphing.

Use:
This is called by the main script, given the result of processing the uploaded file and before calling it to be graph visualised.

*/

function formatForD3(nodes, edges){

    for(const edge of edges){
        edge.source = edge['id.exposure'];
        edge.target = edge['id.outcome'];
    }
    return({nodes: nodes, links: edges})
}