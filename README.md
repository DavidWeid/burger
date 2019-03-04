# Burger Nom

[Burger Nom](https://desolate-garden-11224.herokuapp.com/) is Live! :hamburger:

![Burger Nom Home](/gitHubImg/burgerNom.png)

## Overview

Burger Nom is a Node Express application hosted on Heroku. It utilizes Handlebars, a template engine, for generating HTML and JawsDB for a fully functioning MySQL Database server.

In practicality, Burger Nom is a burger logger / restaurant app that lets users input the names of burgers they would like to eat. When a user enters a burger, they click on "Add Burger!" to submit the new burger.
The new burger is then added to the database and displayed on the left-side of the screen. Each added burger has a "Devour Me" button. When a user clicks the "Devour Me" button, the burger is removed from the left-side
and re-appears on the right side of the screen (sans button). All burgers are stored in the database, devoured or not.

#### MVC

Burger Nom follows a Model View Controller (MVC) design pattern. This is easily seen in the files and directories structure, where MVC directories are clearly marked.

Burger Nom's ORM (orm.js) contains our orm object for our SQL statements (allows interaction with the database via Create, Read, Update, Delete commands). It builds the query strings for MySQL, connects to the database, and returns the results for export.

Burger Nom's model (burger.js) imports our ORM functions / results and exports the data for our controller (burgers_controller) to use.

Burger Nom's controller imports our model and sets up routes for our server to use. Depending on the route the user hits ("/", "/api/burgers", "/api/burgers/:id") and the method ("GET", "POST", "PUT"), the user receives something different.
The main route / index address render's Burger Nom's main page. The main page display's all the burgers in the database. The data is received from the burger model. The controller sends the data to our view, rendered by handlebars.

Burger Nom's view is rendered through handlebars and results in what the user sees (UI). What is displayed and how the page changes as the user interacts is thanks to the views communication with the controller.
Handlebars allows dynamic data to be displayed.

- - -

For example, when the user goes to Burger Nom's URL.
	* A GET request is made to the router, in our controller file at the "/" route.
	* The controller communicates to the burger model with a "read" command (function).
	* The model communicates to the ORM with a "read" command (function), with the correct "table" argument.
	* The ORM communicates to the MySQL database with a "read" command and pulls all the data in the given "table" ("SELECT * FROM table;").
	* The ORM returns the data to the model, which returns it to the controller, which sends it to the view (handlebars), which returns to the controller for display to the client.

If the user adds a burger, a similar process occurs. By clicking the "Add" button, an ajax (POST) call is made client-side to the router via the "/api/burgers" route.
The process repeats (controller --> model --> ORM --> model --> controller), the new burger is sent back to the user. And the page then reloads the "/" route.

Lastly, the user can update a burger to change its "devoured" state from false to true (moving the burger from the left to the right).

- - -

#### Directory structure

All the application files and directories have the following structure:

```
.
├── config
│   ├── connection.js
│   └── orm.js
│ 
├── controllers
│   └── burgers_controller.js
│
├── db
│   ├── schema.sql
│   └── seeds.sql
│
├── models
│   └── burger.js
│ 
├── node_modules
│ 
├── package.json
│
├── public
│   └── assets
│       ├── css
│       │   ├── burger_style.css
│	│   └── reset.css
│       ├── img
│       │   └── burgerIcon.png
│	├── js
│       │   └── burgerJS.js
│       └── materialize
│                ├── css
│		 ├── fonts
│		 └── js
│   
│
├── server.js
│
└── views
    ├── index.handlebars
    ├── partials
    │	└── burgers
    │	       └── burger-block.handlebars
    └── layouts
        └── main.handlebars
```

- - -

#### Flexibility

Burger Nom allows a user to add a burger and to "devour" a burger. When adding a burger, the string "burger" must exist in the new burger's name. This string is not case-sensitive.

A delete functionality exists in all of the necessary app files and directories, except the view. The delete functionality is disabled. To enable this feature, a button would need
to be added to the view with the attributes `"id=deletebtn"` and `"data-id='{{id}}'"`. The button would be best created in the burger-block.handlebars file.

Another functionality exists but has been disabled and is not complete. This creates a home-page that is a full-screen page with a single image and button. The button would
switch the view to the Burger Nom interactive page. For the function to work, a new route would need to be created that is only displayed when the user goes to the page for the first time.

- - -

### Contact

If you have any questions, concerns, or comments, please reach me at

david.weid.2@gmail.com
