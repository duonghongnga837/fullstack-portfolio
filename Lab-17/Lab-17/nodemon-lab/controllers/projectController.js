// controllers/projectController.js
const Project = require('../models/Project');
const ErrorHandler = require('../utils/ErrorHandler');

// GET /api/projects - Get all projects (Public)
exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().populate('user', 'username email');
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// GET /api/projects/:id - Get single project (Public)
exports.getSingleProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('user', 'username email');

    if (!project) {
      return next(new ErrorHandler('Project not found with that ID', 404));
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return next(new ErrorHandler(`Invalid Project ID: ${req.params.id}`, 400));
    }
    next(new ErrorHandler(error.message, 500));
  }
};

// POST /api/projects - Create new project (Protected)
exports.createProject = async (req, res, next) => {
  try {
    const { title, description, imageUrl, repoUrl, liveUrl } = req.body;
    
    const project = await Project.create({
      title,
      description,
      imageUrl,
      repoUrl,
      liveUrl,
      user: req.user.id
    });
    
    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

// PUT /api/projects/:id - Update project (Protected)
exports.updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return next(new ErrorHandler('Project not found with that ID', 404));
    }
    
    // Check if user is admin or owner
    if (req.user.role !== 'admin' && project.user.toString() !== req.user.id.toString()) {
      return next(new ErrorHandler('Forbidden: You lack the required permissions to modify this project.', 403));
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return next(new ErrorHandler(`Invalid Project ID: ${req.params.id}`, 400));
    }
    if (error.name === 'ValidationError') {
      return next(new ErrorHandler(error.message, 400));
    }
    next(new ErrorHandler(error.message, 500));
  }
};

// DELETE /api/projects/:id - Delete project (Protected)
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return next(new ErrorHandler('Project not found with that ID', 404));
    }
    
    // Check if user is admin or owner
    if (req.user.role !== 'admin' && project.user.toString() !== req.user.id.toString()) {
      return next(new ErrorHandler('Forbidden: You lack the required permissions to delete this project.', 403));
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return next(new ErrorHandler(`Invalid Project ID: ${req.params.id}`, 400));
    }
    next(new ErrorHandler(error.message, 500));
  }
};

