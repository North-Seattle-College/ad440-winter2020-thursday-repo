const mysql = require('mysql');
console.info("Post keyholder strted");
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
  console.trace("varaible for json body intialized")
  var first_name=event.body.first_name;
  var last_name=event.body.last_name;
  var email=event.body.email;
  var phone=event.body.phone;
  var keyholder_type_id=event.body.keyholder_type_id;
  
  console.trace("Query params list created")

  var queryParams = [
    first_name,
    last_name,
    email,
    phone,
    keyholder_type_id
  ]; 
  
  var error = new Error("wrong datatype inside json");
    
  //check if the right data type is provided

  if(typeof first_name != 'string' || 
     typeof last_name !='string'   || 
     typeof email != 'string'     ||
     typeof phone != 'string'       ){
    console.error(error);
    context.fail("Bad Request " + error);


 // SQL query to insert into keyholder table
 // using the forign key key_holdertype_id from keyholdertype table
 
 }else{
    var query = "INSERT INTO keyholder (first_name, last_name, email, phone, keyholder_type_id)" + 
               "VALUES ( ?,?,?,?, (SELECT keyholder_type_id FROM keyholdertype WHERE keyholder_type_id = ? )  );"
  
    connection.query(query,queryParams, (err, res) => {
      if (err) {
        context.fail("Server Error " + error);
      }
      callback(null,"Inserted keyholder_id: "+res.insertId);
    })
 }
 };