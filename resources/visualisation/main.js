//Set up event listeners to assign function to button presses
document.getElementById("btn-action").addEventListener("click", generateGraph);

//Define function to run on button press i.e., upload data, parse and pass into FDG funct
function generateGraph () {
        
        var fileReader = new FileReader();
            uploaded_file = document.getElementById('image-file').files[0]
            fileReader.onload = function (e) {FDG(fileReader.result);};
            fileReader.readAsText(uploaded_file);
};
