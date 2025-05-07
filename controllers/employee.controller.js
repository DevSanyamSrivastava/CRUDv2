import Employee from '../models/Employee.js';

// Register a new employee
export const registerEmployee = async (req, res) => {
  try {
    const {
      companyId, employeeId, name, email, username, phoneNo,
      password, departmentId, salary, jobTitleId, gender,
      dateOfBirth, joiningDate, address, bio
    } = req.body;

    const profileImage = req.file ? req.file.filename : null;

    const employee = new Employee({
      companyId, employeeId, name, email, username, phoneNo,
      password, departmentId, salary, jobTitleId, gender,
      dateOfBirth, joiningDate, address, bio, profileImage
    });

    await employee.save();
    res.status(201).json({ message: 'Employee registered successfully!', employee });
  } catch (error) {
    res.status(500).json({ message: 'Error registering employee', error: error.message });
  }
};

// Login employee (add this function for login logic)
export const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Plaintext password check (⚠️ not for production)
    if (employee.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', employee });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in employee', error: error.message });
  }
};

// Get all employees for a company
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ companyId: req.params.companyId });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};

// Get employee by ID
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error: error.message });
  }
};

// Update employee details
export const updateEmployee = async (req, res) => {
  try {
    if ('email' in req.body) {
      return res.status(400).json({ message: 'Email cannot be updated' });
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.profileImage = req.file.filename;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error: error.message });
  }
};

// Delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
};
