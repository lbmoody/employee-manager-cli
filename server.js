const mysql = require("mysql");
const inquirer = require("inquirer")
const cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost"
    , port: 3306
    , user: "root"
    , password: ""
    , database: "emp_manager_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

    start();
});

// TODOS

// research using env file to hide sql password

// base app functionality 

// view each table: departments, roles, employees
// insert to each table: departments, roles, employees
// update employee role

// if time allows...
// update an employee's manager
// view employees my manager
// delete departments, roles, and employees