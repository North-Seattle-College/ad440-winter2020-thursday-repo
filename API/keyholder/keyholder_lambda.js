exports.handler = async (event, context, callback) => {
    var response = {
        statusCode: null,
        body: null
    };
    
    var data = event.body
    console.log("This was the JSON that was passed up",data);
    
    //check if the JSON is empty
    if (isEmptyJSON(data)) {
        
        response = {
            statusCode: 400,
            body:JSON.stringify({
                message: "can not create, No record provided"
            })
            
            }
    //check if the right data type is provided
    }else if(typeof data.first_name != 'string' || 
             typeof data.last_name !='string'|| 
             typeof data.email !== 'string' ||
             !Number.isInteger(data.phone)||
             typeof data.keybundle_type != 'string'){
             
         response = {
            statusCode: 500,
            body:JSON.stringify({
                message: "Internal server error",
                })
            }
    // crete keyholder 
    }else {
        response = {
            statusCode: 200,
            body:data
            
        }
    }
    callback(JSON.stringify(response));
};

function isEmptyJSON(json) {
  return !Object.keys(json).length;
}