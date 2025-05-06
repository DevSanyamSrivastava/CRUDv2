import JobTitle from '../models/JobTitle.js';

// Create a new job title
export const createJobTitle = async (req, res) => {
  try {
    const { companyId, departmentId, jobTitle } = req.body;

    const jobTitleObj = new JobTitle({
      companyId, departmentId, jobTitle
    });

    await jobTitleObj.save();
    res.status(201).json({ message: 'Job title created successfully!', jobTitleObj });
  } catch (error) {
    res.status(500).json({ message: 'Error creating job title', error: error.message });
  }
};

// Get all job titles for a company
export const getJobTitlesByCompany = async (req, res) => {
  try {
    const jobTitles = await JobTitle.find({ companyId: req.params.companyId });
    res.status(200).json(jobTitles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job titles', error: error.message });
  }
};

// Get all job titles for a specific department
export const getJobTitlesByDepartment = async (req, res) => {
  try {
    const jobTitles = await JobTitle.find({ departmentId: req.params.departmentId });
    res.status(200).json(jobTitles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job titles by department', error: error.message });
  }
};


// Update a job title by ID
export const updateJobTitle = async (req, res) => {
  try {
    const updatedJobTitle = await JobTitle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJobTitle) {
      return res.status(404).json({ message: 'Job title not found' });
    }
    res.status(200).json(updatedJobTitle);
  } catch (error) {
    res.status(500).json({ message: 'Error updating job title', error: error.message });
  }
};

// Delete a job title by ID
export const deleteJobTitle = async (req, res) => {
  try {
    const deletedJobTitle = await JobTitle.findByIdAndDelete(req.params.id);
    if (!deletedJobTitle) {
      return res.status(404).json({ message: 'Job title not found' });
    }
    res.status(200).json({ message: 'Job title deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job title', error: error.message });
  }
};
