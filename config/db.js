const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Removed deprecated options (useNewUrlParser and useUnifiedTopology)
        // Mongoose automatically uses the correct settings now.
        await mongoose.connect(process.env.MONGO_URI || 
            'mongodb://127.0.0.1:27017/mvc_crud_example');
        
        console.log('✅ MongoDB connected');
    } catch (err) {
        // Log the error and exit the process if connection fails
        console.error('MongoDB connection failed', err);
        process.exit(1); 
    }
};

module.exports = connectDB;
