exports.handler = async (event) => {
    var response = {
        statusCode: null, 
        body: null
    };
    
    var post_data = event.body;
    
    if (typeof post_data == 'undefined'){
        response = {
            statusCode: 405,
            body: JSON.stringify({
                message: 'Invalid input'
            })
        }
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

