import express from 'express';
import Task from '../models/Task.js';
import { validateTask, validateTaskUpdate, validateTaskId, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// GET /tasks - Get all tasks
router.get('/', async (req, res, next) => {
  try {
    const { status, sort = 'createdAt', order = 'desc' } = req.query;
    
    // Build filter
    const filter = {};
    if (status && ['pending', 'completed'].includes(status)) {
      filter.status = status;
    }
    
    // Build sort
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortObj = { [sort]: sortOrder };
    
    const tasks = await Task.find(filter).sort(sortObj);
    
    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
});

// POST /tasks - Create a new task
router.post('/', validateTask, handleValidationErrors, async (req, res, next) => {
  try {
    const { title, description, status = 'pending' } = req.body;
    
    const task = new Task({
      title,
      description,
      status
    });
    
    const savedTask = await task.save();
    
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: savedTask
    });
  } catch (error) {
    next(error);
  }
});

// PUT /tasks/:id - Update a task
router.put('/:id', validateTaskId, validateTaskUpdate, handleValidationErrors, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const task = await Task.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /tasks/:id - Delete a task
router.delete('/:id', validateTaskId, handleValidationErrors, async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findByIdAndDelete(id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Task deleted successfully',
      data: { id: task._id }
    });
  } catch (error) {
    next(error);
  }
});

// GET /tasks/:id - Get a single task
router.get('/:id', validateTaskId, handleValidationErrors, async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
});

export default router;
