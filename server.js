const mysql = require('mysql');
const inquirer = require('inquirer');
const cTables = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Loeffler1986',
    database: 'employeeDB',
});

connection.connect((error ) => {
    if (error) throw error;
    console.log(`Connected: + ${connection.threadId}`);

    run();
})

const  run = () => {
    inquirer
      .prompt({
        name: "option",
        type: "list",
        message: "Do you need to [ADD DEPARTMENT] , [ADD ROLE] , [ADD EMPLOYEE], [VIEW DEPARTMENT], [VIEW ROLE], [VIEW EMPLOYEES], [UPDATE EMPLOYEE ROLES] ",
        choices: ['ADD DEPARTMENT' , 'ADD ROLE' , 'ADD EMPLOYEE', 'VIEW DEPARTMENT', 'VIEW ROLE', 'VIEW EMPLOYEES', 'UPDATE EMPLOYEE ROLES'],
      })
      .then((answer) => {
        switch (answer.option) {
            case "ADD DEPARTMENT":
                runAddDep();
                break;
            case "ADD ROLE":
                runAddRole();
                break;
            case "ADD EMPLOYEE":
                runAddEmp();
                break;
            case "VIEW DEPARTMENT":
                runViewDep();
                break;
            case "VIEW ROLE":
                runViewRole();
                break;
            case "VIEW EMPLOYEES":
                runViewEmp();
                break;
            case "UPDATE EMPLOYEE ROLES":
                runUpdEmpRls();
                break;
        }
    });
};

runAddDep = () => {
    console.log('runAddDep');



    run();
}

runAddRole = () => {
    console.log('runAddRole');



    run();
}

runAddEmp = () => {
    console.log('runAddEmp');


    run();
}

runViewDep = () => {
    console.log('runViewDep');


    run();
}

runViewRole = () => {
    console.log('runViewRole');


    run();
}

runViewEmp = () => {
    console.log('runViewEmp');


    run();
}

runUpdEmpRls = () => {
    console.log('runEmpRls');


    run();
}
