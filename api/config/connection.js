const { MongoClient } = require("mongodb");
require('dotenv').config();

const dbURI = process.env.ATLASDB_URL;
const client = new MongoClient(dbURI);

let db;

async function connectToDatabase() {
    if (db) return db; // If already connected, return the existing db instance.

    try {
        await client.connect();
        console.log("Connected to MongoDB");
        db = client.db("HomeAssist");
        return db; // Return the db instance after successful connection.
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw new Error("Database connection failed"); // Throw error if connection fails
    }
}

module.exports = connectToDatabase;



