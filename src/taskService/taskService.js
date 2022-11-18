const { Task } = require('../models/Tasks.js');

const getMyBoardTasks = (req, res, next) => {
  const limit = checkLimit(req, res, next);
  const offset = checkOffset(req, res, next);
  if(checkStatus(req, res, next))
  {
    return Task.find({assigned_to: req.user._id, board_id: req.params.id, status: req.query.status}, '-__v').skip(offset).limit(limit).then((result) => {
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
          'board_id': req.params.id
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
    isArchived: false,
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
  const { name, description, status, isArchived, comments } = req.body;
  return Task.findByIdAndUpdate({_id: req.params.id, assigned_to: req.user._id}, {$set: { name, description, status, isArchived, comments } })
    .then((result) => {
      res.status(200).json({task: result});
    });
}

const updateMyTaskCommentsById = async (req, res, next) => {
  const { title, message, created_date } = req.body;
  return Task.findByIdAndUpdate({_id: req.params.id, assigned_to: req.user._id},
    { $push: {comments: {title, message, created_date}} }).then(
      (result) => {
        res.status(200).json({message: 'Comment created successfully'});
      }
    )
}

const deleteMyTaskById = (req, res, next) => {
  Task.findByIdAndDelete({_id: req.params.id, assigned_to: req.user._id})
  .then((result) => {
    res.status(200).json({task: result});
  });
}

const deleteMyTaskCommentById = async (req, res, next) => {
  return Task.findByIdAndUpdate({_id: req.params.id, assigned_to: req.user._id},
    { $pull: {comments: {_id: req.params.comment_id}} }).then(
      (result) => {
        res.status(200).json({message: 'Comment deleted successfully'});
      }
    )
}

module.exports = {
  getMyBoardTasks,
  createTask,
  getMyTaskById,
  updateMyTaskById,
  updateMyTaskCommentsById,
  deleteMyTaskCommentById,
  deleteMyTaskById
};