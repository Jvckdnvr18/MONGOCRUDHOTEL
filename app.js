const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors'); // 1. Import CORS
const connectDB = require('./config/db');

const roomRoutes = require('./routes/roomRoutes');
const guestRoutes = require('./routes/guestRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();
connectDB();

const app = express();

// 2. Enable CORS so your React app can connect
app.use(cors()); 

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Hotel Management API');
});

// Mount routes
app.use('/api', roomRoutes);
app.use('/api', guestRoutes);
app.use('/api', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));