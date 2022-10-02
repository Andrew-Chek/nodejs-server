const express = require('express');
const router = express.Router();
const {
  getMyBoardTasks, 
  createTask,
  getMyTaskById, 
  updateMyTaskById, 
  deleteMyTaskById,
} = require('./taskService.js');
const { authMiddleware } = require('../middleware/authMiddleware');
const { checkTask, checkExistingTask, checkTaskStatus } = require('../middleware/taskMiddlewares');

router.use(authMiddleware)

router.get('/', getMyBoardTasks);

router.post('/', checkTask, checkTaskStatus, createTask);

router.get('/:id', checkExistingTask, getMyTaskById);

router.put('/:id', checkExistingTask, checkTask, checkTaskStatus, updateMyTaskById);

router.delete('/:id', checkExistingTask, deleteMyTaskById);

module.exports = {
  tasksRouter: router,
};