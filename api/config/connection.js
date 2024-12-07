// const { MongoClient } = require("mongodb");
// require('dotenv').config();
// // const dbURI = "mongodb://0.0.0.0:27017";
// const dbURI = process.env.ATLASDB_URL;
// const client = new MongoClient(dbURI);

// async function connectToDatabase() {
//     try {
//         await client.connect();
//         console.log("Connected to MongoDB");
//     } catch (err) {
//         console.error("Error connecting to MongoDB:", err);
//     }
// }

// connectToDatabase();

// const dbName = "HomeAssist";
// let db = client.db(dbName)

// module.exports = db;

import mongoose from 'mongoose';

let isConnected = false; // Tracks connection status

export async function connectToDatabase() {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true, // Ensures the connection is not prematurely closed
    });

    isConnected = db.connections[0].readyState === 1; // 1 means connected
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to database:', err);
    throw new Error('Database connection failed');
  }
}
