const { MongoClient } = require("mongodb");
require('dotenv').config();

const dbURI = process.env.ATLASDB_URL;
const client = new MongoClient(dbURI);

let db;

async function connectToDatabase() {
    if (db) return db;

    try {
        await client.connect();
        console.log("Connected to MongoDB");
        db = client.db("HomeAssist");
        return db;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw new Error("Database connection failed"); 
    }
}

module.exports = connectToDatabase;



