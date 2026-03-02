const mongoose = require('mongoose');
require('dotenv').config();

/* -------------------------------------------------------
   ⚙️ CONNECT MONGODB (FAST + STABLE)
---------------------------------------------------------- */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

      // ⏱️ Performance & Stability
      serverSelectionTimeoutMS: 10000, // fail fast if no DB within 10s
      connectTimeoutMS: 10000,         // connection timeout
      socketTimeoutMS: 45000,          // keep socket open for 45s
      autoIndex: true,                 // disable if production indexing causes delay
      maxPoolSize: 10,                 // maintain pool of 10 connections
    });

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }

  // 💡 Optional: Log disconnections/reconnections
  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB disconnected, retrying...');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('🔄 MongoDB reconnected');
  });
};

module.exports = connectDB;
