//delete property by id

//import package for fonnecting to the database
const mysql = require('serverless-mysql')({
  config: {
    host     : process.env.RDS_HOSTNAME,
    port     : process.env.RDS_PORT,
    database : process.env.RDS_DATABASE,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD
  }
});

exports.handler = async (event, context) => {
  
  console.info("DELETE property by property_id -- function starting --");
  console.debug("Requesting property_id: " + event.params.property_id.toString());

    if (isNumeric(event.params.property_id)) {
    console.trace("property_id is valid");
    const query = "DELETE FROM property WHERE property_id = " + event.params.property_id.toString();
  
    // wait for mysql server 
    let results = await mysql.query(query);
    await mysql.end();
   
    if (results.affectedRows == 1) {
      console.info("property deleted");
      return {
        statusCode: 200,
        message: "property_id id=" + event.params.property_id.toString() + " deleted!"
      };
    } else if (results.affectedRows == 0) {
      console.info("No property found");
      return {
        statusCode: 404,
        message: "There is no property with this id!"
      };
    }
  } else {
    console.error("invalid property_id");
    return {
      statusCode: 400,
      message: "Bad Request!"
    };
  }
};

function isNumeric(value) {
        return /^\d+$/.test(value);
}