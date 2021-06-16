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
    function initiate() {
        let getDepartments = `SELECT * FROM department; `
        connection.query(getDepartments, 
            function (error, results) {
                if (error) throw error;
                    let departmentNames = [];
                    for(var i = 0; i < results.length; i++) {
                        departmentNames.push(results[i].name);
                    }
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'roleTitle',
                            message: 'Enter the role title ',
                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'Enter the roles salary: ',
                        },
                        {
                            type: 'list',
                            name: 'position',
                            message: 'What is the department?: ',
                            choices: departmentNames
                        }
                    ]).then((resp) => {
                        let departmentId;
                        for(var i = 0; i < results.length; i++) {
                            if (results[i].name == resp.position) {
                                departmentId = results[i].id;
                                break;
                            }
                        }
                        let insertQuery = `INSERT into employee_role (title, salary, department_id) VALUES ('${resp.roleTitle}', '${resp.salary}', ${departmentId}) `
                        connection.query(insertQuery, 
                            function (error, results) {
                                if (error) throw error;
                                    console.log("ROLE ADDED")
                            }
                        )
                        run();
                    })
                }
        )
    }
    initiate();
}

runAddEmp = () => {
    
    function initiate() {
        let getRoles = `SELECT * FROM employee_role; `
        connection.query(getRoles, 
            function (error, results) {
                let roles = [];
                for(var i = 0; i < results.length; i++) {
                    roles.push(results[i].title);
                }
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
                        choices: roles
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: "Who is this employee's manager?",
                        choices: ['Stephen']
                    }
                ]).then((resp) => {
                    let positionId;
                        for(var i = 0; i < results.length; i++) {
                            if (results[i].title == resp.position) {
                                positionId = results[i].id;
                                break;
                            }
                        }
                    let managerId = 1;
                    var query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) Values ('${resp.firstName}', '${resp.lastName}', ${positionId}, ${managerId}); `
                    connection.query(query, 
                        function (error, results) {
                            if (error) throw error;
                                console.log('EMPLOYEE ADDED');
                        }
                    )
                    run();
                })
            }
        )
    }
    initiate();
}

runViewDep = () => {
    connection.query("SELECT department.name FROM department;", 
            function (error, results, fields) {
                if (error) throw error;
                    console.log('');
                    console.table(results);
                    console.log('');
                    run();
            }
        )
}

runViewRole = () => {
    connection.query("SELECT employee_role.id, employee_role.title FROM employee_role;", 
            function (error, results, fields) {
                if (error) throw error;
                    console.log('');
                    console.table(results);
                    console.log('');
                    run();
            }
        )
    
}

runViewEmp = () => {
    console.log('runViewEmp');
        connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.name as department_name, M.first_name as Manager_Name, employee_role.salary FROM employee INNER JOIN employee_role ON employee.role_id=employee_role.id INNER JOIN department ON employee_role.department_id=department.id INNER JOIN employee M ON employee.manager_id=M.id;", 
            function (error, results, fields) {
                if (error) throw error;
                    console.log('');
                    console.table(results);
                    console.log('');
                    run();
            }
        )
}

runUpdEmpRls = () => {
    function initiate() {
        let roles = "SELECT * from employee_role;"

        connection.query(roles, 
            function (error, results) {
                if (error) throw error;
                let roles = [];
                for(var i = 0; i < results.length; i++) {
                    roles.push(results[i].title);
                }
                connection.query("SELECT * FROM department;", 
                    function (error, departmentResults, fields) {
                        if (error) throw error;
                            let departments = [];
                            for(var i = 0; i < departmentResults.length; i++) {
                                departments.push(departmentResults[i].name);
                            }
                            
                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'position',
                                    message: 'What Role would you like to change?',
                                    choices: roles
                                },
                                {
                                    type: 'input',
                                    name: 'newRoleTitle',
                                    message: 'Enter the new title for the role.'
                                },
                                {
                                    type: 'input',
                                    name: 'salary',
                                    message: 'Enter a new salary for the role.'
                                },
                                {
                                    type: 'list',
                                    name: 'newRoleDepartment',
                                    message: 'Choose a new department.',
                                    choices: departments
                                }
                            
                            ]).then((resp) => {
                                let modifiedRoleId;
                                let newDepId;
                                for(var i = 0; i < roles.length; i++) {
                                    if (results[i].title == resp.position) {
                                        modifiedRoleId = results[i].id;
                                        break;
                                    }
                                }

                                for(var i = 0; i < departments.length; i++) {
                                    if (departmentResults[i].name == resp.newRoleDepartment) {
                                        newDepId = departmentResults[i].id;
                                        break;
                                    }
                                }
                                let updateQueryString = `UPDATE employee_role SET title='${resp.newRoleTitle}',salary=${resp.salary},department_id=${newDepId} WHERE id=${modifiedRoleId};`
                                    connection.query(updateQueryString, 
                                        function (error, departmentResults, fields) {
                                            if (error) throw error;
                                            console.log('The employee role has been modified!');
                                                run();
                                        })
                                    })
                    }
                )
            }
        )
    }
    initiate();
}
