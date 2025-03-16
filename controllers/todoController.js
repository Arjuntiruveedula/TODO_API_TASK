const Todo = require('../models/Todo');

//  Get all todos
// GET /api/todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

//   Create a new todo
//   POST /api/todos
const createTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;

    const todo = await Todo.create({
      title,
      completed,
      user: req.user._id,
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

//   Get todo by ID
//   GET /api/todos/:id
const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Checking if the todo belongs to the logged in user
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(todo);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

//   Update todo
//   PUT /api/todos/:id
//   Private
const updateTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;

    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Checking if the todo belongs to the logged in user
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, completed },
      { new: true }
    );

    res.json(todo);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

//  Delete todo
//  DELETE /api/todos/:id
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Checking if the todo belongs to the logged in user
    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Use deleteOne() instead of remove()
    await Todo.deleteOne({ _id: req.params.id });

    res.json({ message: 'Todo removed' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getTodos, createTodo, getTodoById, updateTodo, deleteTodo };
