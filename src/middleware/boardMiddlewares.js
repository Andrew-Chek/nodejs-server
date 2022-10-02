const { Board } = require('../models/Boards.js');

const checkBoard = (req, res, next) => {
  const { name, description } = req.body;
  if(name == "")
    {
      next(new Error(`Board name cannot be empty`));
      return;
    }
    if(description == "")
    {
      next(new Error(`Board description cannot be empty`));
      return;
    }
  next();
}

const checkExistingBoard = async (req, res, next) =>
{
  try{
    const board = await Board.findById({_id: req.params.id, assigned_to: req.user._id});
    if(board == null)
    {
      next(new Error(`Board wasn't found`))
      return;
    }
    next();
  }
  catch(err)
  {
    return res.status(500).json({ message: `Id format isn't correct to find in data base`})
  }
}

module.exports = {
    checkBoard,
    checkExistingBoard
}