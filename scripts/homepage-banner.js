/*
Splash cinematic script
*/

// Animate welcome banner on page load
window.onload = animateBanner;

// Function to animate the welcome banner
function animateBanner(){
    
    // Set SVG height to fill window container
    svgContainerHeight = document.getElementById('banner').offsetHeight;
        document.getElementById('svg-intro').setAttribute('height', svgContainerHeight);
    svgContainerWidth = document.getElementById('banner').offsetWidth;
        document.getElementById('svg-intro').setAttribute('width', svgContainerWidth);

    // Select SVG DOM element
    const svg = d3.select('#svg-intro'),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        viewBox = +svg.attr("viewBox", `0 0 100 100`);
    console.log(`Got SVG (${width} x ${height})`);

    // Format SVG
    //document.getElementById('svg-intro').style.filter = "blur(1px)"; // Blur

    // Add items to SVG
    previousNode={x:0,y:0};
    setInterval(function(){
        
        // Randomly place node
        let x = Math.random()*100;
        let y = Math.random()*100;

        // Draw line to previous node behind this node
        if(Math.random()>0.5){
            addLine({x:x,y:y}, previousNode, Math.random(), 6000);
        }
        previousNode={x:x,y:y}; // Then record this node's position for the next

        // Create node
        addNode({x:x,y:y}, 2+(Math.random()*5), 12000);

    }, 500);
    
}

// Function to add node circle to SVG
function addNode(position={x:0,y:0}, size=5, interval=5000, id=`node${Math.floor(Math.random()*1000)}`){

    // Show 25% of nodes as icons
    if(Math.random()>0.75){

        // Show as icon
        var image = d3.select('#svg-intro').append("svg:image")
        .attr("xlink:href",  `img/epicons/${icons[Math.floor(Math.random()*labels.length)]}.png`)
        .attr("x", position.x)
        .attr("y", position.y)
        .attr("height", size)
        .attr("width", size)
        .attr('id', id)
        .style('filter', 'brightness(150%)')
        .style('opacity', 0)
        .transition()
        .duration(interval/3)
        .style('opacity', 1)
        .transition()
        .duration(interval/3)
        .style('opacity', 0);

        
    } else {

        // Show as circle with text
        var circle = d3.select('#svg-intro').append('circle')
            .attr("cx", position.x)
            .attr("cy", position.y)
            .attr("r", size)
            .style('fill', d3.interpolateGnBu(Math.random()))
            .attr('id', id)
            .style('opacity', 0)
            .transition()
            .duration(interval/3)
            .style('opacity', 1)
            .transition()
            .duration(interval/3)
            .style('opacity', 0);

        var nodeText = d3.select('#svg-intro').append("text")
            .attr('id', `${id}_text`)
            .text(labels[Math.floor(Math.random()*labels.length)])
            .style("font-size", 2)
            .attr('text-anchor', 'center')
            .style('text-shadow','0 0 3px black')
            .attr("x", position.x)
            .attr("y", position.y)
            .attr('fill', 'ghostwhite')
            .style('opacity', 0)
            .transition()
            .duration(interval/3)
            .style('opacity', 1)
            .transition()
            .duration(interval/3)
            .style('opacity', 0);
    }   

    setTimeout(function(){
        d3.select(`#${id}`).remove();
        d3.select(`#${id}_text`).remove();
    }, interval)
}

// Function to add lines to SVG
function addLine(origin={x:0,y:0}, target={x:0,y:0}, width=0.5, interval=2500, id=`line${Math.floor(Math.random()*1000)}`){

    var line = d3.select('#svg-intro').append("line")
        .attr('id', id)
        .attr("x1", origin.x)
        .attr("y1", origin.y)
        .attr("x2", target.x)
        .attr("y2", target.y)
        .attr("stroke-width", width)
        .attr("stroke", 'ghostwhite')
        .attr('stroke-linecap', 'round')
        .style('opacity', 0)
        .transition()
        .duration(interval/3)
        .style('opacity', 0.25)
        .transition()
        .duration(interval/3)
        .style('opacity', 0);

    setTimeout(function(){
        d3.select(`#${id}`).remove();
    }, interval)
}

/* Animations */
// Function to move element 
function moveElement(id, position={x:0,y:0}, duration=0){
   
    d3.select(`#${id}`).transition()
        .duration(0)
        .attr('x', position.x)
        .attr('y', position.y);
}

// List of labels to populate nodes with
const labels=[
    'Sleep',
    'Eveningness',
    'Insomnia',
    'Happiness',
    'Depression',
    'Worry',
    'Alcohol',
    'Smoking',
    'Education',
    'BMI',
    'Intelligence',
    'Loneliness',
    'Exercise',
    'Socialising',
    'Neuroticism',
    'Coffee',
    'Diabetes',
    'CHD',
    'Wellbeing',
    'Sleeplessness',
]

const icons = [
    'mh_depression2', //Depression, 
    'mh_anxiety2', //Worry, 
    'wellbeing2_alt', //Wellbeing, 
    'social_loneliness', //Loneliness, 
    'sleep_insomnia', //Sleeplessness, 
    'sleep_insomnia', //ICD10 Insomni, 
    'wellbeing2_alt', //Happiness, 
    'mh_ocd2', //Neuroticism, 
    'drinking', //Alcohol, 
    'education_schoolYears', //Education, 
    'bmi', //BMI, 
    'intelligence', //Intelligence, 
    'eveningness', //Eveningness, 
    'social_chatBubble', //Not socialising, 
    'smoking', //Smoking, 
    'exercise_bike', //Exercise, 
    'caffeine', //Coffee intake, 
    'chd_alt', //CHD, 
    'sleep', //Sleep duration, 
    'diabetes', //Diabetes
]