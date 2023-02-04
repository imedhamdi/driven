const mysql = require('mysql');
require('dotenv').config()
const dbConn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password:'',
    database: 'taxiapp'
});
dbConn.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});
module.exports = dbConn;