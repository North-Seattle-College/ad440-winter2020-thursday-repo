

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
  console.trace("DELETE Keybundle by keybundle_id -- function starting --");
  console.debug("Requesting keybundle_id: " + event.params.keybundle_id.toString());
  console.info("DELETE Request for keybundle by keybundle_id");
  if (isNumeric(event.params.keybundle_id)) {
    console.trace("keybundle_id validated");
    const query = "DELETE FROM keybundle WHERE keybundle_id = " + event.params.keybundle_id.toString();
    // wait for mysql server 
    let results = await mysql.query(query);
    await mysql.end();
    if (results.affectedRows == 1) {
      console.info("Keybundle deleted");
      return {
        statusCode: 200,
        message: "Keybundle deleted !"
      };
    } else if (results.affectedRows == 0) {
      console.info("No keybundle found");
      return {
        statusCode: 404,
        message: "Not Found !"
      };
    }
  } else {
    console.error("keybundle_id is invalid");
    return {
      statusCode: 400,
      message: "Bad Request !"
    };
  }
}

function isNumeric(value) {
        return /^\d+$/.test(value);
}