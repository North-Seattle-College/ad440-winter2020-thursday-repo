
exports.handler = async (event) => {
    let body = event.body;
    var responseCode = null;
    var responseBody = null;

    
    console.log("request: " + JSON.stringify(body));
    
    if (!body.property_id || !body.property_name || !body.property_type || !body.property_address ||
    !body.property_city || !body.property_state || !body.property_zip || !body.property_country){
        responseCode = 400;
        responseBody = {
            message: "Missing data"
        };
    }
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

