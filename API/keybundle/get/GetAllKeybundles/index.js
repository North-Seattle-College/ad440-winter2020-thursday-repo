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
  console.trace("GET all keybundles -- function starting --");
  if (validate(event)) {
    try {
      console.debug("Doing SQL: SELECT count(*) as numRows FROM keybundle;");
      let get_numRows = await mysql.query('SELECT count(*) as numRows FROM keybundle;');
      console.debug("SQL server returned " + get_numRows);
      var numRows = get_numRows[0].numRows;
      var numPerPage = parseInt(event.query.limit, 10) || numRows;
      var skip = parseInt(event.query.skip, 10) || 0;
      var limit = skip + ',' + numPerPage;
      var get_keybundles_query = "SELECT * FROM keybundle ORDER BY keybundle_id LIMIT " + limit + ";";
      console.debug("Doing SQL: " + get_keybundles_query);
      var get_keybundles = await mysql.query(get_keybundles_query);
      console.debug("SQL server returned " + get_keybundles);
      console.trace('Returned 200 OK keybundles');
      return context.succeed(get_keybundles);
    } catch(error) {
      console.trace('Returned 500 Server Error: Failed to connect to DB');
      return context.fail("Server Error " + error);
    }
  } else {
    console.trace('Returned 400 Bad Request');
    return context.fail("Bad Request !");
  }
}

function validate(event) {
  if (event.query.limit != null && !isNumeric(event.query.limit)) {
    return false;
  }
  if (event.query.skip != null && !isNumeric(event.query.skip)) {
    return false;
  }
  return true;
}

function isNumeric(value) {
        return /^\d+$/.test(value);
}