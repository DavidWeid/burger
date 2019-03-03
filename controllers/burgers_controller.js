var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

// Main page route, show all burgers
router.get("/", function(req, res) {

    // burger.all is from burger.js model (function that links to orm.all, which then connects to the database and "SELECT * FROM burgers")
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };

        console.log(hbsObject);

        // render hbs index page after sending it the hbsObject, which contains our data from the database
        res.render("index", hbsObject);
    });
});

// POST route to create a burger (get data: newBurger where newBurger = { name: "$("#burg").val().trim()" })
router.post("/api/burgers", function(req, res) {

    // burger.create is from burger.js model (function that links to orm.create, which then connects to the database and "INSERT INTO burgers (burger_name) VALUES (?)")
    burger.create([
        "burger_name"
    ], [
        req.body.burger_name
    ], function(result) {
        
        // Send back the ID of the new burger
        res.json({ id: result.insertId });
    });

});

// PUT route to update the burger's devoured state via id param where newDevouredState = { devoured: $(this).data("newdevoured") }
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("Condition", condition);

    // burger.update is from burger.js model (function that links to orm.update, which then connects to the data base and "UPDATE burgers SET devoured = ? WHERE condtion")
    burger.update({
        devoured: req.body.devoured
    }, condition, function(result) {

        // If no rows changed, the ID must not exist
        if (result.changedRows == 0) { return res.status(404).end(); }
        
        else { res.status(200).end(); }
    });
});

router.delete("/api/burgers/:id", function(req, res) {

    // Delete burgers functionality

})

// Export routes for the server to use (server.js)
module.exports = router;