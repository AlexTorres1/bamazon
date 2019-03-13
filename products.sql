DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;
USE bamazonDB;

CREATE TABLE products (
  id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR (30) NOT NULL,
  price decimal (10,2) null,
  stock_quantity INTEGER(10)
);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Processor","Electornics",200.50,20)
