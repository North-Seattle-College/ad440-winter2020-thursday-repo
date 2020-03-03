console.info("GET property by ID :: function starting...");

// serverless mysql import and connection
const cnx = require('serverless-mysql')({
    config: {
        host     : process.env.RDS_HOSTNAME,
        user     : process.env.RDS_USERNAME,
        password : process.env.RDS_PASSWORD,
        port     : process.env.RDS_PORT,
        database : process.env.RDS_DATABASE
    }
});

exports.handler = async (event, context) => {
    try {
        let response = {
            property_id: null
        };

        // check methods and params or get error status code returned
        if (event.method != 'GET') {
            console.error('500 status returned: incorrect method call.');
            response = {
                statusCode: 500,
                errorMessage:"Server Error !"
            };
            return context.fail(response.errorMessage);
            
        } else if (isNaN(parseInt(event.params.property_id)) || 
                    parseInt(event.params.property_id) < 0) {
            console.debug('400 status returned: bad input.');
            response = { 
                statusCode: 400,
                errorMessage: "Bad Request !" };
            return context.fail(response.errorMessage);
        
        } else {            
            // grab param data to fetch
            response.property_id = parseInt(event.params.property_id);
    
            // create then run sql query from data passed in request
            let query_data = [
                response.property_id,
            ];
            let get_property_query = "SELECT * FROM property WHERE property_id=?;";
            console.info('\n\nRequesting...: ', query_data);
            response = await cnx.query(get_property_query, query_data);
            await cnx.end();
            
            // verify results
            if (response.length < 1) {
                console.trace();
                console.debug('Queried not found + got: ', response);
                response = {
                    statusCode: 404,
                    errorMessage:"Not Found !"
                };
                return context.fail(response.errorMessage);
            } else { // return requested info from successful query
                console.log('FINAL RESPONSE: ', response);
                return context.succeed(response[0]);
            }
        }
        
    } catch (e) {
        console.warn('\n\nEXCEPTION: \n', e, '\n');
        console.error(e.message);
        let response = { 
            statusCode: 500, 
            errorMessage: 'Server Error !' };
        return context.fail(response.errorMessage);
    }
};
