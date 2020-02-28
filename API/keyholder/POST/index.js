//PUT Keyholder by id 

// Logging levels:
//Trace: Everything.
//Debug: What user entered, JSON request. What was implemented in the database. 
//(information about database entry for post, put request, returned get request)
//Info: What happened. POST request, PUT REQUEST, GET REQUEST, DELETE. Skeleton of what happened.
//Error: error, 400, 404, 405, 500 would show up

//import package for connecting to database
const mysql = require('mysql');

//credentials
const connection = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    port     : process.env.RDS_PORT,
    database : process.env.RDS_DATABASE,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD
});

console.trace("PUT keyholder by keyholder_id -- function starting --");
exports.handler = (event, context, callback) => {
  console.trace('connected as id ' + connection.threadId);
  
  // allows for using callbacks as finish/error-handlers
  context.callbackWaitsForEmptyEventLoop = false;
  
  //body parameters for changing data
  let keyholder_id=event.body.keyholder_id;
  let first_name=event.body.first_name;
  let last_name=event.body.last_name;
  let email=event.body.email;
  let phone=event.body.phone;
  let keyholder_type=event.body.keyholder_type;
 
 //query parameters
  let queryParams = [
    keyholder_id,
    first_name,
    last_name,
    email,
    phone,
    keyholder_type
  ]; 

  //data type error handling
  let error = new Error("wrong datatype inside json");
    
  //check if the right data type is provided
  let i = 1;
  
  if(i==2)
    // typeof first_name != 'string' || 
    // typeof last_name !='string'   || 
    // typeof email != 'string'     ||
    // typeof phone != 'string'     ||
    // typeof keyholder_type_id != 'number')
    {
     context.fail(error);

 }else{
   // SQL query to update keyholder

  let query = "UPDATE keyholder SET first_name=?,last_name=?,email=?,phone=?, keyholder_type_id=? WHERE keyholder_id=" + event.params.keyholder_id.toString() + ";";
  
  connection.query(query,queryParams, (err, response) => {
    if (err) {
      throw err;
    }
    callback(null,response);
  });
 }
};
console.trace("PUT keyholder by keyholder_id -- function end ");

//destroying connection to eliminate possibility of additional callbacks or events 
connection.destroy();