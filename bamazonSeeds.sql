DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;


CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spiderman", "Kid's Costume's", 20, 45),
("Wolverine", "Kid's Costume's", 15, 40),
("Ninja", "Kid's Costume's", 23, 29),
("Pirate", "Kid's Costume's", 29, 36),
("Captain", "Kid's Costume's", 19, 33),
("Dancer", "Kid's Costume's", 30, 31),
("Steampunk", "Kid's Costume's", 67, 43),
("Dragon", "Kid's Costume's", 34, 23),
("Firefighter", "Kid's Costume's", 78, 13),
("Unicorn", "Kid's Costume's", 999, 999),
("Spiderman", "Kid's Costume's", 20, 45),
("Wolverine", "Kid's Costume's", 15, 40),
("Ninja", "Kid's Costume's", 23, 29),
("Pirate", "Kid's Costume's", 29, 36),
("Captain", "Kid's Costume's", 19, 33),
("Dancer", "Kid's Costume's", 30, 31),
("Steampunk", "Kid's Costume's", 67, 43),
("Dragon", "Kid's Costume's", 34, 23),
("Firefighter", "Kid's Costume's", 78, 13),
("Unicorn", "Kid's Costume's", 999, 999);

SELECT * FROM products;
