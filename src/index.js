const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); 
const fs = require('fs')

const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb+srv://Endry_Chek:RvbUaLi9qUGb9LT@cluster0.rqlw2dd.mongodb.net/angular_dashboard?retryWrites=true&w=majority');

const { boardsRouter } = require('./boardService/boardsRouter.js');
const { tasksRouter } = require('./taskService/tasksRouter.js');
const { usersRouter } = require('./userService/usersRouter.js');
const { authRouter } = require('./authService/authRouter.js');

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/boards', boardsRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

const start = async () => {
	try {
		if (!fs.existsSync('./src/files')) {
			fs.mkdirSync('./src/files');
		}
		app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
	} catch (err) {
		console.error(`Error on server startup: ${err.message}`);
	}
}


start();

// ERROR HANDLER
app.use(errorHandler);

function errorHandler(err, req, res, next) {
  console.error(err);
  if(err != null)
  {
    res.status(400).send({ message: err.message });
  }
  else
  {
    res.status(500).send({ message: 'Server error' });
  }
}
