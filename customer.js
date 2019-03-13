var inquirer = require("inquirer");
var sql = require("mysql");

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
              choices: ["Yes, show me your inventory!", "no,  not interested"]  
          },
      ]).then(function(answer){
          if(answer.item === "Yes, show me your inventory!"){
              console.log("it works")
              displayInventory();
          }else{
                console.log("Answer is no")
              connection.end();
          }
      })
  }

  askUser();

  function displayInventory(){
      connection.query("SELECT * FROM products", function(err, res){
        console.log("\n\n Items For Sale: \n");
        for (var i = 0; i < res.length; i++) {

        }
      })
  }