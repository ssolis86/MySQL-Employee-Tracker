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
        connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.name as department_name, M.first_name as Manager_Name, employee_role.salary FROM employee INNER JOIN employee_role ON employee.role_id=employee_role.id INNER JOIN department ON employee_role.department_id=department.id INNER JOIN employee M ON employee.manager_id=M.id;", function (error, results, fields) {
        if (error) throw error;
        console.log('');
        console.table(results);
        console.log('');

    })

    run();
}

runUpdEmpRls = () => {
    console.log('runEmpRls');


    run();
}
