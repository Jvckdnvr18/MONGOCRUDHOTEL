const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    number: { type: String, required: true, unique: true },
    type: { type: String, required: true }, // e.g., Single, Double, Suite
    price: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['available', 'occupied', 'maintenance'], 
        default: 'available' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);