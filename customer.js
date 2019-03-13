var inquirer = require("inquirer");
var mysql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",  
    port: 3308,      
    user: "root",      
    password: "root",
    database: "bamazonDB"
  });

  // connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    askUser();
  });

  function askUser(){
      inquirer.prompt([
          {                
              type: "list",
              name: "item",
              message: "Hello, would you like to view our inventory?",
              choices: ["Yes, show me your inventory!", "No,  not interested"]  
          },
      ]).then(function(answer){
          if(answer.item === "Yes, show me your inventory!"){
            // console.log("it works")
            displayInventory();
          }else{
            console.log("Thank you for stopping by!")
            connection.end();
          }
      })
  }

//   askUser();

  function displayInventory(){
      connection.query("SELECT * FROM products", function(err, res){
        console.log("\nItems For Sale: ");
        for (var i = 0; i < res.length; i++) {
            console.log("\n");
            console.log("ID: " + res[i].id);
            console.log("Product Name: " + res[i].product_name);
            console.log("Department: " + res[i].department_name);
            console.log("Price " + res[i].price);
            console.log("Stock Quantity " + res[i].stock_quantity);
        }
        console.log("\n\n\n")
        inquirer.prompt([
            {
                name: "productID",
                type: "list",
                message: "Which product would you like to buy:choose the ID?",
                choices: [
                    "1","2","3","4","5","6","7","8","9"
            ]},
            {
                name: "total",
                type: "input",
                message: "Enter how many you wish to purchase.",
                validate: function(value){
                if (isNaN(value) === false) {
                    return true;
                }
                    return false;
                }
            }]).then(function(answer) {
                connection.query("SELECT product_name,department_name,price,stock_quantity FROM products WHERE ?",{id: answer.productID}, function(err,res) {
                    if(err) throw err;
                    if(answer.total > res[0].stock_quantity || res[0].stock_quantity < 0){
                        console.log("\nWe have run out of your requested product.\n");
                        return askUser();
                    }
                    var subtract = res[0].stock_quantity - answer.total;
                    var totalBought = answer.total * res[0].price;
                    updateDatabase(subtract, totalBought, answer)
                })
            });
      })
  }

  function updateDatabase(subtract, totalBought, answer) {
      connection.query("UPDATE products SET stock_quantity=? WHERE id=?", [subtract, answer.productID], function (err, res){
          if(err) throw err;
      })
  }