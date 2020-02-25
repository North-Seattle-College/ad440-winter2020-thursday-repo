console.log("GET property by ID :: function starting...");

// mysql import and connection
const mysql = require('mysql');

exports.handler = (event, context, callback) => {
//     try {
//         let response = {
//             property_id: null,
//             property_name: null,
//             property_type_id: null,
//             property_address: null,
//             keybundle_due_date: null,
//         };
//         const date = new Date(Date.now());

//         if (event) {//.method === 'PUT') { TODO: change checks back from debug mode
//             if (1 != 1) { //.body.keybundle_id)) {
//                 console.debug('400 status returned: bad input.');
//                 response = {
//                     statusCode: 400,
//                     message:"Bad input!"
//                 };
//             } else {
//                 // allows for using callbacks as finish/error-handlers
//                 context.callbackWaitsForEmptyEventLoop = false;
                
//                 // grab param data to update
//                 response.keybundle_id = parseInt(event.body.keybundle_id);
//                 response.keyholder_id = parseInt(event.body.keyholder_id);
//                 response.keybundle_status_id = parseInt(event.body.keybundle_status_id);
//                 response.keybundle_checkout_date = toSqlDatetime(date);
//                 response.keybundle_due_date = toSqlDatetime(date.addDays(14));
                
//                 // check for inputs match
//                 if (event.params.keybundle_id != response.keybundle_id) {
//                     console.debug('400 status returned: bad input.');
//                     response = {
//                         statusCode: 400,
//                         message:"Bad input!"
//                     };
//                     return response;
//                 };

//                 // update keybundle data from RDS with query
//                 // TODO: check-in function do GET first
//                 let query_data = [
//                     response.keybundle_status_id,
//                     response.keyholder_id,
//                     response.keybundle_checkout_date,
//                     response.keybundle_due_date,
//                     response.keybundle_id,
//                 ];
//                 let update_keybundle_query = "UPDATE keybundle SET keybundle_status_id=?,keyholder_id=?,keybundle_checkout_date=?,keybundle_due_date=? WHERE keybundle_id=?;";
//                 console.log('\n\nDATA: ', update_keybundle_query, query_data);
                
                
//                 const cnx = mysql.createConnection({
//                   host     : process.env.RDS_HOSTNAME,
//                   user     : process.env.RDS_temp_USERNAME,
//                   password : process.env.RDS_temp_PASSWORD,
//                   port     : process.env.RDS_PORT,
//                   database : process.env.RDS_DATABASE
//                 });
//                 console.log('Connecting...');
//                 cnx.query(update_keybundle_query, query_data, (error, results, callback) => {
//                     if (error) {
//                         console.error('QUERY ERROR: ', error);
//                         console.trace();
//                         cnx.destroy();
//                         // throw error;
//                     } else {
//                         // connected!
//                         console.log('QUERY SUCCESS: ', results);
//                         // callback(null, results);
//                         cnx.end();
//                         console.info('OK: CONNECTION ENDED')
//                     }
//                 });
//                 response = {
//                     statusCode: 200,
//                     body: query_data
//                 }
//             }
//         } else { 
//             console.error('500 returned');
//             response = {
//                 statusCode: 500,
//                 message:"Bad server!"
//             };
//         };
//         console.log('FINAL RESPONSE: ', response);
//         return response;
//     } catch (e) {
//         console.warn('\n\nEXCEPTION: \n', e, '\n');
//         let response = { ERROR_MSG:e.message };
//         return response;
//     }
// };

// // date.addDays(n) function will add n days to the Date being called
// Date.prototype.addDays = function(days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// }
// // this will return correctly formatted SQL date when used on Date
// const toSqlDatetime = (inputDate) => {
//     const date = new Date(inputDate)
//     const dateWithOffest = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
//     return dateWithOffest
//         .toISOString()
//         .slice(0, 19)
//         .replace('T', ' ')
}