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
function createLegend_legacy(legendId, parentId, settings){

    // Get arrow color
    const edgeColor = settings.arrows.sameColorAsEdge;
    
    var arrowColNeg = settings.arrows.fill;
    var arrowColPos = settings.arrows.fill;
    if(settings.arrows.sameColorAsEdge){
        arrowColNeg = settings.links.colNeg;
        arrowColPos = settings.links.colPos;
    }

    // Set example edges and arrows to graph colors
    const colNeg = `
        <span style='color:${settings.links.colNeg}'>
            <i class="fas fa-minus"></i>
        </span>
        <span style='color:${arrowColNeg}'>
            <i class="fas fa-caret-right"></i>
        </span>`
    const colPos = `
        <span style='color:${settings.links.colPos}'>
            <i class="fas fa-minus"></i>
        </span>
        <span style='color:${arrowColPos}'>
            <i class="fas fa-caret-right"></i>
        </span>`
    const reverse = `
    <span style='color:${arrowColPos}'>
        <i class="fas fa-caret-left"></i>
    </span>
    <span style='color:${settings.links.colPos}'>
        <i class="fas fa-minus"></i>
    </span>`
    
    // Create edge width legend
    var min = settings.data.betaRange.min;
    var edgeWidthLegend = '';
    if(!(settings.links.scaleToBeta.method=='none')){ 
        // Get beta range
        const betaMin = Number(settings.data.betaRange.min);
        const betaMax = Number(settings.data.betaRange.max);
        // Illustrate scaling edge widths to betas
        edgeWidthLegend = `
        <strong>Beta scale</strong>: <br> 
        ${betaMin.toPrecision(3)}
        <svg height="10" width="10">
            <line x1="0" y1="5" x2="10" y2="5" style="stroke:rgb(0, 0, 0);stroke-width:${settings.links.scaleToBeta.minWidth}" />
        </svg>
        <svg height="10" width="10">
            <line x1="0" y1="5" x2="10" y2="5" style="stroke:rgb(0, 0, 0);stroke-width:${settings.links.scaleToBeta.minWidth + (settings.links.scaleToBeta.scaleFactor*0.25)}" />
        </svg>
        <svg height="10" width="10">
            <line x1="0" y1="5" x2="10" y2="5" style="stroke:rgb(0, 0, 0);stroke-width:${settings.links.scaleToBeta.minWidth + (settings.links.scaleToBeta.scaleFactor*0.5)}" />
        </svg>         
        <svg height="10" width="10">
            <line x1="0" y1="5" x2="10" y2="5" style="stroke:rgb(0, 0, 0);stroke-width:${settings.links.scaleToBeta.minWidth + (settings.links.scaleToBeta.scaleFactor*0.75)}" />
        </svg>                    
        <svg height="10" width="10">
            <line x1="0" y1="5" x2="10" y2="5" style="stroke:rgb(0, 0, 0);stroke-width:${settings.links.scaleToBeta.minWidth + settings.links.scaleToBeta.scaleFactor}" />
        </svg>
        ${betaMax.toPrecision(3)}`;
    };

    // Legend content
    const html = `
        <h5> Legend: </h5>
        ${edgeWidthLegend}
        <br>
        <strong>Key</strong><br>
        Negative links: 
        <br>${colNeg} <br>
        Positive links: 
        <br>${colPos}<br>
        Bidirectional links: <br>   
        ${colNeg} <br> ${reverse}
    `;

    // Create legend
    legend = document.createElement("DIV");
        legend.id = legendId; // Id for resetting it
        legend.className = 'legend'; // Classes for basic styling
        legend.innerHTML = html; // Populate legend content

    // Write legend to DOM
    document.getElementById(parentId).appendChild(legend);

}

