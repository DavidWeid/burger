// Import connection.js
// Create methods to execute MySQL commands in the controllers (methods to retrieve and store data in database)
// Export ORM object

require("connection.js")(connection);

var ormObject = {
    selectAll: function() {},
    insertOne: function() {},
    updateOne: function() {}
};

module.exports = ormObject;