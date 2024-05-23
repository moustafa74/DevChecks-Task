# DevChecks-Task

## Features
Add Employee: A user-friendly form for capturing essential employee details (name, job role, gender, first appointment status, start date, and notes).

View Employees: A table displays all employee records, providing an overview of the workforce.

Edit Employee: Click the "Edit" button next to an employee to pre-populate the form with their details for easy modification.

Delete Employee: Click the "Delete" button to remove an employee record from the system.

Client-Side Validation: The form includes JavaScript validation to ensure data accuracy before submission.

Server-Side Validation : The API include additional server-side validation logic.

CRUD Operations: The application supports Create, Read, Update, and Delete (CRUD) operations on employee data.
## Technologies Used
Frontend: ASP.NET Core MVC , HTML, CSS, JavaScript (jQuery).

Backend: ASP.NET Core Web API.

Database: SQL Server.

ORM : Entity Framework Core.


## Code Structure
Models: Defines the Employee class to represent employee data.

Controllers (API): Contains the EmployeeController with CRUD actions.

Views: Renders the employee form and table.

wwwroot/js/master.js: Client-side JavaScript for form interaction, validation, and AJAX calls to the API.

## Error Handling
### The code includes basic error handling:

Client-side: alert() messages for AJAX errors.

Server-side: BadRequest responses with error details when validation fails or exceptions occur.

## Security Considerations
Input Validation: Always validate user input on both the client and server sides to prevent vulnerabilities like  SQL injection.
