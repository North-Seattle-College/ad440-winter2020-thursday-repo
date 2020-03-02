//PUT Keyholder by id 
console.trace("PUT keyholder by keyholder_id -- function starting --");
 
//node package for mysql connection
const mysql = require('mysql');

//credentials
function mysql_connection(){
    var params={
      host     : process.env.RDS_HOST,
      port     : process.env.RDS_PORT,
      database : process.env.RDS_DATABASE,
      user     : process.env.RDS_USERNAME,
      password : process.env.RDS_PASSWORD
    };
    return mysql.createConnection(params);
}

console.trace("PUT Keyholder by keyholder_id -- function starting --");
console.info("Put request for keyholder by keyholder_id");

exports.handler = (event, context, callback) => {
    
    //keyholder id to identify the eyholder for updating
    let keyholder_id = event.params.keyholder_id.toString();
    console.debug("keyholder_id: " + keyholder_id);
    
    var connection = mysql_connection();
    console.trace("database connection established");
    console.trace('connected as id ' + connection.threadId);

    
    //keyholder data for the update
    let first_name=event.body.first_name;
    let last_name=event.body.last_name;
    let email=event.body.email;
    let phone=event.body.phone;
    let keyholder_type_id=event.body.keyholder_type_id;  
    
    let error = new Error("wrong datatype inside json");
    if(typeof first_name != 'string' || 
     typeof last_name !='string'   || 
     typeof email != 'string'     ||
     typeof phone != 'string'     ||
     typeof keyholder_type_id != 'number'){
     
        context.fail(error);
    }else{
        console.debug("update input data: " + first_name, last_name, email, phone, keyholder_type_id);
    
        //mysql update statement
        let sql = "UPDATE keyholder SET first_name =? , last_name =? , email =? , phone =? , keyholder_type_id =? WHERE keyholder_id = " + keyholder_id ;
        
        //mysql data to be filled inplace of the ?
        let data = [first_name, last_name, email, phone, keyholder_type_id];
        
        connection.query(sql,data, (err, result) => {
            console.trace("mysql query initiated");
            if (err) {
                console.error("error", err);
                throw err;
    
            }
            else{
                console.info("keyholder updated" + result.message);
                connection.end();
                callback(null, result.message);
            }
        });
    }
    console.trace("PUT keyholder by keyholder_id -- function end ");

};