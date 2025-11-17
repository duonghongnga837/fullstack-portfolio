// routes/projectRoutes.js
const router = require('express').Router();
const { 
  getAllProjects, 
  getSingleProject,
  createProject, 
  updateProject, 
  deleteProject 
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getSingleProject);

// Protected routes
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;

