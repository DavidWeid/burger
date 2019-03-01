// Setup to connect to MySQL
// Export connection

// Dependencies //
var mysql = require("mysql");

module.exports = function(connection) {

    // Set up and configure //
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "easyPass",
        database: "burgers_db"
    });

    // Connection to database and server
    connection.connect(function(err) {
        if (err) throw err;

        console.log("Connected to burgers_db as ID: " + connection.threadId);
    });

};