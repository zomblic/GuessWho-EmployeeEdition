import inquirer from 'inquirer';
import colors from 'colors';
import { Pool } from 'pg';



console.log(colors.rainbow('WELCOME TO EMPLOYEE TRACKER!'));
console.log(colors.rainbow('LET\'S GET STARTED!'));
console.log(colors.rainbow('PLEASE SELECT AN OPTION FROM THE MENU BELOW.'));


const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: process.env.DB_NAME,
  port: 5432,
});

const connectToDb = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database.');
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
}
connectToDb();

const menu = await inquirer.prompt([
  {
    type: 'list',
    name: 'mainMenu',
    message: colors.blue('WHAT WOULD YOU LIKE TO DO?'),
    choices: ['VIIEW ALL DEPARTMENTS', 'VIEW ALL ROLES', 'VIEW ALL EMPLOYEES', 'ADD A DEPARTMENT', 'ADD A ROLE', 'ADD AN EMPLOYEE', 'UPDATE AN EMPLOYEE ROLE', 'EXIT'],
  },
])
.then((answers) => {
  if (answers.mainMenu === 'VIEW ALL DEPARTMENTS') {
    viewDepartments();
  } else if (answers.mainMenu === 'VIEW ALL ROLES') {
    viewRoles(); 
  } else if (answers.mainMenu === 'VIEW ALL EMPLOYEES') {
    viewEmployees();
  }   else if (answers.mainMenu === 'ADD A DEPARTMENT') {
    addDepartment();
  }   else if (answers.mainMenu === 'ADD A ROLE') {
    addRole();
  }   else if (answers.mainMenu === 'ADD AN EMPLOYEE') {
    addEmployee();
  }   else if (answers.mainMenu === 'UPDATE AN EMPLOYEE ROLE') {
    updateEmployee();
  }   else if (answers.mainMenu === 'EXIT') {
    process.exit(0);
  }
});
console.log(menu);

const viewDepartments = async () => {
};

const viewRoles = async () => {
};

const viewEmployees = async () => {
};


const addEmployee = async () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'EmployeeFirstName',
      message: 'WHAT IS THE EMPLOYEE FIRST NAME?',
    },
    {
      type: 'input',
      name: 'EmployeeLastName',
      message: 'WHAT IS THE EMPLOYEE LAST NAME?',
    },
    {
      type: 'input',
      name: 'EmployeeRole',
      message: 'WHAT IS THE EMPLOYEE ROLE?',
    },
    {
      type: 'input',
      name: 'EmployeeManager',
      message: 'WHO IS THE EMPLOYEE MANAGER?',
    },
  ])
}
.then((answers) => {
  const { EmployeeFirstName, EmployeeLastName, EmployeeRole, EmployeeManager } = answers;
  pool.query(
    `INSERT INTO employees (first_name, last_name, role, manager)
    VALUES ($1, $2, $3, $4)`,
    [EmployeeFirstName, EmployeeLastName, EmployeeRole, EmployeeManager],
    (err, res) => {
      if (err) {
        console.error('Error inserting employee:', err);
      } else {
        console.log('Employee inserted successfully!');
      }
    }
  );
});

const updateEmployee = async () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'updateEmployee',
      message: colors.magenta('WHICH EMPLOYEE WOULD YOU LIKE TO UPDATE?'),
      choices: ['EMPLOYEE 1', 'EMPLOYEE 2', 'EMPLOYEE 3'], // replace with actual employee names from database
    },
    {
      type: 'list',
      name: 'updateRole',
      message: colors.magenta('WHAT IS THE EMPLOYEE NEW ROLE?'),
      choices: ['ROLE 1', 'ROLE 2', 'ROLE 3'], // replace with actual role names from database
    },
    {
      type: 'input',
      name: 'updateManager',
      message: colors.magenta('WHO IS THE EMPLOYEE NEW MANAGER?'),
    },
    {
      type: 'input',
      name: 'updateDepartment',
      message: colors.magenta('WHAT IS THE EMPLOYEE NEW DEPARTMENT?'),
    },
    {
      type: 'input',
      name: 'updateSalary',
      message: colors.magenta('WHAT IS THE EMPLOYEE NEW SALARY?'),
    }
  ])
} .then((answers) => {
  const { updateEmployee, updateRole, updateManager, updateDepartment, updateSalary } = answers;

  pool.query(
    `UPDATE employees
    SET role = $1, manager = $2, department = $3, salary = $4
    WHERE employee = $5`,
    [updateRole, updateManager, updateDepartment, updateSalary, updateEmployee],
    (err, res) => {
      if (err) {
        console.error('Error updating employee:', err);
      } else {
        console.log('Employee updated successfully!');
      }
    }
  );
});

const addRole = async () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'whatRole',
      message: 'WHAT ROLE WOULD YOU LIKE TO ADD?',
    },
    {
      type: 'input',
      name: 'roleCalled',
      message: 'WHAT IS THE ROLE CALLED?',
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: 'WHAT IS THE ROLE SALARY?',
    },
    {
      type: 'list',
      name: 'roleDepartment',
      message: 'WHAT DEPAERTMENT IS THE ROLE IN?',
      choices: ['SALES', 'ENGINEERING', 'FINANCE', 'LEGAL'], // replace with actual department names from database
    },
  ])
} .then((answers) => {
  const { whatRole, roleCalled, roleSalary, roleDepartment } = answers;
  pool.query(
    `INSERT INTO roles (role, salary, department)
    VALUES ($1, $2, $3)`,
    [roleCalled, roleSalary, roleDepartment],
    (err, res) => {
      if (err) {
        console.error('Error inserting role:', err);
      } else {
        console.log('Role inserted successfully!');
      }
    }
  );
});


const addDepartment = async () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'whatdepartment',
      message: colors.cyan('WHAT IS THE NAME OF THE DEPARTMENT?'),
    },
  ])
} .then((answers) => {
  const { whatdepartment } = answers;
  pool.query(
    `INSERT INTO departments (department)
    VALUES ($1)`,
    [whatdepartment],
    (err, res) => {
      if (err) {
        console.error('Error inserting department:', err);
      } else {
        console.log('Department inserted successfully!');
      }
    }
  );
});

const deleteEmployee = async () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'deleteEmployee',
      message: colors.red('WHICH EMPLOYEE WOULD YOU LIKE TO DELETE?'),
      choices: ['EMPLOYEE 1', 'EMPLOYEE 2', 'EMPLOYEE 3'], // replace with actual employee names from database
    },
  ]) .then((answers) => {
  const { deleteEmployee } = answers;
  pool.query(
    `DELETE FROM employees
    WHERE employee = $1`,
    [deleteEmployee],
    (err, res) => {
      if (err) {
        console.error('Error deleting employee:', err);
      } else {
        console.log('Employee deleted successfully!');
      }
    }
  );
});

  console.log(deleteEmployee);
}