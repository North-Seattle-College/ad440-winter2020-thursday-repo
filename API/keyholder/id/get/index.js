const mysql = require('mysql');
console.info("get request for all keys by a keyholder ");

//connection credential for mySQl RDS db
const connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT,
  database : process.env.RDS_DATABASE

});
console.trace("Api for get all keys by a keyholder started...")

exports.handler = (event, context, callback) => {
  
  // allows for using callbacks as finish/error-handlers
  context.callbackWaitsForEmptyEventLoop = false;
  console.debug("variable Response  intialized ");
  var response = {
            keyholder_id: null
        };
  // check for keyholder_id value     
  if (isNaN(parseInt(event.params.keyholder_id)) || 
                    parseInt(event.params.keyholder_id) < 0) {
            response = { 
                statusCode: 400,
                errorMessage: "Bad Request !" };
          context.fail(response.errorMessage);
          console.debug(response.errorMessage);                 
  } else {
    
    response.keyholder_id = parseInt(event.params.keyholder_id);
    console.debug("keyholder_id =", response.errorMessage)
  }
    // path param from url for allowing allkeys to show
    
    var queryParam;
    var query;
    if( event.query.allKeys==true){
       queryParam=[
                response.keyholder_id
            ];
       query = "SELECT * FROM keybundle WHERE keyholder_id = ? ;"
    }
    // return  just the keyholder not the keys
    else{
      queryParam=[
                response.keyholder_id
            ];
      query = "SELECT * FROM  keyholder WHERE keyholder_id =?;"
    }
      console.info("tryinng to connect eith db");
      
    connection.query(queryParam,query, (err, res) => {
       if (err) {
         console.error("problem with database ")
         throw err
        
       }
       console.trace("connected to database")
       callback(null,res);
       console.info("result sent to url");
    })
 
};

    