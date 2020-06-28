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
    console.trace("DELETE keyholder by property id -- function starting --");
    
    var queryParams = event.params.keyholder_id;
    
    if (isNumeric(queryParams)) {
        // Set keyholder query for delete
        var delete_keyholder_query = 'DELETE FROM keyholder WHERE keyholder_id = ' + queryParams;
        console.debug("Doing SQL: " + delete_keyholder_query);
        try {
            var delete_keyholder_response = await mysql.query(delete_keyholder_query);
            console.debug("SQL_server returned " + delete_keyholder_response);
            if (delete_keyholder_response.affectedRows == 1){
                console.trace('Returned 200: deleted keyholder');
                return context.succeed('Default keyholder_id ' + queryParams + 'deleted');
            } else {
                console.trace('Returned 404 Not Found');
                return context.fail('Not Found');
            }
        } catch(error) {
            console.trace('Returned 500 Server Error: Failed to delete keyholder');
            return context.fail("Server Error " + error);
        }
            
    } else {
        console.trace('Returned 400 Bad Request');
        return context.fail('Bad Request!');
    }
}
    
    

function isNumeric(value) {
        return /^\d+$/.test(value);
}