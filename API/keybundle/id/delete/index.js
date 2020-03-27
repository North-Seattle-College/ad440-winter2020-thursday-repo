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
    console.trace("DELETE keybundle by keybundle id -- function starting --")
    if (isNumeric(event.params.keybundle_id)) {
        var delete_keybundle_query = "DELETE FROM keybundle WHERE keybundle_id =" + event.params.keybundle_id.toString();
        console.debug("Doing SQL: " + delete_keybundle_query);
        try {
            var delete_keybundle_response = await mysql.query(delete_keybundle_query);
            console.debug("SQL server returned " + delete_keybundle_response);
            if (delete_keybundle_response.affectedRows == 1) {
                console.trace("Returned 200: deleted keybundle");
                return context.succeed("Default keybundle_id " + event.params.keybundle_id + " deleted");
            } else {
                console.trace("Returned 404 Not Found");
                return context.fail("Not Found ");
            }
        } catch (error) {
            console.trace('Returned 500 Server Error: Failed to delete keybundle ' + error);
            return context.fail("Server Error " + error);
        }
    } else {
        console.trace('Returned 400 Bad Request');
        return context.fail("Bad Request ");
    }
}

function isNumeric(value) {
        return /^\d+$/.test(value);
}



