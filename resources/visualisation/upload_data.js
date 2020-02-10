//GLobal data variable
uploadedData = null;

//Action on form input
    //Set event listener on button
    document.getElementById("btn-action").addEventListener("click", action);
    
    //Define function to run on button press i.e., upload data and read it into variable
    function action () {
        
        //Select file uploaded to form
        const selectedFile = document.getElementById('image-file').files[0];
        
        //Parse its contents
        var fileReader = new FileReader();
        file_one = document.getElementById('image-file').files[0]

            fileReader.onload = function (e) {
                uploadedData = fileReader.result
                console.log(uploadedData);
            };

            fileReader.readAsText(file_one);
    }