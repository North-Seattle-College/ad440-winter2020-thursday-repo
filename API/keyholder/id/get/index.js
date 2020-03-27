
const mysql = require('mysql');
console.info("get request  keyholder by id ");
//connection credential for mySQl RDS db
const connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT,
  database : process.env.RDS_DATABASE

});


console.trace("Api for keyholder by id started...");

exports.handler = (event, context, callback) => {
  console.log(event);

  // allows for using callbacks as finish/error-handlers
  context.callbackWaitsForEmptyEventLoop = false;
  console.debug("variable Response  intialized ");
  var response = {
            keyholder_id: null
        };
  // check for keyholder_id value     
  if (isNaN(parseInt(event.params.keyholder_id)) || 
                    parseInt(event.params.keyholder_id) < 0) {
            
          context.fail("Bad Request ");
  } else {
     // path param from url 

    response.keyholder_id = parseInt(event.params.keyholder_id);
    console.debug("keyholder_id =", response.keyholder_id)
  }
    // query to return keyholder by id

     var   query = "SELECT * FROM keyholder WHERE keyholder_id =" +
                   response.keyholder_id + " ;"
    
     console.log(query);
     console.info("tryinng to connect to db...");
      
    connection.query(query, (err, res) => {
       
       if (err) {
         console.error("problem with database ")
         context.fail("Server error ");
        
       }
      
       console.info("res =  "+ res);

       if(res.length ==0 ){
         context.fail("Not Found ");

        
       }
       console.trace("connected to database")
       callback(null,res);
       console.info("result sent to url");
    })
 

};
