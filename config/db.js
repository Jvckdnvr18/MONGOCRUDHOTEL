const mongoose = require('mongoose');

/**
 * Connect to MongoDB. This function implements the singleton pattern,
 * ensuring that only one connection attempt is ever made across serverless
 * function invocations (via global caching).
 *
 * @returns {Promise<mongoose.Mongoose>} The connected Mongoose instance.
 */
const connectDB = async () => {
    // Determine the connection URI, falling back to local if not in environment
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mvc_crud_example';
    
    if (!uri) {
        throw new Error('MONGO_URI not set in environment variables');
    }

    // 1. Check if connection is already established (readyState 1 is CONNECTED)
    if (mongoose.connection.readyState === 1) {
        // console.log(`✅ MongoDB already connected to ${mongoose.connection.host}`);
        return mongoose;
    }

    // 2. Check if a connection attempt is already in progress (global promise exists)
    if (global._mongooseConnectionPromise) {
        // Await the existing connection promise to avoid race conditions
        return global._mongooseConnectionPromise;
    }

    // 3. Initiate new connection attempt and store the promise globally
    global._mongooseConnectionPromise = mongoose.connect(uri)
        .then(conn => {
            // Use template literals (backticks) for proper host interpolation
            console.log(`✅ MongoDB connected: ${conn.connection.host}`);
            return conn;
        })
        .catch(err => {
            // Log error, clear the global promise so future calls can retry, and re-throw
            console.error('❌ MongoDB connection failed', err && err.message ? err.message : err);
            global._mongooseConnectionPromise = null;
            // Throw the error instead of process.exit() to allow the server to handle the 500
            throw err;
        });
    
    // Wait for the stored promise to resolve and return the Mongoose instance (conn)
    return global._mongooseConnectionPromise;
};

module.exports = connectDB;
