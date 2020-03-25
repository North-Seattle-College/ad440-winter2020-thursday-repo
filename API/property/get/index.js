//Get all properties
//package for connecting to database
const mysql = require('serverless-mysql')({

  //credentials
  config: {
    host     : process.env.RDS_HOSTNAME,
    port     : process.env.RDS_PORT,
    database : process.env.RDS_DATABASE,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD
  }
});

exports.handler = async (event, context) => {
    try {
        let response = {
            
        };
        
        if (event.method != "GET") {
            console.error("500 status returned: incorrect method call");
            response = {
                statusCode: 500,
                errorMessage:"Server Error"
            };
            return context.fail(response.errorMessage);
        } else {
            //MYSQL query
            let results = "SELECT * FROM property JOIN propertytype ON property.property_type_id=propertytype.property_type_id;"
            response = await mysql.query(results);
            await mysql.end();

            
            //verify results
            if (response.length <1){
                response = {
                    statusCode: 404,
                    errorMessage: "Not Found !"
                };
                return context.fail(response.errorMessage);
                } else //return requested info from successful GET query 
                {
                    return response;

                }
                   
        }
    } catch (e) {
        console.error(e.message);
        let response = {
            statusCode: 500,
            errorMessage: "Server Error !" };
        return context.fail(response.errorMessage);
        }
};
  
