const express = require('express');
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

// CRUD Routes
router.post('/', createStudent);           // Create
router.get('/', getAllStudents);            // Read All
router.get('/:id', getStudentById);         // Read One
router.put('/:id', updateStudent);          // Update
router.delete('/:id', deleteStudent);       // Delete

module.exports = router;
