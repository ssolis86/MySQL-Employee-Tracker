USE employeeDB;

INSERT INTO department(name)
VALUES('administrative'), ('finance'), ('sales'), ('legal');

INSERT INTO employee_role (id, title, salary, department_id)
VALUES (1, 'Office Manager', 100000.00, 1),
    (2, 'Secretary', 50000.00, 1),
    (3, 'Accountant', 75000.00, 2),
    (4, 'Sales Person',15000.00, 3),
    (5, 'Attorney', 150000.00, 4);
    
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Stephen', 'Solis', 1, NULL),
    (2, 'Andrew', 'Solis', 2, 1),
    (3, 'Christopher', 'Solis', 2, 1),
    (4, 'Antoinette', 'Hu', 3, 1),
    (5, 'Vincent', 'Hu', 3, 1),
    (6, 'Bo', 'Jangles', 5, 1),
    (7, 'Babs', 'Sylvia', 5, 1),
    (8, 'Nelson', 'Cintinionellonita', 4, 1),
    (9, 'Barry', 'Finsgivins', 4, 1),
    (10, 'Sharlene', 'White', 4, 1);

