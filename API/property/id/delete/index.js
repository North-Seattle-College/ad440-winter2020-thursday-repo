const mysql = require('serverless-mysql')({
  config: {
    host     : process.env.RDS_HOSTNAME,
    port     : process.env.RDS_PORT,
    database : process.env.RDS_DATABASE,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD
  }
});

exports.handler = async(event, context) => {
    console.trace("DELETE property by property id -- function starting --");
    if (isNumeric(event.params.property_id)) {
        
        
        var delete_keybundles_query = "DELETE FROM keybundle WHERE property_id=" + event.params.property_id.toString();
        console.debug("Doing SQL: " + delete_keybundles_query);
        var delete_keybundles_response = await mysql.query(delete_keybundles_query);
        try {
            console.debug("SQL server returned " + delete_property_response);
            var delete_property_query = "DELETE FROM property WHERE property_id =" + event.params.property_id.toString();
            console.debug("Doing SQL: " + delete_property_query);
            try {
                var delete_property_response = await mysql.query(delete_property_query);
                console.debug("SQL server returned " + delete_property_response);
                console.trace("Returned 200: deleted property and associated keybundles");
                if (delete_property_response.affectedRows == 1) {
                    return context.succeed("Default property_id " + event.params.property_id + " deleted and " + delete_keybundles_response.affectedRows + " keybundles deleted");

                }  else {
                    console.trace("Returned 404 Not Found");
                    return context.fail("Not Found ");
                }
            } catch (error) {
                console.trace('Returned 500 Server Error: Failed to delete property ' + error);
                return context.fail("Server Error " + error);
            }
        } catch (error) {
            console.trace('Returned 500 Server Error: Failed to delete associated keybundles ' + error);
            return context.fail("Server Error " + error);
        }
        
    } else {
        console.trace('Returned 400 Bad Request');
        return context.fail("Bad Request ");
    }
};

function isNumeric(value) {
        return /^\d+$/.test(value);
}
