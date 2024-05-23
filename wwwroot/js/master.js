class Employee { 
    constructor(name, job_role, gender, isfirst_appointment, start_date, notes) {
        this.name = name;
        this.job_role = job_role;
        this.gender = gender;
        this.isfirst_appointment = isfirst_appointment;
        this.start_date = start_date;
        this.notes = notes;
    }
}
$(document).ready(function () { 
    getAllEmployee();// Initial Fetch: Load employees when the page loads
    // Form Submission:
    $("#employeeForm").submit(function (event) {
        event.preventDefault();
        if (validateForm()) {
            var employee = new Employee( // collecting employee information and constructing an Employee object to represent the data
                $("#name").val(),
                $("#job_role").val(),
                $("input[name='gender']:checked").val(),
                $("#isfirst_appointment").is(":checked"),
                $("#start_date").val(),
                $("#notes").val()
            );
            if ($("#Id").val()) { // if there is (hidden id) in form  that mean it's update employee
                updateEmployee(employee);
            } else {            // no hidden id that mean it's add employee
                addEmployee(employee);
            }
        }
    });
    $(document).on("click", ".editBtn", function () { // if edit button in table clicked (event delegation)
        $("#name").focus();
        var employeeId = $(this).data("id");
        getEmployeeDetails(employeeId); // get employee data from api and send it to form 
    });
    $(document).on("click", ".deleteBtn", function () { // if delete button in table clicked (event delegation)
        var employeeId = $(this).data("id");
        deleteEmployee(employeeId);  //delete Employee 

    });
});
function validateForm() {
    var isValid = true;
    var name = $("#name").val();
    if (name.trim() === "" || !/^[a-zA-Z\s]*$/.test(name)) {
        //$("#name").addClass("is-invalid");
        $("#name-error").text("Please enter Valid name.");
        $("#name").focus();
        isValid = false;
    } else {
        //$("#name").removeClass("is-invalid");
        $("#name-error").text("");
    }
    return isValid;
}
function getAllEmployee() {
    $.ajax({  
        url: '/api/employee',
        type: 'GET',
        contentType: 'application/json',
        success: function (employees) {  //list of employees sent from api
            $("#employeeList").empty();
            if (employees.length === 0) {   //no employees in database
                $("#employeeList").append("<p>No employees found.</p>");
            }
            else {     //  function iterates through an array of employees fetched from API and put it in the table
                employees.forEach(function (emp) {
                    $("#employeeList").append("<tr>");
                    $("#employeeList").append("<td>" + emp.id + "</td>");
                    $("#employeeList").append("<td>" + emp.name + "</td>");
                    $("#employeeList").append("<td>" + emp.job_role + "</td>");
                    $("#employeeList").append("<td>" + emp.gender + "</td>");
                    $("#employeeList").append("<td>" + emp.isfirst_appointment + "</td>");
                    $("#employeeList").append("<td>" + emp.start_date.split('T')[0] + "</td>");
                    $("#employeeList").append("<td>" + emp.notes + "</td>");
                    $("#employeeList").append("<td ><button class='btn btn-sm btn-warning editBtn' data-id='" + emp.id + "'>Edit </button></td>"); //add button to upadte and delete with class(U,D Btn) to select it when clicked
                    $("#employeeList").append("<td ><button  class='btn btn-sm btn-danger deleteBtn' data-id='" + emp.id + "'>Delete </button></td>");
                    $("#employeeList").append("</tr>");
                });
            }
        },
        error: function (xhr, status, error) {
            // Handle error response
            //$("#employeeList").append("<p text-center>No employees found.</p>");
            //alert("Error Get Employess employee: " + status);
        }
    });
}
function updateEmployee(employee) {
    $.ajax({
        url: '/api/employee/' + $("#Id").val(), // API endpoint
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(employee),
        success: function (response) {
            // Handle successful response (e.g., redirect, show message)
            alert("Updated");
            $("#employeeForm")[0].reset(); // Clear the form
            $("#name-error").text(""); //clear the error span
            location.reload();
        },
        error: function (xhr, status, error) {
            // Handle error response
            var errors = xhr.responseJSON;
            $("#name-error").text(errors.errors.name);  // put error in the spam in the form 
            alert("Error Updating employee: " + errors.title);
        }
    });
}
function addEmployee(employee) {
    $.ajax({
        url: '/api/employee', // API endpoint
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(employee),
        success: function (response) {
            // Handle successful response (e.g., redirect, show message)
            $("#name-error").text(""); //clear the error span
            alert(response);
            location.reload();
        },
        error: function (xhr, status, error) {
            // Handle error response
            var errors = xhr.responseJSON;
            $("#name-error").text(errors.errors.name); // put error in the spam in the form 
            alert("Error adding employee: " + errors.title);
        }
    });
}

function getEmployeeDetails(employeeId) {
    $.ajax({
        url: '/api/employee/' + employeeId,
        type: 'GET',
        success: function (employee) {
            // Populate the table with employee details
            $("#Id").val(employee.id);  // hidden input 
            $("#name").val(employee.name);
            $("#job_role").val(employee.job_role);
            $("input[name='gender'][value='" + employee.gender + "']").prop('checked', true);
            $("#isfirst_appointment").prop('checked', employee.isfirst_appointment);
            $("#start_date").val(employee.start_date.split('T')[0]); // Assuming correct date format from API
            $("#notes").val(employee.notes);
        },
        error: function (xhr, status, error) {
            alert("Error get employee: " + status);
        }
    });
}

function deleteEmployee(employeeId) {
    $.ajax(
        {
            url: '/api/Employee/' + employeeId,
            type: 'DELETE',
            success: function (respone) {
                location.reload();
                alert("Deleted Successfully");
            },
            error: function (xhr, status, error) {
                alert("Error delete employee: " + status);
            }
        });
}


