/*

Legend
======
Description:
This file contains methods to build a legend for the visualisation.

Use:
Called by the main script.

*/

// Reset legend
function resetLegend(legendId){
    
    // If legend has already been drawn
    if(document.getElementById(legendId)){  

        // Remove legend from DOM
        var legend = document.getElementById(legendId);
        legend.parentNode.removeChild(legend);
    }
}

// Create legend 
function createLegend(legendId, parentId, settings){

    // Get edge colors
    const colNeg = `
        <span style='color:${settings.links.colNeg}'>
            <i class="fas fa-minus"></i>
        </span>
        <span style='color:${settings.arrows.fill}'>
            <i class="fas fa-caret-right"></i>
        </span>`
    const colPos = `
        <span style='color:${settings.links.colPos}'>
            <i class="fas fa-minus"></i>
        </span>
        <span style='color:${settings.arrows.fill}'>
            <i class="fas fa-caret-right"></i>
        </span>`

    // Legend text
    const html = `<h5> Legend: </h5>
        Negative links: ${colNeg} 
        <br><br>
        Positive links: ${colPos}
    `;

    // Create legend
    legend = document.createElement("DIV");
        legend.id = legendId; // Id for resetting it
        legend.className = 'legend'; // Classes for basic styling
        legend.innerHTML = html; // Populate legend content

    // Write legend to DOM
    document.getElementById(parentId).appendChild(legend);

}