const mysql = require('serverless-mysql')({
  config: {
    host     : process.env.RDS_HOSTNAME,
    port     : process.env.RDS_PORT,
    database : process.env.RDS_DATABASE,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD
  },
  onError: (e) => { console.log('MYSQL Error:',e.message) },
});

exports.handler = async (event, context) => {
  
  console.trace("PUT keyholder -- function starting --");
  if (validate(event) && isNumeric(event.params.property_id)) {
    var queryParams = [
    event.body.keyholder_id,
    event.body.keyholder_first_name,
    event.body.keyholder_last_name,
    event.body.keyholder_email,
    event.body.keyholder_phone,
    event.body.keyholder_type_id
    ];
    
    var put_keyholder_query = 'UPDATE keyholder SET keyholder_first_name=? , keyholder_last_name=? , keyholder_email=? , keyholder_phone=?, keyholder_type_id=? WHERE keyholder_id = ' + event.body.keyholder_id;
    console.debug("Doing SQL: " + put_keyholder_query);
    try {
      var put_keyholder_response = await mysql.query(put_keyholder_query, queryParams);
      console.debug("SQL server returned " + put_keyholder_response);
    } catch(error) {
      console.trace('Returned 500 Server Error: Failed to update keyholder');
      return context.fail("Server Error " + error);
    }
    var get_updated_row_query = 'SELECT * FROM keyholder WHERE keyholder_id=' + event.body.keyholder_id + ';';
    console.debug("Doing SQL: " + get_updated_row_query);
    var updatedKeyholderList = await mysql.query(get_updated_row_query);
    console.debug("SQL server returned " + newKeybundleList);
    let response = {
      statusCode: 201,
      body: newKeyholderList[0],
      message: 'Updated !'
    };
    console.trace('Returned 201 Updated keyholder!');
    return context.succeed(response, response.headers);
  } else {
    console.trace('Returned 400 Bad Request');
    return context.fail("Bad Request !");
  }
};

function validate(event) {
  if (!isNumeric(event.body.keyholder_id)) {
    return false;
  }
  if (!isNumeric(event.body.keyholder_type_id)) {
    return false;
  }
  return true;
}
function isNumeric(value) {
        return /^\d+$/.test(value);
}