//test dummy data remove from prod
var dummyData = {
    keybundle_id: 123,
    keybundle_status_id: 123,
    property_id: 123,
    keyholder_id: 123,
    keybundle_checkout_date: "1/27/2019",
    keybundle_due_date: "1/30/2019"
}

exports.handler = async (event) => {
    var response = {
        statusCode: null,
        body: null
    };
    console.log(event)
    if (isNumeric(event.pathParams.KeyID) && isNumeric(event.pathParams.Pid)) {
        //TODO search DB for key using pid and keyid and insert data into response body
        dummyData.keybundle_id = parseInt(event.pathParams.KeyID);
        dummyData.property_id = parseInt(event.pathParams.Pid);
        response = {
            statusCode: 200,
            body: dummyData,
        };
    } else {
        response = {
            statusCode: 400
        }
    }
    return response;
};

function isNumeric(value) {
        return /^\d+$/.test(value);
}
