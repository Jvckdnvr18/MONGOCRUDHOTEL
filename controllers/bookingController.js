const Booking = require('/Users/Admin/Documents/Back_end_MONGOCRUD/models/bookingModel');
const Room = require('/Users/Admin/Documents/Back_end_MONGOCRUD/models/roomModel');

// CRUD operations for Bookings
exports.createBooking = async (req, res) => {
    try {
        const { roomId } = req.body;
        
        // 1. Create the booking
        const newBooking = await Booking.create(req.body);

        // 2. Update the room status to 'occupied' (Basic logic)
        await Room.findByIdAndUpdate(roomId, { status: 'occupied' });

        res.status(201).json(newBooking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBookings = async (req, res) => {
    try {
        // Populate guest and room details for richer response
        const bookings = await Booking.find()
            .populate('guestId', 'name email') // Only include name and email from Guest
            .populate('roomId', 'number type price'); // Only include number, type, price from Room

        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('guestId')
            .populate('roomId');
            
        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        res.json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBooking) return res.status(404).json({ error: 'Booking not found' });
        res.json(updatedBooking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        
        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        
        // Update room status back to 'available' (Basic logic)
        await Room.findByIdAndUpdate(booking.roomId, { status: 'available' });

        res.json({ message: 'Booking deleted and room status updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};