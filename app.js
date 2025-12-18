const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); 
const connectDB = require('./config/db');

// Route files
const roomRoutes = require('./routes/roomRoutes.js');
const guestRoutes = require('./routes/guestRoutes.js');
const bookingRoutes = require('./routes/bookingRoutes.js');

dotenv.config();
const app = express();

// --- 🔒 CORS Configuration ---
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://hmsluxe.vercel.app" // Add your frontend production URL here
];

const corsOptions = {
    origin: function (origin, callback) {
        // 1. Allow requests with no origin (like Postman or mobile apps)
        if (!origin) return callback(null, true); 
        
        // 2. Check if the origin is in our whitelist
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
            return callback(null, true);
        } else {
            console.log("Blocked by CORS: ", origin);
            return callback(new Error('Not allowed by CORS'), false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 204
};

// --- 🛠️ MIDDLEWARE ORDER (CRITICAL) ---

// 1. Handle CORS Preflight globally
app.use(cors(corsOptions)); 
app.options('*', cors(corsOptions));

// 2. Body Parsers
app.use(express.json());
app.use(bodyParser.json());

// --- 📍 ROUTES ---
app.get('/', (req, res) => {
    res.send('<h1>🏨 Hotel Management API is running!</h1>');
});

// IMPORTANT: Check your roomRoutes.js. 
// If your route inside that file is router.get('/rooms'), 
// the full URL becomes /api/rooms/rooms. 
// Change routes in roomRoutes.js to '/' to get /api/rooms.
app.use('/api/rooms', roomRoutes);
app.use('/api/guests', guestRoutes);
app.use('/api/bookings', bookingRoutes);

// --- 🚀 SERVER START (Fixed for Vercel) ---
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
    const startServer = async () => {
        try {
            await connectDB();
            app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
        } catch (err) {
            console.error('Failed to connect to database:', err.message);
        }
    };
    startServer();
} else {
    // For Vercel Production
    connectDB();
}

module.exports = app;