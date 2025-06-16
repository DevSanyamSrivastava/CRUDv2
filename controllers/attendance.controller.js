import Attendance from '../models/Attendance.js';

// Record attendance for an employee

export const recordAttendance = async (req, res) => {
  try {
    const { employeeId, latitude, longitude, checkInTime } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Location coordinates are required' });
    }

    // 1. Find employee's company (assuming employee has companyId)
    const employee = await Employee.findById(employeeId);
    if (!employee || !employee.companyId) {
      return res.status(404).json({ message: 'Employee or their company not found' });
    }

    const company = await Company.findById(employee.companyId);
    if (!company || !company.location) {
      return res.status(404).json({ message: 'Company location not set' });
    }

    // 2. Check if within 100 meters
    const isWithinRadius = await Company.findOne({
      _id: company._id,
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: 100 // meters
        }
      }
    });

    if (!isWithinRadius) {
      return res.status(403).json({
        message: 'Check-in failed: Not within allowed 100-meter radius of company location'
      });
    }

    // 3. Save attendance
    const today = new Date();
    const dateOnly = today.toISOString().split('T')[0]; // YYYY-MM-DD
    const day = today.toLocaleString('en-US', { weekday: 'long' });

    const existing = await Attendance.findOne({ employeeId, date: dateOnly });
    if (existing) {
      return res.status(409).json({ message: 'Attendance already marked for today' });
    }

    const attendance = new Attendance({
      employeeId,
      date: dateOnly,
      day,
      checkInTime,
      status: 'Present'
    });

    await attendance.save();

    res.status(201).json({ message: 'Attendance marked successfully!', attendance });

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
