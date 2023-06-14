"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Retrieve MongoDB Atlas username and password from environment variables
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
// Construct the MongoDB connection string using the environment variables
const mongoURI = `mongodb+srv://${username}:${password}@my-todo-app.y7rysdm.mongodb.net/?retryWrites=true&w=majority`;
// Connect to MongoDB collection
const connectToCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = new mongodb_1.MongoClient(mongoURI, {
        serverApi: {
            version: mongodb_1.ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    yield client.connect();
    // Send a ping to confirm a successful connection
    yield client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return client;
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// GET /todos - Get all todos
app.get('/api/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield connectToCollection();
        const todos = client.db().collection('todos');
        const fetchedTodos = yield todos.find().toArray();
        res.json(fetchedTodos);
        client.close();
    }
    catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// POST /todos - Create a new todo
app.post('/api/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        const randomID = new mongodb_1.ObjectId();
        const newTodo = { _id: randomID, id: randomID.toHexString(), text, completed: false };
        const client = yield connectToCollection();
        const todos = client.db().collection('todos');
        yield todos.insertOne(newTodo);
        res.status(201).json(newTodo);
        client.close();
    }
    catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// PUT /todos/:id - Toggle todo completion status
app.put('/api/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todoId = new mongodb_1.ObjectId(id);
        const client = yield connectToCollection();
        const todos = client.db().collection('todos');
        const todo = yield todos.findOne({ _id: todoId });
        if (!todo) {
            res.status(404).json({ error: 'Todo not found' });
            client.close();
            return;
        }
        const updatedTodo = yield todos.findOneAndUpdate({ _id: todoId }, { $set: { completed: !todo.completed } });
        res.json(updatedTodo.value);
        client.close();
    }
    catch (error) {
        console.error('Error toggling todo status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// DELETE /todos/:id - Delete a todo
app.delete('/api/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todoId = new mongodb_1.ObjectId(id);
        const client = yield connectToCollection();
        const todos = client.db().collection('todos');
        const deletedTodo = yield todos.findOneAndDelete({ _id: todoId });
        if (!deletedTodo.value) {
            res.status(404).json({ error: 'Todo not found' });
            client.close();
            return;
        }
        res.json(deletedTodo.value);
        client.close();
    }
    catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
