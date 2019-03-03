$(function() {
    // User clicks button to devour a burger (change devoured from false to true)
    $(".change-devoured").on("click", function(e) {
        var id = $(this).data("id");
        var newDevoured = $(this).data("newdevoured");

        var newDevouredState = {
            devoured: newDevoured
        };

        // Send PUT request
        $.ajax("/api/burgers" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(function() {
            console.log("Changed devoured stat to", newDevoured);

            location.reload();
        });
    });
});

// User enters new burger and clicks submit (add new burger to db)
$("#createburger").on("submit", function(e) {
    e.preventDefault();

    var newBurger = {
        name: $("#burg").val().trim()
    };

    $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
    }).then(function() {
        console.log("Created new burger");

        location.reload();
    });
});