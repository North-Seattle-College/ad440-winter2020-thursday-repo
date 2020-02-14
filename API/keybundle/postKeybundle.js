//npm package for connecting to serverless database
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
    
    var response = {
        body: null
    };
  
    //get post data from the event body
    var queryPost = [
        event.body.keybundle_id,
        event.body.keybund_status, 
        event.body.property_id,
        event.body.keyholder_id
    ];
    
    // sql query to insert keybundle object into database
    var sql_post_keybundle = 'INSERT INTO keybundle (keybundle_id, keybundle_status_id, property_id, keyholder_id) VALUES (queryPost)';
    
    let results = await mysql.query(sql_post_keybundle)

    await mysql.end();
  
    //return results
    return results;
}