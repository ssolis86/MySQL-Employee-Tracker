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
            default:
                break;
        }
    });
};

runAddDep = () => {
    function initiate() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the new department?'
            }
        ])
        .then((result) => {
            var departmentName = result.departmentName;
            var query = `INSERT INTO department (name) Values ('${departmentName}'); `
            connection.query(query, 
                function (error, results) {
                    if (error) throw error;
                        console.log('DEPARTMENT ADDED');
                }
            )
            run();
        }) 
    }
    initiate();
}

runAddRole = () => {
    console.log('runAddRole');



    run();
}

runAddEmp = () => {
    
    function initiate() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the employees first name: ',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the employees last name: ',
        },
        {
            type: 'list',
            name: 'position',
            message: 'What is the employees position?: ',
            choices: ['Office Manager', 'Secretary', 'Accountant', 'Sales Person', 'Attorney']
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is this employee's manager?",
            choices: ['Stephen']
        }
    ]).then((resp) => {
        let positionId;
        if (resp.position === "Office Manager") {
            positionId = 1;
        } else if (resp.position === "Secretary") {
            positionId = 2
        } else if (resp.position === "Accountant") {
            positionId = 3;
        } else if (resp.position === "Sales Person") {
            positionId = 4;
        } else {
            positionId = 5;
        }
        let managerId = 1;
        var query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) Values ('${resp.firstName}', '${resp.lastName}', ${positionId}, ${managerId}); `
        console.log(query);
        connection.query(query, 
            function (error, results) {
                if (error) throw error;
                    console.log('EMPLOYEE ADDED');
            }
        )
        run();
    })};
    initiate();
}

runViewDep = () => {
    connection.query("SELECT department.name FROM department;", 
            function (error, results, fields) {
                if (error) throw error;
                    console.log('');
                    console.table(results);
                    console.log('');
            }
        )
    run();
}

runViewRole = () => {
    connection.query("SELECT employee_role.id, employee_role.title FROM employee_role;", 
            function (error, results, fields) {
                if (error) throw error;
                    console.log('');
                    console.table(results);
                    console.log('');
            }
        )
    run();
}

runViewEmp = () => {
    console.log('runViewEmp');
        connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.name as department_name, M.first_name as Manager_Name, employee_role.salary FROM employee INNER JOIN employee_role ON employee.role_id=employee_role.id INNER JOIN department ON employee_role.department_id=department.id INNER JOIN employee M ON employee.manager_id=M.id;", 
            function (error, results, fields) {
                if (error) throw error;
                    console.log('');
                    console.table(results);
                    console.log('');
            }
        )

    run();
}

runUpdEmpRls = () => {
    

    run();
}
