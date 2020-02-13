const mysql = require('mysql');
const con = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});
exports.handler = async (event) => {
  const body = event.body;
  const property_name = body.property_name ;
  const property_address = body.property_address ;
  const property_city = body.property_city ;
  const property_state = body.property_state  ;
  const property_zip = body.property_zip ;
  const property_country = body.property_country ;
  var sql = "INSERT INTO property (property_name, property_type_id, property_address, property_city, property_state, property_zip, property_country) \
    VALUES (?,?,?,?,?,?,?)";

  con.query(sql,[property_name, property_address, property_city, property_state, property_zip, property_country], function (err, result) {
    if (err) throw err;
    console.log("Property Added!" + result);
  });

  return "Property Created " + JSON.stringify(body);
};
