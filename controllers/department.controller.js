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
export const updateDepartment = async (req, res) => {
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating department', error: error.message });
  }
};

// Delete department
export const deleteDepartment = async (req, res) => {
    try {
    const departmentId = req.params.id;

  
    const jobTitleCount = await JobTitle.countDocuments({ departmentId });
    if (jobTitleCount > 0) {
      return res.status(400).json({
        message: 'Cannot delete company. Delete associated Job Titles first.'
      });
    }

    const deletedCompany = await JobTitle.findByIdAndDelete(departmentId);
    if (!deletedCompany) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({ message: 'Department deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error deleting Department', error: error.message });
  }
};
