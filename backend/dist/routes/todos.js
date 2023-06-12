"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const router = express_1.default.Router();
// Placeholder array for storing todos
let todos = [];
// GET /todos - Get all todos
router.get('/', (req, res) => {
    res.json(todos);
});
// POST /todos - Create a new todo
router.post('/', (req, res) => {
    const { text } = req.body;
    const randomID = Math.floor(Math.random() * 1000000);
    const newTodo = { _id: new mongodb_1.ObjectId(randomID), id: randomID, text, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});
// PUT /todos/:id - Toggle todo completion status
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(todo => todo._id === new mongodb_1.ObjectId(id));
    if (index !== -1) {
        todos[index].completed = !todos[index].completed;
        res.json(todos[index]);
    }
    else {
        res.status(404).json({ error: 'Todo not found' });
    }
});
// DELETE /todos/:id - Delete a todo
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(todo => todo._id === new mongodb_1.ObjectId(id));
    if (index !== -1) {
        const deletedTodo = todos.splice(index, 1)[0];
        res.json(deletedTodo);
    }
    else {
        res.status(404).json({ error: 'Todo not found' });
    }
});
exports.default = router;
