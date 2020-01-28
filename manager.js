require('dotenv').config({ path: __dirname + '/.env' })
const mysql = require("mysql");
const inquirer = require("inquirer")
const cTable = require("console.table");

var connection = mysql.createConnection({
    host: process.env.DB_HOST
    , port: process.env.DB_PORT
    , user: process.env.DB_USER
    , password: process.env.DB_PASS
    , database: process.env.DB_DB
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

    initialize();
});

const initialize = () => {
    inquirer
        .prompt([
            {
                type: "list"
                , name: "init"
                , message: "What would you like to do?"
                , choices: [
                    "View All Employees"
                    , "View All Employees by Department"
                    , "View All Employees by Role"
                    , "Add an Employee"
                    , "Remove an Employee"
                    , "Update Employee Role"
                    , "View All Roles"
                    , "Exit"
                ]
            }
        ]).then((answer) => {
            switch (answer.init){
                case "View All Employees":
                    viewEmployees();
                break;
                case "View All Employees by Department":
                    viewDeparments();
                break;
                case "View All Employees by Role":
                    viewRoles();
                break;
                case "Add an Employee":
                    addEmployee();
                break;
                case "Remove an Employee":
                
                break;
                case "Update Employee Role":
                
                break;
                default:
                    connection.end();

            }
        });
}

const viewEmployees = () => {
    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, IFNULL(CONCAT(empMan.first_name, ' ', empMan.last_name), 'None') AS manager from employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id JOIN employee empMan ON employee.manager_id = empMan.id ORDER BY employee.id"
    connection.query(
        query
        , (err, res) => {
            if (err) throw err;
            console.table(res);
            initialize();
        }
    )
};

const viewDeparments = () => {
    const query = "SELECT * FROM department;"
    connection.query(
        query
        , (err, res) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name:"choice"
                        , type: "list"
                        , message: "Which Department would you like to view?"
                        , choices: () => {
                            var choiceArray = [];
                            for (const item of res) {
                                choiceArray.push(item.name)
                            }
                            return choiceArray;
                        }
                    }
                ]).then(data => {
                    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title , department.name, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE ?;"
                    connection.query(
                        query
                        , [{
                            "department.name": data.choice
                        }]
                        , (err, res) => {
                            if (err) throw err;
                            console.table(res)
                            initialize();
                        }
                    )
                })
        }
    )
}

const viewRoles = () => {
    const query = "SELECT * FROM role;"
    connection.query(
        query
        , (err, res) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name:"choice"
                        , type: "list"
                        , message: "Which Role would you like to view?"
                        , choices: () => {
                            var choiceArray = [];
                            for (const item of res) {
                                choiceArray.push(item.title)
                            }
                            return choiceArray;
                        }
                    }
                ]).then(data => {
                    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title , department.name, role.salary FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE ?;"
                    connection.query(
                        query
                        , [{
                            "role.title": data.choice
                        }]
                        , (err, res) => {
                            if (err) throw err;
                            console.table(res)
                            initialize();
                        }
                    )
                })
        }
    )
}

const addEmployee = () => {
    const query = "SELECT title FROM role;"
    connection.query(
        query
        , (err, res) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {   
                        name: "firstName"
                        , type: "input"
                        , message: "What is the Employees First Name?"
                    },
                    {
                        name: "lastName"
                        , type: "input"
                        , message: "What is the Employees Last Name?"
                    },
                    {
                        name: "choice"
                        , type: "list"
                        , message: "What is this employee's title?"
                        , choices: () => {
                            var choiceArray = [];
                            for (const item of res) {
                                choiceArray.push(item.title)
                            }
                            return choiceArray;
                        }
                    }
                ]).then(data => {
                    const query = "SELECT id FROM role WHERE ?"
                    connection.query(
                        query
                        , { title: data.choice}
                        , (err, res, data) => {
                            if (err) throw err;
                            const insertQuery = `INSERT INTO employee SET ?`
                            connection.query(
                                insertQuery
                                , {
                                    first_name: data.firstName
                                    , last_name: data.lastName
                                    , role_id: res.id
                                }
                                , (err) => {
                                    if (err) throw err;
                                    console.log("Employee Added!");
                                    initialize();
                                }
                            )
                        }
                    )
                })
        }
    )
}
// TODOS

// research using env file to hide sql password

// base app functionality 

// view all employee, view employees by department, view employees by rolw

// view each table: departments, roles, employees
// insert to each table: departments, roles, employees
// update employee role

// if time allows...
// update an employee's manager
// view employees my manager
// delete departments, roles, and employees