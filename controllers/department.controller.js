import Department from '../models/Department.js';
import JobTitle from '../models/JobTitle.js';
// Create a new department
export const createDepartment = async (req, res) => {
  try {
    const { companyId, departmentName } = req.body;
    
    const department = new Department({
      companyId, departmentName
    });
    
    await department.save();
    res.status(201).json({ message: 'Department created successfully!', department });
  } catch (error) {
    res.status(500).json({ message: 'Error creating department', error: error.message });
  }
};

// Get all departments for a company
export const getDepartmentsByCompany = async (req, res) => {
  try {
    const departments = await Department.find({ companyId: req.params.companyId });
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching departments', error: error.message });
  }
};

// Update department details
// Update leave status (approve/reject) - PATCH route
export const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status value
    const allowedStatuses = ['Pending', 'Approved', 'Rejected'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    
    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: 'Leave record not found' });
    }

    res.status(200).json(updatedLeave);
  } catch (error) {
    res.status(500).json({ message: 'Error updating leave status', error: error.message });
  }
};


// Delete department

export const deleteDepartment = async (req, res) => {
  try {
    const departmentId = req.params.id;

    // Check if any job titles are associated with this department
    const jobTitleCount = await JobTitle.countDocuments({ departmentId });
    if (jobTitleCount > 0) {
      return res.status(400).json({
        message: 'Cannot delete department. Delete associated Job Titles first.'
      });
    }

    // Delete the department
    const deletedDepartment = await Department.findByIdAndDelete(departmentId);
    if (!deletedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({ message: 'Department deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error deleting Department', error: error.message });
  }
};