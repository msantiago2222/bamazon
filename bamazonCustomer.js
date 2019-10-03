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


function start() {
    //prints the items for sale and their details
    connection.query('SELECT * FROM products', function (err, res) {
      if (err) throw err;
  
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
      }
      console.log("-----------------------------------");
  
      console.log(' ');
      inquirer.prompt([{
          type: "input",
          name: "id",
          message: "What is the ID of the product you would like to buy?",
          validate: function (value) {
            if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
              return true;
            } else {
              return false;
            }
          }
        },
        {
          type: "input",
          name: "stock_quantity",
          message: "How many units of the product they would like to buy?",
          validate: function (value) {
            if (isNaN(value)) {
              return false;
            } else {
              return true;
            }
          }
        }
      ]).then(function (answer) {
        var idBuy = (answer.id) - 1;
        var quantityToBuy = parseInt(answer.stock_quantity);
        var total = parseFloat(((res[idBuy].price) * quantityToBuy).toFixed(2));
  
        //checks if the quantity is sufficient
        if (res[idBuy].stock_quantity >= quantityToBuy) {
          //updates quantity in Products
          connection.query("UPDATE products SET ? WHERE ?", [{
              stock_quantity: (res[idBuy].stock_quantity - quantityToBuy)
            },
            {
              item_id: answer.id
            }
          ], function (err, result) {
            if (err) throw err;
            console.log("Your total is $" + total.toFixed(2));
            tryAgain();
          });
          
        } else {
          console.log("Insufficient quantity!");
          start();
        }
        
      })
    })
  }
  
  function tryAgain() {
    inquirer.prompt([{
      type: "confirm",
      name: "reply",
      message: "Would you like to purchase something else?"
    }]).then(function (answer) {
      if (answer.reply) {
        start();
      } else {
        console.log("Thank you for your coding patience");
      }
    });
  }
  
  start();





// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId);
//     // askUserQuestions(); - ReferenceError:askUserQuestions is 
//     // not defined.
// });


// function createProduct() {
//     console.log("Inserting a new product...\n");
//     var query = connection.query(
//         "INSERT INTO products SET ?",
//         {
//             flavor: "Rocky Road",
//             price: 3.0,
//             quantity: 50
//         },
//         function(err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " product inserted!\n");
//             // Call updateProduct AFTER the INSERT completes
//             updateProduct();
//         }
//     );

//     // logs the actual query being run
//     console.log(bamazonSeeds.sql);
// }

// function updateProduct() {
//     console.log("Updating all Rocky Road quantities...\n");
//     var query = connection.query(
//         "UPDATE products SET ? WHERE ?",
//         [
//             {
//                 quantity: 100
//             },
//             {
//                 flavor: "Rocky Road"
//             }
//         ],
//         function(err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " products updated!\n");
//             // Call deleteProduct AFTER the UPDATE completes
//             deleteProduct();
//         }
//     );

//     // logs the actual query being run
//     console.log(query.sql);
// }

// function deleteProduct() {
//     console.log("Deleting all strawberry icecream...\n");
//     connection.query(
//         "DELETE FROM products WHERE ?",
//         {
//             flavor: "strawberry"
//         },
//         function(err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " products deleted!\n");
//             // Call readProducts AFTER the DELETE completes
//             readProducts();
//         }
//     );
// }

// function readProducts() {
//     console.log("Selecting all products...\n");
//     connection.query("SELECT * FROM products", function(err, res) {
//         if (err) throw err;
//         // Log all results of the SELECT statement
//         console.log(res);
//         connection.end();
//     });
// }
