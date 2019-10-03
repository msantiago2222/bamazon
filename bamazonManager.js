var mysql = require("mysql");
var inquirer = require("inquirer");


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon_db"
});


connection.connect(function (err) {
    if (err) throw err;
    start();
});

var start = function() {
	inquirer.prompt([
	{
		type: 'list',
		name: 'action',
		message: 'What would you like to do?',
		choices: [
			"View Products for Sale",
			"View Low Inventory",
			"Add to Inventory",
			"Add New Product"
		]
	}
	]).then(function(answer) {

		switch (answer.action) {
		    case "View Products for Sale":
		    	viewProducts();
		      	break;

		    case "View Low Inventory":
		    	viewLowInventory();
		      	break;

		    case "Add to Inventory":
		    	addInventory();
		      	break;

		    case "Add New Product":
		    	addProduct();
		      	break;
		}
	});
};

// Displays list of all available products.
var viewProducts = function() {
	var query = "Select * FROM products";
	connection.query(query, function(err, res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
		}

		start();
	});
};

// Displays products with low inventory.
var viewLowInventory = function() {
	var query = "SELECT id, product_name, department_name, price, stock_quantity FROM products WHERE stock_quantity < 5";
	connection.query(query, function(err, res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
		}

		start();
	});
};

// Adds new stock to selected product.
var addInventory = function() {

	inquirer.prompt([
		{
			name: "product_ID",
			type: "input",
			message: "Enter product ID that you would like to add stock to."
		},
		{
			name: "stock",
			type: "input",
			message: "How much stock would you like to add?"
		}
	]).then(function(answer) {

		// Pushes new stock to database.
		connection.query("SELECT * FROM products", function(err, results) {
			
			var chosenItem;

			// Gets product who's stock needs to be updated.
			for (var i = 0; i < results.length; i++) {
				if (results[i].id === parseInt(answer.product_ID)) {
					chosenItem = results[i];
					console.log (results)
				}
			}

			// Adds new stock  to existing stock.
			var updatedStock = parseInt(chosenItem.stock_quantity) + parseInt(answer.stock);

			console.log("Updated stock: " + updatedStock);

			// Updates stock for selected product in database.
			connection.query("UPDATE products SET ? WHERE ?", [{
				stock_quantity: updatedStock
			}, {
				item_id: answer.product_ID
			}], function (err, res) {
				if (err) {
					throw err;
				} else {

					start();
				}
			});
			
		});

	});
};

// Adds new product to database.
var addProduct = function() {
	inquirer.prompt([{
		name: "product_name",
		type: "input",
		message: "What is the product you would like to add?"
	}, {
		name: "department_name",
		type: "input",
		message: "What is the department for this product?"
	}, {
		name: "price",
		type: "input",
		message: "What is the price for the product?"
	}, {
		name: "stock_quantity",
		type: "input",
		message: "How much stock do you have?"
	}]).then(function(answer) {
		connection.query("INSERT INTO products SET ?", {
			product_name: answer.product_name,
			department_name: answer.department_name,
			price: answer.price,
			stock_quantity: answer.stock_quantity
		}, function(err, res) {
			if (err) {
				throw err;
			} else {
				console.log("Your product was added successfully!");

				// Checks if department exists.
				checkIfDepartmentExists(answer.department_name);
			}
		});
	});
};

// Checks if department exists.
var checkIfDepartmentExists = function(departmentName) {

	var query = "Select department_name FROM departments";
	connection.query(query, function(err, res) {
		if (err) throw err;

		// If deparment already exists, no need to add it.
		for (var i = 0; i < res.length; i++) {
			if (departmentName === res[i].department_name) {
				console.log("This department already exists: " + departmentName);
				selectAction();
			}
		}

		// If department doesn't exist, adds new department. 
		addNewDepartment(departmentName);
	});
};


// Adds new department.
var addNewDepartment = function(departmentName) {
	console.log('This department will be added: ' + departmentName);

	// Adds department to departments table in database.
	connection.query("INSERT INTO departments SET ?", {
			department_name: departmentName
		}, function(err, res) {
			if (err) {
				throw err;
			} else {
				console.log("A new department was added!");
				start();
			}
		});
};