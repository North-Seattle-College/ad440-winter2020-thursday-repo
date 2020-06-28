//PUT property by id 
console.trace("PUT Property by property_id -- function starting --");

//import package for connecting to database
const connection = require('serverless-mysql')({
config: {
    host     : process.env.RDS_HOSTNAME,
    port     : process.env.RDS_PORT,
    database : process.env.RDS_DATABASE,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD
    },
});

exports.handler = async (event, context) => {
    let response = {};

    try {
      let queryParams = {
        property_id: null,
        property_name: null,
        property_type_id: null,
        property_address: null,
        property_city: null,
        property_state: null,
        property_zip: null,
        property_country: null,
      };
      
      let property_id = parseInt(event.params.property_id);
      console.debug("Updating property_id: : " + property_id.toString());
      
      if(event.method != 'PUT'){
        return serverErrorResponse(response);
      }else if(property_id == '' || isNaN(property_id) || property_id<0){
        return badRequestResponse(response);
      }else{
        queryParams.property_name = event.body.property_name;
        queryParams.property_type_id = parseInt(event.body.property_type_id);
        queryParams.property_address = event.body.property_address;
        queryParams.property_city = event.body.property_city;
        queryParams.property_state = event.body.property_state;
        queryParams.property_zip = event.body.property_zip;
        queryParams.property_country = event.body.property_country;
      }
      
      // update keybundle data from RDS with query
      let query_data = [
        queryParams.property_name,
        queryParams.property_type_id,
        queryParams.property_address,
        queryParams.property_city,
        queryParams.property_state,
        queryParams.property_zip,
        queryParams.property_country,
        queryParams.property_id,
      ];      
    
    
      //mysql update statement
      var sql = "UPDATE property SET property_name =? , property_type_id =? , property_address =? , property_city =? , property_state =? , property_zip =? , property_country =? WHERE property_id = " + event.params.property_id;
      console.debug("Query: " + sql + " with data " + query_data);

      // db connection and run query or get error
      console.log('Connecting...');
      let query_response = await connection.query(sql, query_data);
      await connection.end();
      
      // verify results
            if (query_response.affectedRows < 1) {
                return notFoundResponse(response);
            } else { // return requested info from successful query
                console.debug('Feedback from database: ', query_response);
                let sql2 = "SELECT * FROM property WHERE property_id = " + event.params.property_id;
                response = await connection.query(sql2);
                await connection.end();
                console.info('Property updated: ', response);
                return response[0];
            }
        
    } catch (e) {
        response = serverErrorResponse(response);
        console.warn('\n\nEXCEPTION: \n', e, '\n');
        response.message = { 'ERROR_MSG': 'Server Error :: ' + e.message };
        return response;
    }
    
};

function notFoundResponse(response) {
    console.trace();
    console.debug('Queried not found + got: ', response);
    response.message = "Not Found !";
    return response;
}

function serverErrorResponse(response) {
    console.error('500 error returned');
    response.message = "Server Error !";
    return response;
}

function badRequestResponse(response) {
    console.debug('400 status returned: bad input.');
    response.message = "Bad Request !";
    return response;
}