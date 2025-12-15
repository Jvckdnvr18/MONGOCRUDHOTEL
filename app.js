const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import new routes
const roomRoutes = require('./routes/roomRoutes');
const guestRoutes = require('./routes/guestRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Welcome to the Hotel Management API');
});
<<<<<<< HEAD
=======

>>>>>>> bb13c8b2cd03382b1ad91a8a3d6284630726249f
// Mount the new routes
app.use('/api', roomRoutes);
app.use('/api', guestRoutes);
app.use('/api',bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
