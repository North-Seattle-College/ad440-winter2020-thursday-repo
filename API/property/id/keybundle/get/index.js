console.info('GET keybundles by propertyID :: function starting...');

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
const jwt = require('jsonwebtoken');

exports.handler = async (event, context, callback) => {
    try {
        let response = {
            property_id: null
        };
        let headers = event.headers;
        console.info('headers: ', headers);
        
        // middleware auth TODO: connect & move
        if (event) {
            const poolOk = 'cognito_userpool_admin';
            let token = headers.Authorization;
            // let idPool = context.identity.cognitoIdentityPoolId;
            console.info('received token: ', token);
            // console.info('identity pool: ', idPool);
            // get the decoded payload and header ignoring signature, no secretOrPrivateKey needed
            let decoded = jwt.decode(token, {complete: true});
            if (decoded) {
                console.info('decoded header: ', decoded.header);
                console.info('decoded payload: ', decoded.payload);
                response['headers'] = { 'Authorization': decoded };
            } else { 
                response['headers'] = { 'Authorization': token }; 
            }
        }
        let pid = event.params.property_id;
        // check methods and params or get error status code returned
        if (event.method != 'GET') {
            console.error('500 status returned: incorrect method call for this function.');
            response = {
                errorMessage:'Server Error !'
            };
            return context.fail(response);
            
        } else if (isNaN(parseInt(pid)) || 
                    parseInt(pid) < 0) {
            console.debug('400 status returned: bad input.');
            response = { 
                errorMessage: 'Bad Request !' };
            return context.fail(response);
        
        } else {            
            // grab param data to fetch
            response.property_id = parseInt(pid);
    
            // create then run sql query from data passed in request
            let query_data = [
                response.property_id,
            ];
            let get_keybundle_query = 'SELECT * FROM keybundle WHERE property_id=?;';
            console.info('\n\nRequesting...: ', query_data);
            response = await cnx.query(get_keybundle_query, query_data);
            await cnx.end();
            
            // verify results
            if (response.length < 1) {
                console.trace();
                console.debug('Queried not found + got: ', response);
                response = {
                    errorMessage:'Not Found !'
                };
                return context.fail(response);
            } else { // return requested info from successful query
                console.log('FINAL RESPONSE: ', response);
                return context.succeed(response[0]);
            }
        }
        
    } catch (e) {
        console.warn('\n\nEXCEPTION: \n', e, '\n');
        console.error(e.message);
        let response = { 
            errorMessage: 'Server Error !' };
        return context.fail(response);
    }
};
