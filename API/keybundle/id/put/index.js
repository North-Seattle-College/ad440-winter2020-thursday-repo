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
    let response = {};
    try {
        let bundleData = {
            keyholder_id: null,
            keybundle_id: null,
            keybundle_status_id: null,
            keybundle_checkout_date: null,
            keybundle_due_date: null,
        };
        let keybundle_id = parseInt(event.params.keybundle_id);

        // check method & inputs in path or return error
        if (event.method != 'PUT') {
            return serverErrorResponse(response);
        } else if (keybundle_id == '' || isNaN(keybundle_id) || keybundle_id < 0) { 
            return badRequestResponse(response);
        } else {            
            // grab body data to update
            bundleData.keybundle_id = parseInt(event.body.keybundle_id);
            bundleData.keyholder_id = parseInt(event.body.keyholder_id);
            bundleData.keybundle_status_id = parseInt(event.body.keybundle_status_id);
            // if no date input, get today's date
            let checkout_date = new Date(event.body.keybundle_checkout_date ? event.body.keybundle_checkout_date : Date.now());
            bundleData.keybundle_checkout_date = toSqlDatetime(checkout_date);
            let due_date = new Date(event.body.keybundle_due_date ? event.body.keybundle_due_date : checkout_date.addDays(14));
            bundleData.keybundle_due_date = toSqlDatetime(due_date);
            
            // check for inputs match
            if (keybundle_id != bundleData.keybundle_id) {
                return badRequestResponse(response);
            };

            // update keybundle data from RDS with query
            let query_data = [
                bundleData.keybundle_status_id,
                bundleData.keyholder_id,
                bundleData.keybundle_checkout_date,
                bundleData.keybundle_due_date,
                bundleData.keybundle_id,
            ];
            let update_keybundle_query = "UPDATE keybundle SET keybundle_status_id=?,keyholder_id=?,keybundle_checkout_date=?,keybundle_due_date=? WHERE keybundle_id=?;";
            console.info('\n\nDATA: ', update_keybundle_query, query_data);
            
            // db connection and run query or get error
            console.log('Connecting...');
            let query_response = await cnx.query(update_keybundle_query, query_data);
            await cnx.end();
            
            // verify results
            if (query_response.affectedRows < 1) {
                return notFoundResponse(response);
            } else { // return requested info from successful query
                console.debug('Feedback from database: ', query_response);
                let get_updated_keybundle = "SELECT * FROM keybundle WHERE keybundle_id=?;";
                query_data = [ bundleData.keybundle_id ];
                response = await cnx.query(get_updated_keybundle, query_data);
                await cnx.end();
                console.info('FINAL RESPONSE: ', response);
                return response[0];
            }
        }
    } catch (e) {
        response = serverErrorResponse(response);
        console.warn('\n\nEXCEPTION: \n', e, '\n');
        response.message = { 'ERROR_MSG': 'Server Error :: ' + e.message };
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

function notFoundResponse(response) {
    console.trace();
    console.debug('Queried not found + got: ', response);
    response.message = "Not Found !"
    return response;
}

function serverErrorResponse(response) {
    console.error('500 error returned');
    response.message = "Server Error !";
    return response;
}

function badRequestResponse(response) {
    console.debug('400 status returned: bad input.');
    response.message = "Bad Request !"
    return response;
}
