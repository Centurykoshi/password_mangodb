const express = require("express");

const app = express();

const { MongoClient } = require('mongodb');
require("dotenv").config();
const cors = require("cors");
app.use(cors());

const url = 'mongodb://localhost:27017';
console.log(url);
const client = new MongoClient(url);
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const PORT = 3000;

const dbname = "locker";

client.connect();





// Get the database and collection
app.get("/", async (req, res) => {
    const db = client.db(dbname);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    console.log(findResult);
    res.json(findResult);
});

app.post("/", async (req, res) => {
    const password = req.body;
    const db = client.db(dbname);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({ success: true, result: findResult });
    console.log(req.body);
});

app.delete("/", async (req, res) => {
    const password = req.body;
    const db = client.db(dbname);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({ success: true, result: findResult });
    console.log(req.body);
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
