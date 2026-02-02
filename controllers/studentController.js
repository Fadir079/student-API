const Student = require('../models/Student');

// @desc Create a new student
// @route POST /api/students
// @access Public
exports.createStudent = async (req, res) => {
  try {
    const { name, email, role, enrollmentNumber, course, gpa } = req.body;

    // Validation
    if (!name || !email || !enrollmentNumber || !course) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, enrollmentNumber, course'
      });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({
      $or: [{ email }, { enrollmentNumber }]
    });

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: 'Student with this email or enrollment number already exists'
      });
    }

    const student = new Student({
      name,
      email,
      role: role || 'student',
      enrollmentNumber,
      course,
      gpa: gpa || 0
    });

    await student.save();

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error creating student: ${error.message}`
    });
  }
};

// @desc Get all students
// @route GET /api/students
// @access Public
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error retrieving students: ${error.message}`
    });
  }
};

// @desc Get a single student by ID
// @route GET /api/students/:id
// @access Public
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if id is a valid MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID format'
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error retrieving student: ${error.message}`
    });
  }
};

// @desc Update a student by ID
// @route PUT /api/students/:id
// @access Public
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, enrollmentNumber, course, gpa } = req.body;

    // Validate if id is a valid MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID format'
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Check for duplicate email or enrollment number
    if (email && email !== student.email) {
      const existingEmail = await Student.findOne({ email });
      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }

    if (enrollmentNumber && enrollmentNumber !== student.enrollmentNumber) {
      const existingEnrollment = await Student.findOne({ enrollmentNumber });
      if (existingEnrollment) {
        return res.status(409).json({
          success: false,
          message: 'Enrollment number already exists'
        });
      }
    }

    // Update fields
    if (name) student.name = name;
    if (email) student.email = email;
    if (role) student.role = role;
    if (enrollmentNumber) student.enrollmentNumber = enrollmentNumber;
    if (course) student.course = course;
    if (gpa !== undefined) student.gpa = gpa;

    await student.save();

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error updating student: ${error.message}`
    });
  }
};

// @desc Delete a student by ID
// @route DELETE /api/students/:id
// @access Public
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if id is a valid MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID format'
      });
    }

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error deleting student: ${error.message}`
    });
  }
};
