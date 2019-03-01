//////////////////////////////////////////////////

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

// Middleware configuration //
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connection to database and server //
connection.connect(function(err) {
    if (err) throw err;

    console.log("Connected to burgers_db as ID: " + connection.threadId);
});

app.listen(PORT, function() {
    console.log("Server online at http://localhost:%s", PORT);
});

//////////////////////////////////////////////////

// Use handlebars to render main index.html page
app.get("/", function(req, res) {
    connection.query("SELECT * FROM burgers;", function(err, data) {
        if (err) { return res.status(500).end(); };

        console.log(data);

        res.render("index", { burgers: data });
    });
});

// POST request to create / add a new burger
app.post("/burgers", function(req, res) {
    connection.query("INSERT INTO burgers (burger_name) VALUES (?)", [req.body.burger], function(err, result) {
        if (err) { return res.status(500).end(); };

        res.json({ id: result.insertId });

    });
});

// PUT request to update a burger (change devoured status to true)
app.put("/burgers/:id", function(req, res) {
    connection.query("UPDATE burgers SET devoured = ? WHERE id = ?", [true, req.body.id], function(err, result) {
        if (err) { return res.status(500).end(); } else if (result.changedRows === 0) { return res.status(404).end() };

        res.status(200).end();

    });
});