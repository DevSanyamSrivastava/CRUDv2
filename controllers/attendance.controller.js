import Attendance from '../models/Attendance.js';

// Record attendance for an employee
export const recordAttendance = async (req, res) => {
  try {
    const { employeeId, date, day, checkInTime, checkOutTime, duration, status } = req.body;
    
    const attendance = new Attendance({
      employeeId, date, day, checkInTime, checkOutTime, duration, status
    });
    
    await attendance.save();
    res.status(201).json({ message: 'Attendance recorded successfully!', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Error recording attendance', error: error.message });
  }
};

// Get attendance for an employee
export const getAttendanceByEmployee = async (req, res) => {
  try {
    const attendance = await Attendance.find({ employeeId: req.params.employeeId });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance', error: error.message });
  }
};

// Update attendance details
export const updateAttendance = async (req, res) => {
  try {
    const updatedAttendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAttendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.status(200).json(updatedAttendance);
  } catch (error) {
    res.status(500).json({ message: 'Error updating attendance', error: error.message });
  }
};

// Delete attendance record
export const deleteAttendance = async (req, res) => {
  try {
    const deletedAttendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!deletedAttendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.status(200).json({ message: 'Attendance deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting attendance', error: error.message });
  }
};
