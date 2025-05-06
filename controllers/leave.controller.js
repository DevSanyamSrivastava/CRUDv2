import Leave from '../models/Leave.js';

// Apply for leave
export const applyLeave = async (req, res) => {
  try {
    const { employeeId, dateFrom, dateTo, numberOfDays, time, reason } = req.body;

    const leave = new Leave({
      employeeId, dateFrom, dateTo, numberOfDays, time, reason
    });

    await leave.save();
    res.status(201).json({ message: 'Leave applied successfully!', leave });
  } catch (error) {
    res.status(500).json({ message: 'Error applying leave', error: error.message });
  }
};

// Get leave details for an employee
export const getLeavesByEmployee = async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.params.employeeId });
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leave records', error: error.message });
  }
};

// Update leave status (approve/reject)
export const updateLeaveStatus = async (req, res) => {
  try {
    const updatedLeave = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLeave) {
      return res.status(404).json({ message: 'Leave record not found' });
    }
    res.status(200).json(updatedLeave);
  } catch (error) {
    res.status(500).json({ message: 'Error updating leave status', error: error.message });
  }
};

// Delete leave request
export const deleteLeave = async (req, res) => {
  try {
    const deletedLeave = await Leave.findByIdAndDelete(req.params.id);
    if (!deletedLeave) {
      return res.status(404).json({ message: 'Leave record not found' });
    }
    res.status(200).json({ message: 'Leave deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting leave', error: error.message });
  }
};
