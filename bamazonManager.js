const inquirer = require("inquirer");
const mysql = require("mysql");

//mysql connection//

let connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "Password123!",
    database: "bamazon_db"
})

connection.connect(function (error) {

    if (error) {
        throw error;
    }

    // console.log(`successfully connected as id ${connection.threadId}`);
    askManager();

})






function askManager() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "managerChoice",
                message: "Please choose an option below",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
            },

        ])
        .then(answers => {

            // console.log(`picked ${answers.managerChoice}`);


            switch (answers.managerChoice) {

                case "View Products for Sale":
                    products();

                    break;


                case "View Low Inventory":
                    lowInventory();
                    break;


                case "Add to Inventory":
                    updateInventory();
                    break;


                case "Add New Product":
                    addInventory();
                    break;



            }


        })

};



function products() {

    let sqlQuery = "SELECT * FROM products";

    connection.query(sqlQuery, function (error, results) {


        if (error) {

            throw error;
        }
        console.log("Please see avaliable items below");
        console.log("*********************************");

        for (i = 0; i < results.length; i++) {


            console.log(`Item ID: ${results[i].item_id}`);
            console.log(`Product Name: ${results[i].product_name}`);
            console.log(`Price: $ ${results[i].price}`);
            console.log(`Price: $ ${results[i].stock_quantity}`);
            console.log("*********************************")


        }

        connection.end();
    })

}


function lowInventory() {

    let sqlQuery = "SELECT * FROM products";

    connection.query(sqlQuery, function (error, results) {


        if (error) {

            throw error;
        }
        console.log("Low Inventory");
        console.log("*********************************");

        for (i = 0; i < results.length; i++) {
            if (results[i].stock_quantity < 5) {

                console.log(`Item ID: ${results[i].item_id}`);
                console.log(`Product Name: ${results[i].product_name}`);
                // console.log(`Price: $ ${results[i].price}`);
                console.log(`Quantity: ${results[i].stock_quantity}`);
                console.log("*********************************")


            }
        }
        connection.end();
    })


}

function updateInventory() {

    inquirer
        .prompt([
            {
                type: "input",
                name: "itemID",
                message: "Please enter the ID item of the product you would like to add more inventory of"
            },

            {
                type: "input",
                name: "quantity",
                message: "Please enter the amount you on inventory you would like to add"
            },


        ])
        .then(answers => {


            let sqlQueryUpdate = "SELECT * FROM products WHERE ?";
            let productParams = [{ item_id: answers.itemID }];

            connection.query(sqlQueryUpdate, productParams, function (error, results) {

                

                let oldInv = results[0].stock_quantity;


                if (error) {

                    throw error;
                }

                connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: parseInt(answers.quantity) + oldInv }, { item_id: answers.itemID }], function (error, results) {

                    if (error) {

                        throw error;
                    }

                   console.log(`The inventory has been updated for ${answers.itemID}`);
                   connection.end();



                })
            })
        })
        
}
function addInventory() {

    inquirer
        .prompt([
            {
                type: "input",
                name: "item",
                message: "Please enter the item ID"
            },
            {
                type: "input",
                name: "name",
                message: "Please enter the product name"
            },
            {
                type: "input",
                name: "department",
                message: "Please enter the department name"
            },
            {
                type: "input",
                name: "price",
                message: "Please enter the price of the item"
            },

            {
                type: "input",
                name: "quantity",
                message: "Please enter the amount you on inventory you would like to add"
            },


        ])
        .then(answers => {

            let sqlQueryUpdate = "INSERT INTO products SET ?";
            let newProduct = {
                item_id: answers.item,
                product_name: answers.name,
                department_name: answers.department,
                price: answers.price,
                stock_quantity: answers.quantity
                
            };

            connection.query(sqlQueryUpdate, newProduct, function (error, results) {

                if (error) {

                    throw error;
                }

                console.log(`The following product has been added!  ${newProduct.product_name}`);
                connection.end();


            })
         
        })





}
