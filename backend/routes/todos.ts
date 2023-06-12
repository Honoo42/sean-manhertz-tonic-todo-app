import express from 'express';
import { Todo } from '../types';
import { ObjectId } from 'mongodb';

const router = express.Router();
// Placeholder array for storing todos
let todos: Todo[] = [];

// GET /todos - Get all todos
router.get('/', (req, res) => {
  res.json(todos);
});

// POST /todos - Create a new todo
router.post('/', (req, res) => {
  const { text } = req.body;
  const randomID : number = Math.floor(Math.random() * 1000000);
  const newTodo = { _id: new ObjectId(randomID), id: randomID, text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id - Toggle todo completion status
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex(todo => todo._id === new ObjectId(id as unknown as ObjectId));
  if (index !== -1) {
    todos[index].completed = !todos[index].completed;
    res.json(todos[index]);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// DELETE /todos/:id - Delete a todo
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex(todo => todo._id === new ObjectId(id as unknown as ObjectId));
  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1)[0];
    res.json(deletedTodo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

export default router;
