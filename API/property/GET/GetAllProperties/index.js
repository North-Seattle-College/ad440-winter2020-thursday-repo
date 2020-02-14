//Get all properties
//package for connecting to database
const mysql = require('serverless-mysql')({

  //credentials
  config: {
    host     : process.env.RDS_HOSTNAME,
    port     : process.env.RDS_PORT,
    database : process.env.RDS_DATABASE,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD
  }
});

exports.handler = async (event, context) => {

  //MYSQL query
  let results = await mysql.query('SELECT * FROM property')

  await mysql.end();

  //return results
  return results;
} 