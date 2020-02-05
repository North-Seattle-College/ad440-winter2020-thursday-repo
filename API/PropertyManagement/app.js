//set variables at the beginning
exports.handler = async (event) => {
    const body = event.body;
    var responseCode = null;
    var responseBody = null;

    console.log("request: " + JSON.stringify(body));
    
    //checks to see any of the required data is missing
    if (!body.property_id || !body.property_name || !body.property_type || !body.property_address ||
    !body.property_city || !body.property_state || !body.property_zip || !body.property_country){
        responseCode = 400;
        responseBody = {
            message: "Missing required data"
        };
    
    //checks to ensure that the right data type is provided
    }else if(typeof body.property_id != 'number' || typeof body.property_name != 'string'||
    typeof body.property_type != 'number' || typeof body.property_address != 'string' ||
    typeof body.property_city != 'string' || typeof body.property_state != 'string' ||
    typeof body.property_zip != 'number' || typeof body.property_country != 'string')
    {
        responseCode = 400;
        responseBody = {
            message: "Invalid datatype provided"
        }
    }
    //after both checks pass implement it 
    //COMING SOON with access to database
    else{
        responseCode = 200;
        responseBody = body;
    }
    
    let response = {
        statusCode : responseCode,
        body: JSON.stringify(responseBody)
    };
    console.log("response: " + JSON.stringify(response));
    return response;
};

