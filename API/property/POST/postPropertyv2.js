
//inititalize connection outside of main handler
const mysql = require('serverless-mysql')({
    config: {
        host     : process.env.RDS_HOSTNAME,
        user     : process.env.RDS_USERNAME,
        password : process.env.RDS_PASSWORD,
        port     : process.env.RDS_PORT,
        database : process.env.RDS_DATABASE

    }
})

//main handler function
exports.handler = async (event) => {
  //set variables from json data
  const body = event.body;
  const property_name = body.property_name ;
  const property_address = body.property_address ;
  const property_city = body.property_city ;
  const property_state = body.property_state  ;
  const property_zip = body.property_zip ;
  const property_country = body.property_country ;
  //mysql insert code
  var sql = "INSERT INTO property (property_name, property_type_id, property_address, property_city, property_state, property_zip, property_country) \
    VALUES (?,?,?,?,?,?,?)";
  //wait for mysql server
  let reply = mysql.query(sql,[property_name, property_address, property_city, property_state, property_zip, property_country]);
  console.log("Property Added!" + reply);
  await mysql.end()

  return "Property Created " + JSON.stringify(body) + reply;
};
