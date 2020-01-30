exports.handler = async (event) => {
    console.log(event)
    try {
        let response = {
            headers: {},
            body: null,
            statusCode: null
        };
        
        // const propertyId = event.pathParameters.Pid;
        // const keyId = event.pathParameters.KeyID;
        
        if (event) { // .context['http-method'] === 'PUT') {
            response = {
                headers: {},
                body: JSON.stringify("Checked out property key"),
                statusCode: 200
            };
            // console.log('\nPid: ', propertyId, '\nKeyID: ', keyId)
            // TODO: parse and store data accordingly aka key checked out
        } else { 
            // TODO: add data + key that does not exist when db
            response = {
                body: JSON.stringify("Bad server!"),
                statusCode: 500,
            };
        };
        return response;

    } catch (e) {
        console.log('\n\nError:\n', e, '\n');
    }
};