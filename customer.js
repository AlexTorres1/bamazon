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