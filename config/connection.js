// Setup to connect to MySQL

// Dependencies //
var mysql = require("mysql");

// Set up and configure //
var connection;

// If the server contains the JAWSDB_URL environmental variable, connect to the JawsDB
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);

    // Else fall back on an explicitly defined local database
} else {

    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "easyPass",
        database: "burgers_db"
    });

};

// Connection to database
connection.connect(function(err) {
    if (err) throw err;

    console.log("Connected to burgers_db as ID: " + connection.threadId);
});

// Export connection for ORM
module.exports = connection;