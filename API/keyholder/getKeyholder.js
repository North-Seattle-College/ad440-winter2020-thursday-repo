// Get a specific keyholder

// SQL database connection
const mysql = require('mysql')
function mysql_connection(){
    var params={
        host     : process.env.RDS_HOSTNAME,
        user     : process.env.RDS_USERNAME,
        password : process.env.RDS_PASSWORD,
        port     : process.env.RDS_PORT,
        database : process.env.RDS_DATABASE
    };
    return mysql.createConnection(params);
}


exports.handler = (event, context, callback) => {
    // Get reference to database connection
    var connection = mysql_connection();
    
    // logging during development
  console.trace("GET keyholder function call");
  console.debug("Requested keyholder_id: " + event.params.keyholder_id.toString());
  console.info("GET request for keyholder");
    
    // check the data type of the input param
    if (isNumeric(event.body.keyholder_id)) {
    console.trace("keyholder_id data type checked");
    
    // write database query to get keyholder using the keyholder id
    var query = "GET FROM keyholder WHERE keyholder_id = " 
    
    // get query params
    var keyholder_id = event.params.keyholder_id.toString();
    
    // wait for mysql server 
    connection.query(query, keyholder_id, (err, result)=> {
        if (err) {
            throw err;
            console.trace('GET keyholder unsuccessful')
        } else {
            console.trace("keyholder queried successfully")
            connection.end();
            callback(null, 'GET keyholder successful: ' + keyholder_id)
            console.trace('GET keyholder successful')
            
        }
    });


function isNumeric(value) {
        return /^\d+$/.test(value);
}