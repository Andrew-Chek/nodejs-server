const { Task } = require('../models/Tasks.js');

const getMyBoardTasks = (req, res, next) => {
  const limit = checkLimit(req, res, next);
  const offset = checkOffset(req, res, next);
  if(checkStatus(req, res, next))
  {
    return Task.find({assigned_to: req.user._id, board_id: req.body.board_id, status: req.query.status}, '-__v').skip(offset).limit(limit).then((result) => {
      res.status(200).json({
        "tasks": result
      });
    });
  }
  else
  {
    return Task.aggregate([ 
      {
        '$match': {
          'assigned_to': req.user._id
        }
      },
      {
        '$match': {
          'board_id': req.body.board_id
        }
      },
      {
        '$skip': offset
      }, {
        '$limit': limit
      }
    ]).then((result) => {
      res.status(200).json({
        "tasks": result
      })
    });
  }
}

const checkLimit = (req, res, next) => {
  if(req.query.limit != undefined && !isNaN(parseInt(req.query.limit)))
  {
    if(parseInt(req.query.limit) > 0 && parseInt(req.query.limit) < 50)
    {
      return parseInt(req.query.limit)
    }
  }
  else return 10;
}

const checkOffset = (req, res, next) => {
  if(req.query.offset != undefined && !isNaN(parseInt(req.query.offset)) && parseInt(req.query.offset) > 0)
  {
    return parseInt(req.query.offset)
  }
  else return 0;
}

const checkStatus = (req, res, next) => {
  if(req.query.status != undefined && req.query.status != '')
  {
    return true;
  }
  else return false;
}

function createTask(req, res, next) {
  const { name, description, status, board_id } = req.body;
  const created_date = new Date().toISOString();
  const task = new Task({
    name,
    status,
    description,
    assigned_to: req.user._id,
    board_id,
    created_date
  });
  task.save().then(
    res.status(200).json({message: "Task created successfully"})
  );
}

const getMyTaskById = async (req, res, next) => {
  return Task.findById({_id: req.params.id, assigned_to: req.user._id})
  .then((task) => {
    res.status(200).json({
      "task": task});
  });
}

const updateMyTaskById = async (req, res, next) => {
  const { name, description, status } = req.body;
  return Task.findByIdAndUpdate({_id: req.params.id, assigned_to: req.user._id}, {$set: { name, description, status } })
    .then((result) => {
      res.status(200).json({message: 'Task details changed successfully'});
    });
}

const deleteMyTaskById = (req, res, next) => {
  Task.findByIdAndDelete({_id: req.params.id, assigned_to: req.user._id})
  .then((result) => {
    res.status(200).json({message: 'Task deleted successfully'});
  });
}

module.exports = {
  getMyBoardTasks,
  createTask,
  getMyTaskById,
  updateMyTaskById,
  deleteMyTaskById
};