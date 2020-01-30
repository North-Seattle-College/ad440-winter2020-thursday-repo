exports.handler = async (event, context, callback) => {
	console.log("EVENT : ", JSON.stringify(event));
	console.log("\nCONTEXT : ", JSON.stringify(context));
    try {
        let response = {
            headers: {},
            body: null,
            statusCode: null
        };
        
        // const propertyId = event.pathParams['Pid'];
        // const keyId = event.pathParams.KeyID;
        
        if (event.method === 'PUT') {
            response = {
                headers: {},
                body: JSON.stringify("Checked out property key : ", event.pathParams),
                statusCode: 200
            };
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
    };
};