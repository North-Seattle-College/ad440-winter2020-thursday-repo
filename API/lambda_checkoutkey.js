exports.handler = async (event, context, callback) => {
    try {
        let response = {
            propertyId: null,
            keyId: null,
            keyholderId: null,
            keybundleId: null,
            keybundleStatusId: null,
            keybundleCheckoutDate: null,
            keybundleDueDate: null,
        };
        const date = new Date(Date.now());
        if (event.method === 'PUT') {
            response.propertyId = parseInt(event.pathParams.Pid);
            response.keyId = parseInt(event.pathParams.KeyID);
            response.keybundleCheckoutDate = date.toString();
            response.keybundleDueDate = date.addDays(14).toString();
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

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
