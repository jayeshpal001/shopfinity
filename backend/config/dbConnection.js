const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`DB Connection Failed: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = dbConnection;
