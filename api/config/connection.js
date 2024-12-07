const { MongoClient } = require("mongodb");
require('dotenv').config();
// const dbURI = "mongodb://0.0.0.0:27017";
const dbURI = process.env.ATLASDB_URL;
const client = new MongoClient(dbURI);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

connectToDatabase();

const dbName = "HomeAssist";
let db = client.db(dbName)

module.exports = db;


