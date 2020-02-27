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
console.trace("Api for get keyholder started...")
exports.handler = (event, context, callback) => {
  
  // allows for using callbacks as finish/error-handlers
  context.callbackWaitsForEmptyEventLoop = false;
  console.debug("variable numRows intialized");
  var numRows;
  
  connection.query('SELECT count(*) as numRows FROM keyholder;', (err, res) => {
    if (err) {
      console.error("problem with database ")
      throw err
      
    }
    console.trace("connected to database")
    numRows = res[0].numRows;
    console.debug("numRows: ",numRows );
   
    // set default value for record per page to number of rows in keyholder table
    // set default skip value to be zero
    var numPerPage = parseInt(event.query.limit, 10) || numRows;
    var skip = parseInt(event.query.skip, 10) || 0;
    
    console.trace("number of record per page and skip values accepted from query params")
    console.debug("numPerPage:",numPerPage);
    console.debug("skip: ",skip);
    
    var limit = skip + ',' + numPerPage; // Here we compute the LIMIT parameter for MySQL query
    console.debug("limit: : ",limit);
    
    var query = "SELECT keyholder.*,keyholdertype.keyholder_type FROM keyholder" + 
                " JOIN keyholdertype ON keyholder.keyholder_type_id = keyholdertype.keyholder_type_id"+
                " ORDER BY keyholder.keyholder_id"+
                " LIMIT " +limit + ";"
    console.debug("query passed: ",query )
    connection.query(query, (err, res) => {   
      if (err) {
        console.error("problem with database ")
        throw err
      }
      console.trace("connected to database")
      callback(null,res);
      console.info("result sent to url")

    })
  });
 };