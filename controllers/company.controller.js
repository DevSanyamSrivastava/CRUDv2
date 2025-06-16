import Company from '../models/Company.js';
import Department from '../models/Department.js';
export const registerCompany = async (req, res) => {
  try {
    const {
      companyName, ownerName, email, username, phoneNo,
      password, gender, address, bio, industryType,
      website, latitude, longitude // 👈 add this!
    } = req.body;

    const profileImage = req.file ? req.file.filename : null;

    // 🔍 Check if email, username or phoneNo already exists
    const existingCompany = await Company.findOne({
      $or: [{ email }, { username }, { phoneNo }]
    });

    if (existingCompany) {
      let duplicateField = '';
      if (existingCompany.email === email) duplicateField = 'Email';
      else if (existingCompany.username === username) duplicateField = 'Username';
      else if (existingCompany.phoneNo === phoneNo) duplicateField = 'Phone Number';

      return res.status(400).json({ message: `${duplicateField} already exists!` });
    }

    // 🌍 Prepare location data
    let location = undefined;
    if (latitude && longitude) {
      location = {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      };
    }

    // ✅ Create and save company
    const company = new Company({
      companyName,
      ownerName,
      email,
      username,
      phoneNo,
      password,
      gender,
      address,
      bio,
      industryType,
      website,
      profileImage,
      location // 👈 add location here
    });

    await company.save();
    res.status(201).json({ message: 'Company created successfully!', company });

  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ message: `${field} already exists` });
    }

    res.status(500).json({ message: 'Error creating company', error: error.message });
  }
};




// Get all companies
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching companies', error: error.message });
  }
};

// Get a specific company by ID
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching company', error: error.message });
  }
};

// Login company (plaintext password check)
export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Plaintext password check (dev only!)
    if (company.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', company });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in company', error: error.message });
  }
};

// Update company details by id
export const updateCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'ID is required' });

    const company = await Company.findById(id);
    if (!company) return res.status(404).json({ message: 'Company not found' });

    const { email: _, latitude, longitude, ...updateData } = req.body;

    // 📍 Update location if provided
    if (latitude && longitude) {
      updateData.location = {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      };
    }

    // 📸 Handle profile image if updated
    if (req.file) {
      updateData.profileImage = req.file.filename;
    }

    const updatedCompany = await Company.findByIdAndUpdate(id, updateData, {
      new: true
    });

    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: 'Error updating company by ID', error: error.message });
  }
};



// Update company details by email
export const updateCompanyByEmail = async (req, res) => {
  try {
    const { email, ...updateData } = req.body;

    if (!email) return res.status(400).json({ message: 'Email is required' });

    if ('email' in updateData) {
      return res.status(400).json({ message: 'Email cannot be updated' });
    }

    const company = await Company.findOne({ email });
    if (!company) return res.status(404).json({ message: 'Company not found' });

    if (req.file) {
      updateData.profileImage = req.file.filename;
    }

    const updatedCompany = await Company.findByIdAndUpdate(company._id, updateData, {
      new: true
    });

    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: 'Error updating company by email', error: error.message });
  }
};

// Delete company
export const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;

    // 🔍 Check if departments are linked
    const departmentCount = await Department.countDocuments({ companyId });
    if (departmentCount > 0) {
      return res.status(400).json({
        message: 'Cannot delete company. Delete associated departments first.'
      });
    }

    const deletedCompany = await Company.findByIdAndDelete(companyId);
    if (!deletedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({ message: 'Company deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error deleting company', error: error.message });
  }
};

