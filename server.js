const mysql = require('mysql');
const inquirer = require('inquirer');
const cTables = require('console.table');

const connection = mysql.connection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Loeffler1',
    database: 'Employee_DB',
});

connection.connect((error ) => {
    if (error) throw error;
    console.log(`Connected: + ${connection.threadId}`);

    initiate();
})

const initiate = () => {
    inquirer.prompt(
        {
            type: 'list',
            message: 'What do you need?',
            choices: ['View Employees', 'View Employees by Department']
        }
    )
}
