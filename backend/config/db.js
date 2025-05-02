// import Mongoose library for interacting with MongoDB
const mongoose = require('mongoose');

// asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // attempt connect using the connection string from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log success message with host information
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If connection fails, log the error and exit the process with failure code
    console.error(`Error: ${error.message}`);
   
    // Exit the Node process to prevent the app from running without DB
    process.exit(1);
  }
};

// Export the function so it can be used in server.js or elsewhere
module.exports = connectDB;
