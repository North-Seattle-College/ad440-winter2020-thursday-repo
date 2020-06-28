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
  
  console.trace("PUT keyholder -- function starting --");
  if (validate(event) && isNumeric(event.params.keyholder_id)) {
    var queryParams = [
    event.body.first_name,
    event.body.last_name,
    event.body.email,
    event.body.phone,
    event.body.keyholder_type_id
    ];
    
    var put_keyholder_query = 'UPDATE keyholder SET first_name = ?, last_name=? , email=? , phone=?, keyholder_type_id=? WHERE keyholder_id = ' + event.params.keyholder_id + ';';
    console.debug("Doing SQL: " + put_keyholder_query);
    try {
      var put_keyholder_response = await mysql.query(put_keyholder_query, queryParams);
      console.debug("SQL server returned" + put_keyholder_response);
      
      if (put_keyholder_response.affectedRows > 0) {
        var get_keyholder_response = await mysql.query("SELECT * FROM keyholder WHERE keyholder_id=" + event.params.keyholder_id);
        return context.succeed(get_keyholder_response[0]);
      } else {
        console.trace("Returned 404 Not Found");
        return context.fail("Not Found !");
      }
    } catch (error) {
      return context.fail("Server Error " + error);
    }
  } else {
    console.trace('Returned 400 Bad Request');
    return context.fail("Bad Request !");
  }
};

function validate(event) {
  if (!isNumeric(event.body.keyholder_type_id)) {
    return false;
  }
  return true;
}

function isNumeric(value) {
        return /^\d+$/.test(value);
}
