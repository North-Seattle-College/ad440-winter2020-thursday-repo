// Logging levels:
//Trace: Everything.
//Debug: What user entered, JSON request. What was implemented in the database. 
//(information about database entry for post, put request, returned get request)
//Info: What happened. POST request, PUT REQUEST, GET REQUEST, DELETE. Skeleton of what happened.
//Error: error, 400, 404, 405, 500 would show up



//node package for mysql connection
const mysql = require('mysql');

//credentials needed to connect
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

console.trace("PUT Property by property_id -- function starting --");
console.info("Put Request for Property by property_id");
exports.handler = (event, context, callback) => {
    
    //Property ID to know which property to update
    let property_id = event.params.property_id.toString();
    console.debug("property_id entered: " + property_id);
    
    var connection = mysql_connection();
    console.trace("Successfully connected to the database");

    
    //Data for updating property
    var property_name = event.body.property_name;
    var property_type_id = event.body.property_type_id;
    var property_address = event.body.property_address;
    var property_city = event.body.property_city;
    var property_state = event.body.property_state;
    var property_zip = event.body.property_zip;
    var property_country = event.body.property_country;
    

    console.debug("User entered property_name as " + property_name);
    console.debug("User entered property_type_id as " + property_type_id);
    console.debug("User entered property_address as " + property_address);
    console.debug("User entered property_city as " + property_city);
    console.debug("User entered property_state as " + property_state);
    console.debug("User entered property_zip as " + property_zip);
    console.debug("User entered property_country as " + property_country);


    //mysql update statement
    var sql = "UPDATE property SET property_name =? , property_type_id =? , property_address =? , property_city =? , property_state =? , property_zip =? , property_country =? WHERE property_id = " + property_id ;
    
    //mysql data to be filled inplace of the ?
    var data = [property_name, property_type_id, property_address, property_city, property_state,property_zip, property_country];
    
    connection.query(sql,data, (err, result) => {
        console.trace("Update Query initiated");
        if (err) {
            console.error("error", err);
            throw err;

        }
        else{
            console.info("Property Updated!" + result.message);
            connection.end();
            callback(null, result.message);
        }
    });
    console.trace("PUT Property by property_id -- function end ");

};


