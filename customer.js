var inquirer = require("inquirer");
var sql = require("mysql");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",  
    port: 3306,      
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
              type: "input",
              name: "item",

          }
      ])
  }

  askUser();