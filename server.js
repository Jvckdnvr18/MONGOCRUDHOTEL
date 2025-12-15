const app = require('./app');
const connectDB = require('./config/db');

const port = process.env.PORT || 3000;

// Try to connect to DB, but start the server regardless so `npm start`
// doesn't exit when MongoDB isn't available locally (helpful for dev).
connectDB()
  .then(() => {
    console.log('Database connection established');
  })
  .catch(err => {
    console.error('MongoDB connection failed (continuing without DB):', err.message || err);
  })
  .finally(() => {
    app.listen(port, () => {
      console.log(`🚀 Server listening on port ${port}`);
    });
  });
