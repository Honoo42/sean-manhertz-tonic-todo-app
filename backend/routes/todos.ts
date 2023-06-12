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
  const newTodo = { id: new ObjectId(Date.now().valueOf()), text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id - Toggle todo completion status
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex(todo => todo.id === new ObjectId(id as unknown as ObjectId));
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
  const index = todos.findIndex(todo => todo.id === new ObjectId(id as unknown as ObjectId));
  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1)[0];
    res.json(deletedTodo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

export default router;
// Routes
/* app.get('/api/todos', async (req: Request, res: Response) => {
    try {
      const todos = await getCollection().find().toArray();
      res.json({ todos });
    } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  });
  
  app.post('/api/todos', async (req: Request, res: Response) => {
    const { text } = req.body;
    const newTodo: Todo = {
      text,
      completed: false,
    };
    try {
      const result = await getCollection().insertOne(newTodo);
      newTodo.id = result.insertedId;
      res.json({ todo: newTodo });
    } catch (error) {
      console.error('Error adding todo:', error);
      res.status(500).json({ error: 'Failed to add todo' });
    }
  });
  
  app.put('/api/todos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { completed } = req.body;
    try {
      const result = await getCollection().findOneAndUpdate(
        { _id: new ObjectId(id) }, // Convert id to ObjectId
        { $set: { completed } },
      );
      if (result.value) {
        res.json({ todo: result.value });
      } else {
        res.status(404).json({ error: 'Todo not found' });
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ error: 'Failed to update todo' });
    }
  });
  
  app.delete('/api/todos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await getCollection().findOneAndDelete({ _id: new ObjectId(id) });
      if (result.value) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ error: 'Todo not found' });
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  }); */
  