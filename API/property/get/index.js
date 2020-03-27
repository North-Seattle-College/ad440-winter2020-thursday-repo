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

console.trace("Get All Property-- function starting --");
exports.handler = (event, context, callback) => {
    
    var connection = mysql_connection();
    console.trace("Successfully connected to the database");

    //Query to know number of rows in the property database
    var query = "SELECT count(*) as numRows FROM property";
    var numRows;

    console.trace("Connecting to the database to get the number of rows");
    connection.query(query, (err, res) => {
    if (err){
        console.error("Database Error");
        return context.fail("Server Error" + err);
    }else{
        numRows = res[0].numRows;
        console.trace("Number of Rows: " + numRows);
        
        // set default value for record per page to number of rows in property table
        // set default skip value to be zero
        var numPerPage = parseInt(event.query.limit, 10) || numRows;
        var skip = parseInt(event.query.skip, 10) || 0;
        
        var limit = skip + ',' + numPerPage;
        console.debug("limit: ", limit);
    }
                     
    //mysql select all statement
    var select = "SELECT * FROM property JOIN propertytype ON property.property_type_id=propertytype.property_type_id LIMIT " + limit ;
    connection.query(select, (err, result) => {
    console.trace("Select All Property Query initiated");

        if (err) {
            console.error("Database Error");
            return context.fail("Server Error " + err);
        }
        else{
            console.info("Success" );
            console.info(result);
            connection.end();
            callback(null, result);
        }
    });
     console.trace("GET Property -- function end ");

    
});
};
