# employee-manager-cli
Employee Manager CLI application that utilizes inquirer to help the user navigate through a mySQL database.

## installation
This application uses 4 npm packages, [mysql](https://www.npmjs.com/package/mysql) for managing connection with database, [inquirer](https://www.npmjs.com/package/inquirer) give the user an interface through the command line, [dotenv](https://www.npmjs.com/package/dotenv) keep database credentials private in the .env file and finally [console.table](https://www.npmjs.com/package/console.table) for a cleaner table display. After cloning app please run `npm i` or `npm install` to download these dependancies.

Inside the assets folder there is a [seed.sql](./assets/seed.sql) file that can be run on a local mysql server to have the same database set up. There is also some sample data to import to the tables if need be. 

To start the applicaiton locally run `node managerjs` in your command prompt of the applications respository.

## usage
This applicaion allows a user without sql database knowledge the ablitity to interact directly with a database. The functionality currently allows the user 7 actions:
 
 - View All Employees
 - View All Employees by Department
 - View All Employees by Role
 - Add an Employee
 - Update an Employee's Role
 - Remove an Employee
 - Exit

Selection of these items will prompt addtional inquirer prompts that allow the user to complete the selected action. On completion of an action the user will be redirected back to the list of 7 actions. When complete the user may close the application by selecting `Exit`.

## gif-walkthrough

![app-walkthrough](./assets/gifs/employee_manager.gif)