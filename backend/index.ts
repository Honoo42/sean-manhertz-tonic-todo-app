import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient, ObjectId  } from 'mongodb';
import { Todo } from './types';
import router from './routes'

import dotenv from 'dotenv';

dotenv.config();


// Retrieve MongoDB Atlas username and password from environment variables
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

// Construct the MongoDB connection string using the environment variables
const mongoURI = `mongodb+srv://${username}:${password}@my-todo-app.y7rysdm.mongodb.net/?retryWrites=true&w=majority`;

// Connect to MongoDB
const app = express();
const PORT = process.env.PORT || 5000;

const client = new MongoClient(mongoURI)

app.use(cors());
app.use(bodyParser.json());
app.use('/api/todos', router)

app.listen(PORT, () => {
    console.log(`SERVER is running on port ${PORT}`)
});

// Connect to MongoDB collection
const getCollection = () => client.db().collection<Todo>('todos');


async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      console.log("Show stored todos:", await getCollection().find().toArray())
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  run().catch(console.dir);