const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 4210
const cors = require('cors')

app.use(express.json())
// set up express app

app.use(cors())


// connect to MongoDB
mongoose.connect('mongodb://localhost/todo-api', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// todo schema
const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  complete: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: String,
    default: Date.now()
  }
});

const Todo = mongoose.model('Todo', TodoSchema);

// get all todos
app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// create new todo
app.post('/todo/new', (req, res) => {
  const newTodo = new Todo({
    text: req.body.text
  });

  newTodo.save()
    .then((createdTodo) => res.status(200).json({
        message: 'Todo successfully created',
        todo: createdTodo
      }))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// listen on port 5000
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));