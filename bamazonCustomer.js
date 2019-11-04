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
})

//Display the item options to customer//

showProducts();
function showProducts() {

    let sqlQuery = "SELECT * FROM products";

    connection.query(sqlQuery, function (error, results) {


        if (error) {

            throw error;
        }
        console.log("Welcome to Bamazon!! Please see items below");
        console.log("*********************************");

        for (i = 0; i < results.length; i++) {


            console.log(`Item ID: ${results[i].item_id}`);
            console.log(`Product Name: ${results[i].product_name}`);
            console.log(`Price: $ ${results[i].price}`);
            console.log("*********************************")

           
        }
       
        askQuestions();
    })


}




// call to inquirer to prompt messages to customer//
function askQuestions(){
inquirer
    .prompt([
        {
            type: "inpt",
            name: "itemID",
            message: "Please enter the ID item of the product you would like to order"
        },
        {
            type: "inpt",
            name: "quantity",
            message: "Please enter the quantity you would like to order"
        },


    ])
    .then(answers => {
       
console.log(answers);

updateProducts(answers);







    })};

  //Customer choice//

  function updateProducts (answers){

    let sqlQueryUpdate = "SELECT * FROM products WHERE ?";
    let productParams = [{item_id: answers.itemID}];

    connection.query(sqlQueryUpdate, productParams, function(error, results){

        if (error) {

            throw error;
        }

        // console.log(results[0].stock_quantity);
        // console.log(answers.quantity);

        if (results[0].stock_quantity < 0 || results[0].stock_quantity - answers.quantity < 0 ){

            console.log("Insufficient Quantity!!")
        }

        else{


            connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: results[0].stock_quantity - answers.quantity}, {item_id: answers.itemID}], function(error, results){

                if (error) {

                    throw error;
                }

                console.log("in stock");

            })
        }


    })


// connection.end();

  }


  //Check inventory//

//   function updateProducts (answers){

//     let sqlQueryUpdate = "UPDATE products SET ? WHERE ?";
//     let productParams = [{stock_quantity: stock_quantity - answers.quantity}, {item_id: answers.itemID}];

//     connection.query(sqlQueryUpdate, productParams, function(error, results){

//         if (error) {

//             throw error;
//         }

//         console.log(results);


//     })




//   }

  // After inventory respond to customer if avalalible//

  // If not alert//

  //If avalaible update database//


  //Display to customer cost of order//