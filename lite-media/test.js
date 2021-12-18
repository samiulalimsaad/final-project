function modifyArray(arr, callback) { 
    var arr = [1, 2, 3, 4, 5]; 
    modifyArray(arr, function() { 
        console.log("array has been modified", arr); 
    });