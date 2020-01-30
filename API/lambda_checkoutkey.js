exports.handler = async (event, context, callback) => {
	console.log("EVENT : ", JSON.stringify(event));
	console.log("\nCONTEXT : ", JSON.stringify(context));
    try {
        let response = {
            headers: {},
            body: null,
            statusCode: null
        };
        let propertyId = null;
        let keyId = null;
        if (event.method === 'PUT') {
            propertyId = parseInt(event.pathParams.Pid);
            keyId = parseInt(event.pathParams.KeyID);
            response = {
                headers: {},
                body: JSON.stringify({"OUT":keyId}),
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