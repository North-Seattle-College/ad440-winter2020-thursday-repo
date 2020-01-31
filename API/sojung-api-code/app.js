exports.handler = async (event) => {
    var response = {
        statusCode: null, 
        body: null
    };
    
    // get data from the event
    var post_data = event.body;
    
    // check if the event post data is empty
    if (typeof post_data == 'undefined'){
        response = {
            statusCode: 405,
            body: JSON.stringify({
                message: 'Invalid input'
            })
        }
    // check if the property_id in the post data
    // is the correct data type
    } else if(!Number.isInteger(post_data.property_id)
                // to do: check if property id exists
                // in the database here
                ){
                    response = {
                        statusCode: 405,
                        body: JSON.stringify({
                            message: 'Property doesn\'t exist'
                        })
                    }
                } else {
                    response = {
                        statusCode: 200,
                        body: post_data
                    }
                }
                return response;
};

