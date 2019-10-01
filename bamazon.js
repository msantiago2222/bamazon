var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon_db"
});


INS (product_name, department_name, price, stock_quantity)
VALUES ("Spiderman", "Kid's Costume's", 20, 45);

INS (product_name, department_name, price, stock_quantity)
VALUES ("Wolverine", "Kid's Costume's", 15, 40);

INS (product_name, department_name, price, stock_quantity)
VALUES ("Ninja", "Kid's Costume's", 23, 29);

INS (product_name, department_name, price, stock_quantity)
VALUES ("Pirate", "Kid's Costume's", 29, 36);

INS (product_name, department_name, price, stock_quantity)
VALUES ("Captain", "Kid's Costume's", 19, 33);

INS (product_name, department_name, price, stock_quantity)
VALUES ("Dancer", "Kid's Costume's", 30, 31);

INS (product_name, department_name, price, stock_quantity)
VALUES ("Steampunk", "Kid's Costume's", 67, 43);

INS (product_name, department_name, price, stock_quantity)
VALUES ("Dragon", "Kid's Costume's", 34, 23);

INS (product_name, department_name, price, stock_quantity)
VALUES ("Firefighter", "Kid's Costume's", 78, 13);

INS (product_name, department_name, price, stock_quantity)
VALUES ("Unicorn", "Kid's Costume's", 999, 999);




connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    askUserQuestions();
});
function createProduct() {
    console.log("Inserting a new product...\n");
    var query = connection.query(
        "INSERT INTO products SET ?",
        {
            flavor: "Rocky Road",
            price: 3.0,
            quantity: 50
        },
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            updateProduct();
        }
    );

    // logs the actual query being run
    console.log(query.sql);
}

function updateProduct() {
    console.log("Updating all Rocky Road quantities...\n");
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                quantity: 100
            },
            {
                flavor: "Rocky Road"
            }
        ],
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            deleteProduct();
        }
    );

    // logs the actual query being run
    console.log(query.sql);
}

function deleteProduct() {
    console.log("Deleting all strawberry icecream...\n");
    connection.query(
        "DELETE FROM products WHERE ?",
        {
            flavor: "strawberry"
        },
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products deleted!\n");
            // Call readProducts AFTER the DELETE completes
            readProducts();
        }
    );
}

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    });
}
