const mysql = require('mysql');

// connection credential for mySQl RDS db
const connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT,
  database : process.env.RDS_DATABASE

});

exports.handler = (event, context, callback) => {
  
  // allows for using callbacks as finish/error-handlers
  context.callbackWaitsForEmptyEventLoop = false;
  var queryParams = [
    event.body.first_name,
    event.body.last_name,
    event.body.email,
    event.body.phone,
    event.body.keyholder_type
  ]; 
  
 // SQL query to insert into keyholder table
 // using the foreign key key_holdertype_id from keyholdertype table
 
 var query = "INSERT INTO keyholder (first_name, last_name, email, phone, keyholder_type_id)" + 
             "VALUES ( ?,?,?,?, (SELECT keyholder_type_id FROM keyholdertype WHERE keyholder_type = ? )  );"

  connection.query(query,queryParams, (err, res) => {
    if (err) {
      throw err
    }
    callback(null, '1 record inserted.');
  })
};