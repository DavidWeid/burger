// Import MySQL connection
var connection = require("../config/connection.js");

// Helper function for SQL syntax loops through to create an array of ? and converts to string ["?", "?", "?"] "?,?,?"
function printQuestionMarks(num) {
    var arr = [];

    for(var i = 0; i < num; i++) {
        arr.push("?");
    };

    return arr.toString();
}

// Helper function converts object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string into arr
    for (var key in ob) {
        var value = ob[key];

        // Check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {

            // If string with spaces, add quotes
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }

            // Ex: {name: "Lana Del Grey"} => ["name='Lana Del Grey'"]
            arr.push(key + "=" + value);
        }
    }
    // Translate arry of strings to a single string
    return arr.toString();
}

// Object for our SQL statements
var orm = {

    create: function(table, cols, vals, cb) {

        // Create our MySQL query string: "INSERT INTO table (burger_name) VALUES (?), (?), (?)"
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) throw err;

            cb(result);
        });

    },

    all: function(tableInput, cb) {

        // Create our MySQL query string: "SELECT * FROM table;"
        var queryString = "SELECT * FROM " + tableInput + ";";

        connection.query(queryString, function(err, result) {
            if (err) throw err;

            cb(result);
        });
    },

    update: function(table, objColVals, condition, cb) {

        // Create our MySQL query string: "UPDATE table SET devoured = ? WHERE id = ?"
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) throw err;

            cb(result);
        })

    },

    delete: function(table, condition, cb) {

        // Delete burgers functionality

    }
}


// Export orm object for the model (burgers.js)
module.exports = orm;