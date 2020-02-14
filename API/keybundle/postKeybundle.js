//npm package for connecting to serverless database
const mysql = require('mysql');

    //credentials and connect to database
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

exports.handler = async (event, context, callback) => {
    
    //connect to the database
    var connection = mysql_connection();
  
    //get post data from the event body
    var queryPost = [
        event.body.keybundle_id,
        event.body.keybundle_status, 
        event.body.property_id,
        event.body.keyholder_id.t
    ];
    
    // sql query to insert keybundle object into database
    var sql_post_keybundle = 'INSERT INTO keybundle (keybundle_id, keybundle_status_id, property_id, keyholder_id) VALUES (?, ?, ?, ?)';
    
    connection.query(connection, queryPost, (err, result)=>{
        if (err){
            throw err;
        } else {
            console.log('Keybundle added' + result);
            connection.end();
            callback(null, 'Property created: ' + queryPost);
        }
    });

};