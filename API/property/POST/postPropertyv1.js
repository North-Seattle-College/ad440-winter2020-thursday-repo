const mysql = require('mysql');
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

exports.handler = async (event, context ) => {
  var connection = mysql_connection();
  const body = event.body;
  const property_name = body.property_name ;
  const property_address = body.property_address ;
  const property_city = body.property_city ;
  const property_state = body.property_state  ;
  const property_zip = body.property_zip ;
  const property_country = body.property_country ;
  var sql = "INSERT INTO property (property_name, property_type_id, property_address, property_city, property_state, property_zip, property_country) \
    VALUES (?,?,?,?,?,?,?)";

  connection.query(sql,[property_name, property_address, property_city, property_state, property_zip, property_country], function (err, result) {
    if (err) throw err;
    console.log("Property Added!" + result);
  });
  connection.end();
  return "Property Created " + JSON.stringify(body);
};

