const { Board } = require('../models/Boards.js');

const getMyBoards = (req, res, next) => {
  return Board.find({assigned_to: req.user._id}, '-__v').then((result) => {
    res.status(200).json({
      "boards": result
    });
  });
}

function createBoard(req, res, next) {
  const { name, description } = req.body;
  const created_date = new Date().toISOString();
  const board = new Board({
    assigned_to: req.user._id,
    name,
    description,
    created_date,
  });
  board.save().then(
    res.status(200).json({message: "Board created successfully"})
  );
}

const getMyBoardById = async (req, res, next) => {
  return Board.findById({_id: req.params.id, assigned_to: req.user._id})
    .then((board) => {
      res.status(200).json({
        "board": board});
    });
}

const updateMyBoardById = async (req, res, next) => {
  const { name, description } = req.body;
  return Board.findByIdAndUpdate({_id: req.params.id, assigned_to: req.user._id}, {$set: { name, description } })
    .then((result) => {
      res.json({message: 'Board details changed successfully'});
    });
}

const deleteMyBoardById = (req, res, next) => {
  Board.findByIdAndDelete({_id: req.params.id, assigned_to: req.user._id})
  .then((result) => {
    res.json({message: 'Board deleted successfully'});
  });
}

module.exports = {
  getMyBoards,
  createBoard,
  getMyBoardById,
  updateMyBoardById,
  deleteMyBoardById,
};
