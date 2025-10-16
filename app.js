const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require("/Users/Admin/Documents/Back_end_MONGOCRUD/config/db");

// Import new routes
const roomRoutes = require('/Users/Admin/Documents/Back_end_MONGOCRUD/routes/roomRoutes')
const guestRoutes = require('/Users/Admin/Documents/Back_end_MONGOCRUD/routes/guestRoutes')
const bookingRoutes = require('/Users/Admin/Documents/Back_end_MONGOCRUD/routes/bookingRoutes')

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());

// Mount the new routes
app.use('/api', roomRoutes);
app.use('/api', guestRoutes);
app.use('/api',bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));