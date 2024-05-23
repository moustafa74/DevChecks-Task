using Azure;
using DevChecks_Task.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DevChecks_Task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        System_Entity context;
        public EmployeeController(System_Entity context) //Constructor: Receives the database context via dependency injectio
        { 
            this.context = context;
        }

        // GET: api/employee
        [HttpGet]
        public IActionResult getAll() //  retrieve all employee records from  database 
        {
            List<Employee> employees = context.Employees.ToList();
            if (employees.Count > 0)  //checks if the employees list contains any records(if any employees were found in the database) 
            {
            return Ok(employees);
            }
            return BadRequest(); //  no employees are found, returns a Bad Request (400).

        }
        // GET: api/employee/id (Example 3)
        [HttpGet("{id}")]
        public IActionResult getById(int id)  //Retrieves a specific employee by ID from the database .
        {
            Employee employee = context.Employees.FirstOrDefault(x => x.Id == id);
            if (employee != null) {
                return Ok(employee);
            }
            return BadRequest();   //  the employee with the given ID is not found, returns a Bad Request (400).

        }
        [HttpPost]
        public IActionResult addEmployee(Employee emp)  /// Adds a new employee to the database.
        {
            if (!ModelState.IsValid)  //  the model state is invalid, returns a Bad Request with the validation errors.
            {
                return BadRequest(ModelState);
            }
            try
            {
                context.Employees.Add(emp); 
                context.SaveChanges();
                return Ok("Add Sucsess"); //the add operation is successful, returns an OK response(200).
            }
            catch
            {
                return BadRequest("error"); //an error occurs during the add operation in database, returns a Bad Request with the error message.
            }
            
        }
        // DELETE: api/employee/id 
        [HttpDelete("{id}")]
        public IActionResult deleteEmployee(int id)  // Deletes an employee by ID from the database.
        {
            Employee employee =context.Employees.FirstOrDefault(x=>x.Id == id);
            if (employee != null)
            {
                context.Employees.Remove(employee);
                context.SaveChanges();
                return Ok("Removed Successfully");
            }
            return BadRequest();  //  the employee with the given ID is not found, returns a Bad Request (400).
        }
        // PUT: api/employee/id
        [HttpPut("{id}")]
        public IActionResult updateEmployee(int id,[FromBody] Employee emp)  // Updates an existing employee with the given ID.
        {
            emp.Id = id;  //becouse form doesn't send "id" with emp object
            Employee employee = context.Employees.FirstOrDefault(x => x.Id == id);
            if (!ModelState.IsValid) //  the model state is invalid, returns a Bad Request with the validation errors.
            {
                return BadRequest(ModelState);
            }
            try
            {
                context.Entry(employee).CurrentValues.SetValues(emp);
                context.SaveChanges();
                return NoContent();    // the update operation is successful, returns a NoContent response (204).
            }
            catch (Exception e)
            {

                return BadRequest(e.Message); //  an error occurs during the update operation in database, returns a Bad Request with the error message.
            }
           
        }
    }
}
