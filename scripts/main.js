//Set up event listeners to assign function to button presses
document.getElementById("btn-action").addEventListener("click", generateGraph);

//Define function to run on button press i.e., upload data, parse and pass into FDG funct
function generateGraph () {  
    
    var pval_limit = document.getElementById("pval_limit").value
    
    var fileReader = new FileReader();
        fileReader.onload = function (e) {
            uploaded_file = fileReader.result;
            var data = Papa.parse(uploaded_file);
            
            FDG("destruction");
            json = buildJson(data['data']);
            FDG(json);
            
            //FDG(data)
        };
        fileReader.readAsText(document.getElementById('image-file').files[0]);    
    
    function buildJson (csv) {
        
        nodesList = ["id.exposure", "id.outcome", undefined, "",]
        relationships=[]
        nodes = []
        links = []
        zList = {}
        counter = 0
        counter2 = 0
        
        for (i in csv) {
            
            //nodes
            if (nodesList.includes(csv[i][0])==false){
                nodesList.push(csv[i][0])
                nodes.push({
                    "id" : csv[i][0],
                    "short_name" : shortenName(csv[i][3])
                })
            }
            if (nodesList.includes(csv[i][1])==false){
                nodesList.push(csv[i][1])
                nodes.push({
                    "id" : csv[i][1],
                    "short_name" : shortenName(csv[i][2])
                })
            }
            //links
            if (csv[i][0] != "id.exposure" && csv[i][0] != undefined && csv[i][0] != "" && csv[i][8] < pval_limit){
                
                //relationships.push([csv[i][0],csv[i][1]])
                //bidirectional=relationships.includes([csv[i][1],csv[i][0]])
                //console.log(bidirectional)
                bidirectional=false;
                
                links.push({
                    "id" : counter,
                    "source" : csv[i][0],
                    "target" : csv[i][1],
                    "source_name" : shortenName(csv[i][2]),
                    "target_name" : shortenName(csv[i][3]),
                    "method" : csv[i][4],
                    "nsnp" : csv[i][5],
                    "b" : csv[i][6],
                    "se" : csv[i][7],
                    "pval" : csv[i][8],
                    "color" : colourThisNode(bidirectional, csv[i][6]),
                    "dash" : decorateThisLink(csv[i][9])
                })
            }
            
            counter++
        }
            
        recompiledData = {'nodes' : nodes, 'links' : links}
        return(recompiledData)
        
    }
    
    function shortenName(name){
        if(name === undefined){
            return;
        }
        
        if (name.includes(" || ")){
            cleanName = name.split(" || ")[0];
        } else {cleanName = name;}
        console.log("cleanname: ", cleanName)
        
        if (cleanName.includes(":")){
            specificName = cleanName.split(":")[1];
        } else {specificName = cleanName;}
        console.log(specificName);
        
        if(specificName.length > 20){
            console.log(specificName.substring(0,20)+'.');
            return(specificName.substring(0,20)+'.');
        } else {return (specificName);}
        
    }
    
    function colourThisNode(bidirectional, b){
        if (bidirectional==true){return("rgba(250, 125, 250, 0.5)");}
        else if (b<0){return("rgba(248, 131, 121, 0.5)");}
        else {return ("rgba(100, 149, 237, 0.5)");}
    }
    
    function decorateThisLink(response){
        if (response=='Yes'){return(3, 3);}
        else {return (null);}
    }
};