// Create legend 
function createLegend(legendId, parentId, settings, blackText = false, customLabels = false){
    
    // Set color of text in legend
    var color = settings.nodes.labels.color;
        if(blackText){color = 'black'};

    // Select the svg area
    var svg = d3.select("#svg-main");
        width = svg.attr("width")*settings.simulation.zoom;
        height = svg.attr("height")*settings.simulation.zoom;
        
    console.log({x: svg.attr("width"), y: svg.attr("height")})
    // Set SVG coordinates to draw legend elements to
    
    g = svg.append("g")
        g.attr('id', 'graph-legend');
    
    
    const titlePos = {x: 10, y: svg.attr("height")-210};
        if(!(settings.links.scaleToBeta.method == 'none')){
            titlePos.y = svg.attr("height")-285; // If need to draw scale, draw legend higher
        };
    const keyPos = {};
        keyPos.x=titlePos.x;
        keyPos.y=titlePos.y + 40; // Spacing after legend
    const scalePos = {}; 
        scalePos.x=titlePos.x;
        scalePos.y=keyPos.y + 170; // Length of key is 130 units + padding = 170

    // Add BG (if enabled)
    if(customLabels){
        g.append("rect")
            .attr('x', 0)
            .attr('y', titlePos.y - 30)
            .attr('width', 175)
            .attr('height', scalePos.y)
            .style('fill', 'white')
    }

    // Legend title
        g.append("text")
        .attr("x", titlePos.x)
        .attr("y", titlePos.y)
        .text('Legend')
        .style("fill", color)
        .style("font-size", settings.legend.fontSize*2)
        .style("font-family", settings.nodes.labels.font)
        .style("font-weight", 400)
        .attr("alignment-baseline","middle")

    // Key title
        g.append("text")
        .attr("x", keyPos.x)
        .attr("y", keyPos.y)
        .text('Key')
        .style("fill", color)
        .style("font-size", settings.legend.fontSize*0.75)
        .style("font-family", settings.nodes.labels.font)
        .style("font-weight", 400)
        .attr("alignment-baseline","middle")

    // Build arrow color key

        // Positive line
        g.append("text")
            .attr("x", keyPos.x)
            .attr("y", keyPos.y+20)
            .text(customLabels ? customLabels.pos : 'Positive link')
            .style("fill", color)
            .style("font-size", settings.legend.fontSize*0.75)
            .style("font-family", settings.nodes.labels.font)
            .attr("alignment-baseline","middle")
            .style("font-weight", 300)
        g.append("line")
            .attr('x1',keyPos.x)  
            .attr('y1',keyPos.y+40) 
            .attr('x2',keyPos.x+50) 
            .attr('y2',keyPos.y+40)
            .style("stroke", settings.links.colPos)
            .style("stroke-width", 3)
            .attr("marker-end", 'url(#end-pos)');

        // Negative line
        g.append("text")
            .attr("x", keyPos.x)
            .attr("y", keyPos.y+60)
            .text(customLabels ? customLabels.neg : 'Negative link')
            .style("fill", color)
            .style("font-size", settings.legend.fontSize*0.75)
            .style("font-family", settings.nodes.labels.font)
            .attr("alignment-baseline","middle")
            .style("font-weight", 300)
        g.append("line")
            .attr('x1',keyPos.x)  
            .attr('y1',keyPos.y+80) 
            .attr('x2',keyPos.x+50) 
            .attr('y2',keyPos.y+80)
            .style("stroke", settings.links.colNeg)
            .style("stroke-width", 3)
            .attr("marker-end", 'url(#end-neg)');

        // Bi-directional links
        if(settings.links.bidirectional.enabled){
            g.append("text")
                .attr("x", keyPos.x)
                .attr("y", keyPos.y+100)
                .text('Bi-directional link')
                .style("fill", color)
                .attr("alignment-baseline","middle")
                .style("font-size", settings.legend.fontSize*0.75)
                .style("font-family", settings.nodes.labels.font)
                .style("font-weight", 300)
            g.append("line")
            .attr('x1',keyPos.x)  
            .attr('y1',keyPos.y+120) 
            .attr('x2',keyPos.x+50) 
            .attr('y2',keyPos.y+120)
                .style("stroke", settings.links.colPos)
                .style("stroke-width", 3)
                .attr("marker-end", 'url(#end-pos-bi)');
            g.append("line")
            .attr('x1',keyPos.x+50)  
            .attr('y1',keyPos.y+130) 
            .attr('x2',keyPos.x) 
            .attr('y2',keyPos.y+130)
                .style("stroke", settings.links.colNeg)
                .style("stroke-width", 3)
                .attr("marker-end", 'url(#end-neg-bi)');
        } else {scalePos.y - 130}            

    // Build scale for beta weights if edge scaling by beta is enabled
    if(!(settings.links.scaleToBeta.method == 'none')){

        // Scale title      
        g.append("text")
            .attr("x", customLabels ? scalePos.x : scalePos.x)
            .attr("y", customLabels ? scalePos.y-30 : scalePos.y)
            .text('Scale')
            .style("fill", color)
            .style("font-size", settings.legend.fontSize*0.75)
            .style("font-family", settings.nodes.labels.font)
            .style("font-weight", 400)
            .attr("alignment-baseline","middle")

        if(customLabels){
            g.append("text")
                .attr("x", scalePos.x)
                .attr("y", scalePos.y)
                .text(customLabels.scale)
                .style("fill", color)
                .style("font-size", settings.legend.fontSize*0.75)
                .style("font-family", settings.nodes.labels.font)
                .style("font-weight", 300)
                .attr("alignment-baseline","middle")
        }
            
        // Mark betas on upper side of scale
        g.append("text") // Beginning
            .attr("x", scalePos.x)
            .attr("y", scalePos.y+20)
            .text(customLabels ? customLabels.min : Number(settings.data.betaRange.min).toPrecision(3))
            .style("fill", color)
            .style("font-size", settings.legend.fontSize*0.75)
            .style("font-family", settings.nodes.labels.font)
            .attr("alignment-baseline","middle")
        g.append("text") // End
            .attr("x", scalePos.x+90)
            .attr("y", scalePos.y+20)
            .text(customLabels ? customLabels.max : Number(settings.data.betaRange.max).toPrecision(3))
            .style("fill", color)
            .style("font-size", settings.legend.fontSize*0.75)
            .style("font-family", settings.nodes.labels.font)
            .attr("alignment-baseline","middle")

        // Build 4 lines of widths along the current beta width scale
        for(let i = 0; i <= 100; i++){
            const minWidth = settings.links.scaleToBeta.minWidth;
            const scaleFactor = settings.links.scaleToBeta.scaleFactor;
            const currentLineWeight = minWidth + scaleFactor*i/100;

            // Preview 4 example line widths
            g.append("line")
                .attr('x1',scalePos.x+i)  
                .attr('y1',scalePos.y+40) 
                .attr('x2',scalePos.x+2+i) 
                .attr('y2',scalePos.y+40)
                .style("stroke", color)
                .style("stroke-width", currentLineWeight)
        }

        // Mark minimum and maximum on lower side of scale 
        g.append("text") // Beginning
            .attr("x", scalePos.x)
            .attr("y", scalePos.y+60)
            .text('Min')
            .style("fill", color)
            .style("font-size", settings.legend.fontSize*0.75)
            .style("font-family", settings.nodes.labels.font)
            .attr("alignment-baseline","middle")
        g.append("text") // End
            .attr("x", scalePos.x+90)
            .attr("y", scalePos.y+60)
            .text('Max')
            .style("fill", color)
            .style("font-size", settings.legend.fontSize*0.75)
            .style("font-family", settings.nodes.labels.font)
            .attr("alignment-baseline","middle")
    }

}