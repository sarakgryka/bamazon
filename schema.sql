CREATE DATABASE bamazon_db;

USE bamazon_db;

DROP TABLE products;

CREATE TABLE products (

item_id INTEGER,
product_name VARCHAR(40),
department_name VARCHAR(40),
price DECIMAL(6,2),
stock_quantity INTEGER,
PRIMARY KEY(item_id)

);

INSERT INTO products (
item_id, product_name, department_name, price, stock_quantity)
VALUES (1000, "Pre-lit Christmas Tree", "Holiday", 129.99, 15);

INSERT INTO products (
item_id, product_name, department_name, price, stock_quantity)
VALUES (1001, "Christmas Lights", "Holiday", 9.99, 50);


INSERT INTO products (
item_id, product_name, department_name, price, stock_quantity)
VALUES (1002, "Tree Skirt", "Holiday", 29.99, 30);


INSERT INTO products (
item_id, product_name, department_name, price, stock_quantity)
VALUES (1003, "Garland", "Holiday", 19.99, 50);

INSERT INTO products (
item_id, product_name, department_name, price, stock_quantity)
VALUES (1004, "100-pack ornaments", "Holiday", 39.99, 20);

INSERT INTO products (
item_id, product_name, department_name, price, stock_quantity)
VALUES (1005, "KitchenAid Mixer", "Kitchen Appliance", 339.99, 15);

INSERT INTO products (
item_id, product_name, department_name, price, stock_quantity)
VALUES (1006, "EggNog", "Grocery", 5.99, 25);

INSERT INTO products (
item_id, product_name, department_name, price, stock_quantity)
VALUES (1007, "Merlot", "Spirits", 19.99, 100);

INSERT INTO products (
item_id, product_name, department_name, price, stock_quantity)
VALUES (1008, "Honey Baked Ham", "Grocery", 49.99, 20);


INSERT INTO products (
item_id, product_name, department_name, price, stock_quantity)
VALUES (1009, "3 Pack Serving Plates", "Kitchen", 9.99, 20);

SELECT * FROM products;

