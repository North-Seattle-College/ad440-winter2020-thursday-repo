const mysql = require('serverless-mysql')({
  config: {
    host     : process.env.RDS_HOSTNAME,
    port     : process.env.RDS_PORT,
    database : process.env.RDS_DATABASE,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD
  },
  onError: (e) => { console.log('MYSQL Error:',e.message) },
});

exports.handler = async (event, context) => {
    console.trace("GET keybundle by id -- function starting --");
    if (isNumeric(event.params.keybundle_id)) {
        var get_keybundle_query = "SELECT * FROM keybundle WHERE keybundle_id=" + event.params.keybundle_id;
        console.debug("Doing SQL: " + get_keybundle_query);
        try {
            var keybundleList = await mysql.query(get_keybundle_query)
            console.debug("SQL server returned " + keybundleList);
            if (keybundleList.length > 0) {
                console.trace('Returned 200 Not Found: Failed to find keybundle id');
                let response = {
                    statusCode: 200,
                    body: keybundleList[0],
                    message: "Default "
                }
                return context.succeed(response);
            } else {
                console.trace('Returned 404 Not Found: Failed to find keybundle id');
                return context.fail("Not Found ");
            }
            
        } catch (error) {
            console.trace('Returned 500 Server Error: Failed to get keybundle');
            return context.fail("Server Error " + error);
        }
        
    } else {
        console.trace('Returned 400 Bad Request');
        return context.fail("Bad Request !");
    }
};

function isNumeric(value) {
        return /^\d+$/.test(value);
}