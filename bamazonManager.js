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

    console.log(`successfully connected as id ${connection.threadId}`);
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

                    break;


                case "Add New Product":

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
                console.log(`Price: $ ${results[i].stock_quantity}`);
                console.log("*********************************")


            }
        }

    })


}

