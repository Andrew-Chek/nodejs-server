const { Task } = require('../models/Tasks.js');

const checkTask = (req, res, next) => {
    const { name, description, status } = req.body;
    if(name == "")
    {
        next(new Error(`Task name cannot be empty`));
        return;
    }
    if(description == "")
    {
        next(new Error(`Task description cannot be empty`));
        return;
    }
    if(status == "")
    {
        next(new Error(`Status cannot be empty`));
        return;
    }
    next();
}

const checkTaskStatus = (req, res, next) => {
    const { type: status } = req.body;
    if(status == '')
    {
      next(new Error('Task status cannot be empty'))
      return;
    }
    if(status != 'To do' && status != 'In progress' && status != 'Done')
    {
      next(new Error(`Such task status doesn't exist`))
      return;
    }
    next();
  }

const checkExistingTask = async (req, res, next) =>
{
  try{
    const task = await Task.findById({_id: req.params.id, assigned_to: req.user._id});
    if(task == null)
    {
      next(new Error(`Task wasn't found`))
      return;
    }
    next();
  }
  catch(err)
  {
    return res.status(500).json({ message: `Id format isn't correct to find task in DB`})
  }
}

module.exports = {
    checkTask,
    checkTaskStatus,
    checkExistingTask,
}