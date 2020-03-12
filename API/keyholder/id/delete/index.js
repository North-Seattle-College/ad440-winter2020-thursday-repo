// delete keyholder by id

const mysql = require('mysql');
console.info("get request for keyholder");

//connection credential for mySQl RDS db
const connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT,
  database : process.env.RDS_DATABASE
});

exports.handler = (event, context, callback) => {
    console.info('Getting reference to database connection')
    // Get reference to database connection
    var connection = mysql_connection();
    console.debug('Requesting keyholder id: ' + event.params.keyholder_id.toString());
    console.info("DELETE request for keyholder");
    
    // Data validation for input parameters to use in query
    if (isNumeric(event.params.keyholder_id)){
        console.trace("valid keyholder-id")
    
        // write database query to get keyholder using the keyholder id
        var query = "DELETE FROM keyholder WHERE keyholder_id = "
 
        // get query params
        var keyholder_id = event.params.keyholder_id.toString();
  
        // wait for mysql server
        connection.query(query, keyholder_id, (err, result)=> {
            if (err) {
                throw err;
                console.trace('DELETE keyholder unsuccessful, pro lem connecting to database')
            } else {
                console.trace("keyholder queried successfully")
                connection.end();
                callback(null, 'DELETE keyholder successful: ' + keyholder_id)
                console.trace('DELETE keyholder successful')
            
            }
        });
    };

};

function isNumeric(value) {
        return /^\d+$/.test(value);
    };