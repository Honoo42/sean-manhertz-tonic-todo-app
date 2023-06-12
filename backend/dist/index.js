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
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Retrieve MongoDB Atlas username and password from environment variables
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
// Construct the MongoDB connection string using the environment variables
const mongoURI = `mongodb+srv://${username}:${password}@my-todo-app.y7rysdm.mongodb.net/?retryWrites=true&w=majority`;
// Connect to MongoDB
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const client = new mongodb_1.MongoClient(mongoURI);
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/api/todos', routes_1.default);
app.listen(PORT, () => {
    console.log(`SERVER is running on port ${PORT}`);
});
// Connect to MongoDB collection
const getCollection = () => client.db().collection('todos');
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            yield client.connect();
            // Send a ping to confirm a successful connection
            yield client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            console.log("Show stored todos:", yield getCollection().find().toArray());
        }
        finally {
            // Ensures that the client will close when you finish/error
            yield client.close();
        }
    });
}
run().catch(console.dir);
