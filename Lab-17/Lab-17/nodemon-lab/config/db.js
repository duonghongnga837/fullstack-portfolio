const { MongoClient, ServerApiVersion } = require('mongodb');

// Retrieve the connection string from environment variables
const uri = process.env.MONGO_URI;

// Create a MongoClient with a ServerApiVersion object
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectDB = async () => {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;