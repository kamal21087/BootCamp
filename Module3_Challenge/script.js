// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = function() {
  const employees = [];
  
  while (true) {
    const firstName = prompt('Enter employee first name:');
    if (!firstName) break;
    
    const lastName = prompt('Enter employee last name:');
    if (!lastName) break;
    
    const salaryInput = prompt('Enter employee salary (e.g., 50000 or 50000.00):');
    const salary = parseFloat(salaryInput);
    if (isNaN(salary)) {
      alert('Invalid salary. Please enter a valid number.');
      continue;
    }
    
    employees.push({
      firstName: firstName,
      lastName: lastName,
      salary: salary
    });

    const continueAdding = confirm('Do you want to add another employee?');
    if (!continueAdding) break;
  }
  
  return employees;
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  if (employeesArray.length === 0) {
    console.log('No employee data to calculate average salary.');
    return;
  }

  // Calculate total salary using reduce
  const totalSalary = employeesArray.reduce((sum, employee) => sum + employee.salary, 0);
  // Calculate average salary
  const averageSalary = totalSalary / employeesArray.length;

  // Format the average salary as currency with exactly two decimal places
  const formattedAverageSalary = averageSalary.toFixed(2);

  console.log(`The average employee salary between our ${employeesArray.length} employee(s) is $${formattedAverageSalary}`);
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  if (employeesArray.length === 0) {
    console.log('No employees to select.');
    return;
  }

  // Generate a random index within the range of employeesArray
  const randomIndex = Math.floor(Math.random() * employeesArray.length);
  const randomEmployee = employeesArray[randomIndex];
  
  // Output the selected random employee
  console.log(`Congratulations to ${randomEmployee.firstName} ${randomEmployee.lastName}, our random drawing winner!`);
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
