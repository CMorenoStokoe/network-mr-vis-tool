//Set up event listeners to assign function to button presses
document.getElementById("btn-action").addEventListener("click", generateGraph);

//Define function to run on button press i.e., upload data, parse and pass into FDG funct
function generateGraph () {  

    var fileReader = new FileReader();
        fileReader.onload = function (e) {
            uploaded_file = fileReader.result;
            var data = Papa.parse(uploaded_file);
            
            console.log("got upload: ", data);
            
            json = buildJson(data['data']);
            FDG(json)
            
            //FDG(data)
        };
        fileReader.readAsText(document.getElementById('image-file').files[0]);    
    
    function buildJson (csv) {
        
        console.log("buildJson called with payload: ", csv)
        
        nodesList = ["id.exposure", "id.outcome", undefined, "",]
        nodes = []
        links = []
        counter = 0
        
        for (i in csv) {
            console.log("scanned node: ", csv[i][3])

            //nodes
            if (nodesList.includes(csv[i][0])==false){
                nodesList.push(csv[i][0])
                nodes.push({
                    "id" : csv[i][0],
                    "short_name" : removeIdFromName(csv[i][3])
                })
            }
            if (nodesList.includes(csv[i][1])==false){
                nodesList.push(csv[i][1])
                nodes.push({
                    "id" : csv[i][1],
                    "short_name" : removeIdFromName(csv[i][2])
                })
            }
            //links
            if (csv[i][0] != "id.exposure" && csv[i][0] != undefined && csv[i][0] != ""){
                links.push({
                    "id" : counter,
                    "source" : csv[i][0],
                    "target" : csv[i][1],
                    "source_name" : csv[i][2],
                    "target_name" : csv[i][3],
                    "method" : csv[i][4],
                    "nsnp" : csv[i][5],
                    "b" : csv[i][6],
                    "se" : csv[i][7],
                    "pval" : csv[i][8],
                    "color": colourThisNode(csv[i][6])
            })
            }
            
            counter++
        }
            
        recompiledData = {'nodes' : nodes, 'links' : links}
        console.log("compiled nodes, links: ", recompiledData)
        return(recompiledData)
        
    }
    
    function removeIdFromName(name){
        if(name === undefined){
            return;
        }
        cleanName = name.split(" || ");
        return (cleanName[0])
    }
    
    function colourThisNode(b){
        if (b<0){return("red")} 
        else {return ("blue")}
    }
    
};
