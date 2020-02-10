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
  mysql.config();
  // Run your query
  let results = await mysql.query('SELECT * FROM keybundle')

  // Run clean up function
  await mysql.end()

  // Return the results
  return results
}
