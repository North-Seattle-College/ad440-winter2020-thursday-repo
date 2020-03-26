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
  
  console.trace("POST keybundle by property id -- function starting --");
  if (validate(event) && isNumeric(event.params.property_id)) {
    var queryParams = [
    event.body.keybundle_id,
    event.body.keybundle_status_id,
    event.params.property_id,
    event.body.keyholder_id,
    event.body.keybundle_checkout_date,
    event.body.keybundle_due_date
    ];
    
    var make_keybundle_query = 'INSERT INTO keybundle (keybundle_id, keybundle_status_id, property_id, keyholder_id, keybundle_checkout_date, keybundle_due_date) VALUES (?, ?, ?, ?, ?, ?);';
    console.debug("Doing SQL: " + make_keybundle_query);
    try {
      var make_keybundle_query_response = await mysql.query(make_keybundle_query, queryParams);
      console.debug("SQL server returned " + make_keybundle_query_response);
    } catch(error) {
      console.trace('Returned 500 Server Error: Failed to insert keybundle');
      return context.fail("Server Error " + error);
    }
    var get_inserted_row_query = 'SELECT * FROM keybundle WHERE keybundle_id=' + event.body.keybundle_id + ';';
    console.debug("Doing SQL: " + get_inserted_row_query);
    var newKeybundleList = await mysql.query(get_inserted_row_query);
    console.debug("SQL server returned " + newKeybundleList);
    let response = {
      statusCode: 201,
      body: newKeybundleList[0],
      message: 'Created !'
    };
    console.trace('Returned 201 Created new keybundle');
    return context.succeed(response, response.headers);
  } else {
    console.trace('Returned 400 Bad Request');
    return context.fail("Bad Request !");
  }
};

function validate(event) {
  if (!isNumeric(event.body.keybundle_id)) {
    return false;
  }
  if (!isNumeric(event.params.property_id)) {
    return false;
  }
  if (!isNumeric(event.body.keybundle_status_id)) {
    return false;
  }
  if (!isNumeric(event.body.keyholder_id)) {
    return false;
  }
  return true;
}
function isNumeric(value) {
        return /^\d+$/.test(value);
}