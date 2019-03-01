// Dependencies //
var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

// Set up and configure //
var app = express();
var PORT = process.env.PORT || 3000;
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "easyPass",
    database: "burgers_db"
});

// Middleware configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connection to database and server
connection.connect(function(err) {
    if (err) throw err;

    console.log("Connected to burgers_db as ID: " + connection.threadId);
});

app.listen(PORT, function() {
    console.log("Server online at http://localhost:%s", PORT);
});