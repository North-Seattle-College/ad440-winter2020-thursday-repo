const mysql = require('mysql');
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
    var connection = mysql_connection();
    var queryParams = [
        event.body.property_name,
        event.body.property_type_id,
        event.body.property_address,
        event.body.property_city,
        event.body.property_state,
        event.body.property_zip,
        event.body.property_country
    ];

    var sql = "INSERT INTO property (property_name, property_type_id, property_address, property_city, property_state, property_zip, property_country) VALUES ( ?,?,?,?,?,?,?)";

    connection.query(sql,queryParams, (err, result) => {
        if (err) {
            throw err;

        }
        else{
            console.log("Property Added!" + result);
            connection.end();
            callback(null, "Property created: " + queryParams);
        }
    });
};

