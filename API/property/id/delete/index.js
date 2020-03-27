//delete property by id

const mysql = require('serverless-mysql')({
  config: {
    host     : process.env.RDS_HOST,
    port     : process.env.RDS_PORT,
    database : process.env.RDS_DATABASE,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD
  }
});
const jwt = require('jsonwebtoken');

exports.handler = async (event, context) => {
  
  console.info("DELETE property by property_id -- function starting --");
  console.debug("Requesting property_id: " + event.params.property_id.toString());

  let response = {};
  let headers = event.headers;
  console.info('headers: ', headers);
  // middleware auth TODO: connect & move
  if (event) {
    //const poolOk = 'cognito_userpool_admin';
    let token = headers.Authorization;
    // let idPool = context.identity.cognitoIdentityPoolId;
    console.info('received token: ', token);
    // console.info('identity pool: ', idPool);
    // get the decoded payload and header ignoring signature, no secretOrPrivateKey needed
    let decoded = jwt.decode(token, {complete: true});
    if (decoded) {
      console.info('decoded header: ', decoded.header);
      console.info('decoded payload: ', decoded.payload);
      response['headers'] = { 'Authorization': decoded };
    } else { 
      response['headers'] = { 'Authorization': token }; 
    }
  }
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
        message: "property_id id=" + event.params.property_id.toString() + " deleted !"
      };
    } else if (results.affectedRows == 0) {
      console.info("No property found");
      return {
        statusCode: 404,
        message: "Not Found !"
      };
    }
  } else {
    console.error("invalid property_id");
    return {
      statusCode: 400,
      message: "Bad Request !"
    };
  }
};

function isNumeric(value) {
        return /^\d+$/.test(value);
}