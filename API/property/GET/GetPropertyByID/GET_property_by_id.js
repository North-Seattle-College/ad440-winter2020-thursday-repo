console.log("GET property by ID :: function starting...");

// mysql import and connection
const mysql = require('mysql');

exports.handler = (event, context, callback) => {
    try {
        let response = {
            property_id: null,
            property_name: null,
            property_type_id: null,
            property_address: null,
            property_city: null,
            property_state: null,
            property_zip: null,
            property_country: null
        };

        if (event.method != 'GET') {
            console.debug('400 status returned: bad input.');
            response = {
                statusCode: 400,
                message:"Bad input!"
        };
        // allows for using callbacks as finish/error-handlers
        context.callbackWaitsForEmptyEventLoop = false;
        
        // grab param data to update
        response.property_id = parseInt(event.pathParams.property_id);
        
        // check for inputs match
        if (response.property_id < 0 || isNaN(response.property_id)) {
            console.debug('400 status returned: bad input.');
            response = {
                statusCode: 400,
                message:"Bad input!"
            };
            return response;
        };

        // create query from data passed in request
        let query_data = [
            response.property_id,
        ];
        let get_property_query = "SELECT ? FROM property;";
        console.log('\n\nDATA: ', get_property_query, query_data);
        
        const cnx = mysql.createConnection({
            host     : process.env.RDS_HOSTNAME,
            user     : process.env.RDS_temp_USERNAME,
            password : process.env.RDS_temp_PASSWORD,
            port     : process.env.RDS_PORT,
            database : process.env.RDS_DATABASE
        });
        console.log('Connecting...');
            cnx.query(get_property_query, query_data, (error, results, callback) => {
                if (error) {
                    console.error('QUERY ERROR: ', error);
                    console.trace();
                    cnx.destroy();
                    // throw error;
                } else {
                    // connected!
                    console.log('QUERY SUCCESS: ', results);
                    // callback(null, results);
                    cnx.end();
                    console.info('OK: CONNECTION ENDED')
                }
            });
            response = {
                statusCode: 200,
                body: query_data
            }
        }
        // } else { 
        //     console.error('500 returned');
        //     response = {
        //         statusCode: 500,
        //         message:"Bad server!"
        //     };
        // };
        console.log('FINAL RESPONSE: ', response);
        return response;
    } catch (e) {
        console.warn('\n\nEXCEPTION: \n', e, '\n');
        let response = { ERROR_MSG:e.message };
        return response;
    };
};