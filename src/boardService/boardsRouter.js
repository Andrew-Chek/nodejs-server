const express = require('express');
const router = express.Router();
const {
  getMyBoards, 
  createBoard, 
  getMyBoardById, 
  updateMyBoardById, 
  deleteMyBoardById
} = require('./boardService.js');
const { authMiddleware } = require('../middleware/authMiddleware');
const { checkExistingBoard, checkBoard } = require('../middleware/boardMiddlewares');

router.use(authMiddleware)

router.get('/', getMyBoards);

router.post('/', checkBoard, createBoard);

router.get('/:id', checkExistingBoard, getMyBoardById);

router.put('/:id', checkExistingBoard, checkBoard, updateMyBoardById);

router.delete('/:id', checkExistingBoard, deleteMyBoardById);

module.exports = {
  boardsRouter: router,
};
