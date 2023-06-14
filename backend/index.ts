import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { Todo } from './types';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Retrieve MongoDB Atlas username and password from environment variables
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

// Construct the MongoDB connection string using the environment variables
const mongoURI = `mongodb+srv://${username}:${password}@my-todo-app.y7rysdm.mongodb.net/?retryWrites=true&w=majority`;

// Connect to MongoDB collection
const connectToCollection = async (): Promise<MongoClient> => {
  const client = new MongoClient(mongoURI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  await client.connect();
   // Send a ping to confirm a successful connection
   await client.db("admin").command({ ping: 1 });
   console.log("Pinged your deployment. You successfully connected to MongoDB!");
  return client;
};

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// GET /todos - Get all todos
app.get('/api/todos', async (req: Request, res: Response) => {
  try {
    const client = await connectToCollection();
    const todos = client.db().collection<Todo>('todos');
    const fetchedTodos = await todos.find().toArray();
    res.json(fetchedTodos);
    client.close();
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /todos - Create a new todo
app.post('/api/todos', async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const randomID: ObjectId = new ObjectId();
    const newTodo = { _id: randomID, id: randomID.toHexString(), text, completed: false };

    const client = await connectToCollection();
    const todos = client.db().collection<Todo>('todos');
    await todos.insertOne(newTodo);

    res.status(201).json(newTodo);
    client.close();
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /todos/:id - Toggle todo completion status
app.put('/api/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todoId = new ObjectId(id);

    const client = await connectToCollection();
    const todos = client.db().collection<Todo>('todos');
    const todo = await todos.findOne({ _id: todoId });

    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      client.close();
      return;
    }

    const updatedTodo = await todos.findOneAndUpdate(
      { _id: todoId },
      { $set: { completed: !todo.completed } },
    );

    res.json(updatedTodo.value);
    client.close();
  } catch (error) {
    console.error('Error toggling todo status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /todos/:id - Delete a todo
app.delete('/api/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todoId = new ObjectId(id);
    const client = await connectToCollection();
    const todos = client.db().collection<Todo>('todos');
    const deletedTodo = await todos.findOneAndDelete({ _id: todoId });

    if (!deletedTodo.value) {
      res.status(404).json({ error: 'Todo not found' });
      client.close();
      return;
    }

    res.json(deletedTodo.value);
    client.close();
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
