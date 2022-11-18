const express = require('express');
const router = express.Router();
const {
  getMyBoardTasks, 
  createTask,
  getMyTaskById, 
  updateMyTaskById, 
  updateMyTaskCommentsById,
  deleteMyTaskCommentById,
  deleteMyTaskById,
} = require('./taskService.js');
const { authMiddleware } = require('../middleware/authMiddleware');
const { checkExistingBoard } = require('../middleware/boardMiddlewares')
const { checkTask, checkExistingTask, checkTaskStatus } = require('../middleware/taskMiddlewares');

router.use(authMiddleware)

router.get('/:id', checkExistingBoard, getMyBoardTasks);

router.post('/', checkTask, checkTaskStatus, createTask);

router.get('/single/:id', checkExistingTask, getMyTaskById);

router.put('/:id', checkExistingTask, checkTask, checkTaskStatus, updateMyTaskById);

router.patch('/:id', checkExistingTask, updateMyTaskCommentsById)

router.delete('/:id/comment/:comment_id', checkExistingTask, deleteMyTaskCommentById)

router.delete('/:id', checkExistingTask, deleteMyTaskById);

module.exports = {
  tasksRouter: router,
};