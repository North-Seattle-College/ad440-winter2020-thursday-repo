// Logging levels:
//Trace: Everything.
//Debug: What user entered, JSON request. What was implemented in the database. 
//(information about database entry for post, put request, returned get request)
//Info: What happened. POST request, PUT REQUEST, GET REQUEST, DELETE. Skeleton of what happened.
//Error: error, 400, 404, 405, 500 would show up


//node package for mysql connection
//credentials needed to connect

const mysql = require('serverless-mysql')({
  config: {
    host     : process.env.RDS_HOSTNAME,
    port     : process.env.RDS_PORT,
    database : process.env.RDS_DATABASE,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD
  },
  onError: (e) => { console.error('MYSQL Error:',e.message) },
});

console.info("POST property -- function starting --");
exports.handler = async (event, context) => {
    //checks to see if params entered are correct
    if (validate(event)) { 
      
    var queryParams = [
        event.body.property_name,
        event.body.property_type_id,
        event.body.property_address,
        event.body.property_city,
        event.body.property_state,
        event.body.property_zip,
        event.body.property_country
    ];
    } 
    //if params aren't correct, an error message will be returned with a 400 status code..
    else {
      var errorMessage = "Property Name: " + event.body.property_name + " Property Type: " + event.body.property_type_id + " Address: "+ event.body.property_address+ " City: " + event.body.property_city+ " State: " + event.body.property_state + " Zip: " + event.body.property_zip+ " Country: " + event.body.property_country;
      console.debug("invalid input parameters") ; 
      console.debug(errorMessage);
      return context.fail("Bad Request , Invalid input parameters, please check: " + errorMessage);
    }
    //If params are successfully validated function will continue here
    //mysql statement
     var sql = "INSERT INTO property (property_name, property_type_id, property_address, property_city, property_state, property_zip, property_country) VALUES ( ?,?,?,?,?,?,?) ";
     console.debug("Sql statement: " + sql);
    

    try {
        var sqlQuery = await mysql.query(sql, queryParams);
        
        //we want the property id returned along with a 201 status code
        var id = sqlQuery.insertId;
        console.debug("MySql posted successfully!! property_id = " + id);
        await mysql.end();
        return context.succeed("Created! property_id = " + id);
            
    } catch(error){
        console.debug("Server Error: failed to Post Property");
        
        //a server error will return a 500 status code
        return context.fail("Server Error " + error);
    }
};

//validate the paramaters!
function validate(event) {
  if (event.body.property_name.length > 100) {
    return false;
  }
  if (!isNumeric(event.body.property_type_id)) {
    return false;
  }
  if (event.body.property_address.length >250) {
    return false;
  }
  if (event.body.property_city.length >100) {
    return false;
  }
  if (event.body.property_state.length >50) {
    return false;
  }
  if (event.body.property_zip.length != 5) {
    return false;
  }
  if (event.body.property_country.length >3) {
    return false;
  } else{
      return true;
  }
}
function isNumeric(value) {
        return /^\d+$/.test(value);
}
