console.log("PUT keybundle :: function starting...");

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
            keyholder_id: null,
            keybundle_id: null,
            keybundle_status_id: null,
            keybundle_checkout_date: null,
            keybundle_due_date: null,
        };
        const date = new Date(Date.now());

        // check method & inputs in path or return error
        if (! event.method === 'PUT') {
            console.error('500 returned');
            response = {
                statusCode: 500,
                message:"Server Error !"
            };
        } else if (event.params.keybundle_id) { 
            console.debug('400 status returned: bad input.');
            response = {
                statusCode: 400,
                message:"Bad Request !"
            };
        } else {            
            // grab body data to update
            response.keybundle_id = parseInt(event.body.keybundle_id);
            response.keyholder_id = parseInt(event.body.keyholder_id);
            response.keybundle_status_id = parseInt(event.body.keybundle_status_id);
            response.keybundle_checkout_date = toSqlDatetime(date);
            response.keybundle_due_date = toSqlDatetime(date.addDays(14));
            
            // check for inputs match
            if (event.params.keybundle_id != response.keybundle_id) {
                console.debug('400 status returned: bad input.');
                response = {
                    statusCode: 400,
                    message:"Bad Request !"
                };
                return response;
            };

            // update keybundle data from RDS with query
            let query_data = [
                response.keybundle_status_id,
                response.keyholder_id,
                response.keybundle_checkout_date,
                response.keybundle_due_date,
                response.keybundle_id,
            ];
            let update_keybundle_query = "UPDATE keybundle SET keybundle_status_id=?,keyholder_id=?,keybundle_checkout_date=?,keybundle_due_date=? WHERE keybundle_id=?;";
            console.log('\n\nDATA: ', update_keybundle_query, query_data);
            
            // db connection and run query or get error
            console.log('Connecting...');
            response = await cnx.query(get_property_query, query_data);
            await cnx.end();
            
            // verify results
            if (response.length < 1) {
                console.trace();
                console.debug('Queried not found + got: ', response);
                response = {
                    statusCode: 404,
                    message:"Not Found !"
                };
                return response;
            } else { // return requested info from successful query
                console.log('FINAL RESPONSE: ', response);
                return response[0];
            }
        }
    } catch (e) {
        console.warn('\nServer Error !\nEXCEPTION: \n', e, '\n');
        let response = { ERROR_MSG:e.message };
        return response;
    }
};

// date.addDays(n) function will add n days to the Date being called
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
// this will return correctly formatted SQL date when used on Date
const toSqlDatetime = (inputDate) => {
    const date = new Date(inputDate)
    const dateWithOffest = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    return dateWithOffest
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
}