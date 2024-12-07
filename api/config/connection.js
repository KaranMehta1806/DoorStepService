const { MongoClient } = require("mongodb");
require('dotenv').config();

const dbURI = process.env.ATLASDB_URL; // Ensure this is correctly set in your .env file
const client = new MongoClient(dbURI);

let db;

// Connect to MongoDB and initialize the database instance
async function connectToDatabase() {
    try {
        if (!db) { // Check if the database instance is already initialized
            await client.connect();
            console.log("Connected to MongoDB");
            db = client.db("HomeAssist"); // Set the database instance
        }
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err; // Exit with error if the connection fails
    }
}

// Initialize connection immediately
connectToDatabase();

module.exports = db; // Export the database instance



